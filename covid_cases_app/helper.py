import csv

from datetime import datetime
import requests
from django.db import IntegrityError

from covid_cases_app.models import Country, CountryProvince, State, GlobalCovidCase, USCovidCase

GLOBAL_CONFIRMED_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data" \
                       "/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
GLOBAL_DEATHS_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data" \
                    "/csse_covid_19_time_series/time_series_covid19_deaths_global.csv"
GLOBAL_RECOVERED_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data" \
                       "/csse_covid_19_time_series/time_series_covid19_recovered_global.csv"

US_CONFIRMED_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data" \
                   "/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv"
US_DEATHS_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data" \
                "/csse_covid_19_time_series/time_series_covid19_deaths_US.csv"

COUNTRY_INDEX = 1
PROVINCE_INDEX = 0
STATE_INDEX = 6

GLOBAL_VALUE_INDEX_START = 4
US_CONFIRMED_INDEX_START = 11
US_DEATHS_INDEX_START = 12


def fetch_cases_from_urls():
    with requests.Session() as session_requests:
        global_confirmed_data = session_requests.get(GLOBAL_CONFIRMED_URL).content.decode("utf-8")
        global_deaths_data = session_requests.get(GLOBAL_DEATHS_URL).content.decode("utf-8")
        global_recovered_data = session_requests.get(GLOBAL_RECOVERED_URL).content.decode("utf-8")

        us_confirmed_data = session_requests.get(US_CONFIRMED_URL).content.decode("utf-8")
        us_deaths_data = session_requests.get(US_DEATHS_URL).content.decode("utf-8")

        global_confirmed_cases = list(csv.reader(global_confirmed_data.splitlines(), delimiter=","))
        global_deaths_cases = list(csv.reader(global_deaths_data.splitlines(), delimiter=","))
        global_recovered_cases = list(csv.reader(global_recovered_data.splitlines(), delimiter=","))

        us_confirmed_cases = list(csv.reader(us_confirmed_data.splitlines(), delimiter=","))
        us_deaths_cases = list(csv.reader(us_deaths_data.splitlines(), delimiter=","))

        return global_confirmed_cases, global_deaths_cases, global_recovered_cases, us_confirmed_cases, us_deaths_cases


def get_or_create_countries_dict(cases_list):
    country_names = list(set([row[COUNTRY_INDEX] for row in cases_list[1:]]))
    countries = [Country(name=name) for name in country_names]

    try:
        Country.objects.bulk_create(countries, ignore_conflicts=True)
    except IntegrityError as error:
        print("Error occurred in creation of countries!!", error)

    country_queryset = Country.objects.all()

    return {country_object.name: country_object.id for country_object in country_queryset}


def get_or_create_provinces_dict(cases_list, country_dict):
    provinces = [CountryProvince(province_name=row[PROVINCE_INDEX],
                                 country_id=country_dict[row[COUNTRY_INDEX]])
                 for row in cases_list[1:]]

    try:
        CountryProvince.objects.bulk_create(provinces, ignore_conflicts=True)
    except IntegrityError as error:
        print("Error occurred in creation of provinces!!", error)

    province_queryset = CountryProvince.objects.all()

    provinces_dict = {}
    for province_object in province_queryset:
        if province_object.country_id not in provinces_dict:
            provinces_dict[province_object.country_id] = {}

        provinces_dict[province_object.country_id][province_object.province_name] = province_object.id

    return provinces_dict


def get_or_create_state_dict(cases_list):
    state_names = list(set(row[STATE_INDEX] for row in cases_list[1:]))
    states = [State(name=name) for name in state_names]

    try:
        State.objects.bulk_create(states, ignore_conflicts=True)
    except IntegrityError as error:
        print("Error occurred in creation of states!!", error)

    states_queryset = State.objects.all()

    return {state.name: state.id for state in states_queryset}


def get_object_list(global_confirmed_cases, global_deaths_cases, global_recovered_cases, us_confirmed_cases,
                    us_deaths_cases, country_dict, province_dict, state_dict):

    # global total recorded dates
    global_dates = global_confirmed_cases[0][GLOBAL_VALUE_INDEX_START:]

    # US total recorded dates
    us_dates = us_confirmed_cases[0][US_CONFIRMED_INDEX_START:]

    global_covid_cases = []
    us_covid_cases_state_wise = {}
    for global_confirmed_cases_row, global_deaths_cases_row, global_recovered_cases_row, \
        us_confirmed_cases_row, us_deaths_cases_row in \
            zip(global_confirmed_cases[1:], global_deaths_cases[1:], global_recovered_cases[1:],
                us_confirmed_cases[1:], us_deaths_cases[1:]):

        for un_formatted_global_date, un_formatted_us_date, global_confirmed, global_deaths, global_recovered, \
            us_confirmed, us_deaths in \
                zip(global_dates, us_dates, global_confirmed_cases_row[GLOBAL_VALUE_INDEX_START:],
                    global_deaths_cases_row[GLOBAL_VALUE_INDEX_START:],
                    global_recovered_cases_row[GLOBAL_VALUE_INDEX_START:],
                    us_confirmed_cases_row[US_CONFIRMED_INDEX_START:],
                    us_deaths_cases_row[US_DEATHS_INDEX_START:]):

            global_date = datetime.strptime(un_formatted_global_date, "%m/%d/%y").strftime("%Y-%m-%d")
            us_date = datetime.strptime(un_formatted_us_date, "%m/%d/%y").strftime("%Y-%m-%d")

            global_covid_cases.append(
                GlobalCovidCase(date=global_date, confirmed=global_confirmed, deaths=global_deaths,
                                recovered=global_recovered,
                                country_province_id=province_dict[
                                    country_dict[global_confirmed_cases_row[COUNTRY_INDEX]]
                                ][global_confirmed_cases_row[PROVINCE_INDEX]],
                                country_id=country_dict[global_confirmed_cases_row[COUNTRY_INDEX]]))

            state_id = state_dict[us_confirmed_cases_row[STATE_INDEX]]

            if state_id not in us_covid_cases_state_wise:
                us_covid_cases_state_wise[state_id] = {}

            if us_date not in us_covid_cases_state_wise[state_id]:
                us_covid_cases_state_wise[state_id][us_date] = {"us_confirmed": 0, "us_deaths": 0}

            us_covid_cases_state_wise[state_id][us_date]["us_confirmed"] += \
                int(us_confirmed)
            us_covid_cases_state_wise[state_id][us_date]["us_deaths"] += \
                int(us_deaths)

    # Creating US Cases Entry objects list
    us_covid_cases = []
    for state_id in us_covid_cases_state_wise:
        for date in us_covid_cases_state_wise[state_id]:
            us_covid_cases.append(USCovidCase(date=date,
                                              confirmed=us_covid_cases_state_wise[state_id][date]["us_confirmed"],
                                              deaths=us_covid_cases_state_wise[state_id][date]["us_deaths"],
                                              state_id=state_id))

    return global_covid_cases, us_covid_cases
