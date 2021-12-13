import csv
from datetime import datetime

import requests
from django.db import IntegrityError
from django.core.management.base import BaseCommand

from covid_cases_app.models import Country, CountryProvince, GlobalCovidCase, USCovidCase, State


PROVINCE_INDEX = 0
COUNTRY_INDEX = 1
GLOBAL_VALUE_INDEX_START = 4

GLOBAL_CONFIRMED_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data" \
                       "/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
GLOBAL_DEATHS_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data" \
                    "/csse_covid_19_time_series/time_series_covid19_deaths_global.csv"
GLOBAL_RECOVERED_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data" \
                       "/csse_covid_19_time_series/time_series_covid19_recovered_global.csv"

STATE_INDEX = 6
US_CONFIRMED_INDEX_START = 11
US_DEATHS_INDEX_START = 12

US_CONFIRMED_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data" \
                   "/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv"
US_DEATHS_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data" \
                "/csse_covid_19_time_series/time_series_covid19_deaths_US.csv"


class Command(BaseCommand):
    help = "Fetch the data for covid cases from csv files"

    def handle(self, *args, **options):

        # Code to fetch data from online csv files
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

            # global total recorded dates
            global_dates = global_confirmed_cases[0][GLOBAL_VALUE_INDEX_START:]

            global_covid_cases = []
            for global_confirmed_cases_row, global_deaths_cases_row, global_recovered_cases_row in \
                    zip(global_confirmed_cases[1:], global_deaths_cases[1:], global_recovered_cases[1:]):

                for un_formatted_date, confirmed, deaths, recovered in \
                        zip(global_dates, global_confirmed_cases_row[GLOBAL_VALUE_INDEX_START:],
                            global_deaths_cases_row[GLOBAL_VALUE_INDEX_START:],
                            global_recovered_cases_row[GLOBAL_VALUE_INDEX_START:]):

                    date = datetime.strptime(un_formatted_date, "%m/%d/%y").strftime("%Y-%m-%d")

                    country, _ = Country.objects.get_or_create(name=global_confirmed_cases_row[COUNTRY_INDEX])

                    country_province, _ = CountryProvince.objects.\
                        get_or_create(province_name=global_confirmed_cases_row[PROVINCE_INDEX], country_id=country.id)

                    global_covid_cases.append(GlobalCovidCase(date=date, confirmed=confirmed, deaths=deaths,
                                                              recovered=recovered,
                                                              country_province_id=country_province.id,
                                                              country_id=country.id))

            try:
                GlobalCovidCase.objects.bulk_create(global_covid_cases)
            except IntegrityError as error:
                print("Error occurred in global cases!!", error)

            # US total recorded dates
            us_dates = us_confirmed_cases[0][US_CONFIRMED_INDEX_START:]

            us_covid_cases = []
            us_covid_cases_state_wise = {}
            for i in range(1, len(us_confirmed_cases)):
                state_name = us_confirmed_cases[i][STATE_INDEX]

                for j in range(len(us_dates)):
                    date = datetime.strptime(us_dates[j], "%m/%d/%y").strftime("%Y-%m-%d")
                    state, _ = State.objects.get_or_create(name=state_name)

                    if state.id not in us_covid_cases_state_wise:
                        us_covid_cases_state_wise[state.id] = {}

                    if date not in us_covid_cases_state_wise[state.id]:
                        us_covid_cases_state_wise[state.id][date] = {"confirmed": 0, "deaths": 0}

                    us_covid_cases_state_wise[state.id][date]["confirmed"] += \
                        int(us_confirmed_cases[i][j+US_CONFIRMED_INDEX_START])

                    us_covid_cases_state_wise[state.id][date]["deaths"] += \
                        int(us_deaths_cases[i][j+US_DEATHS_INDEX_START])

            print(us_covid_cases_state_wise)

            for state_id in us_covid_cases_state_wise:
                for date in us_covid_cases_state_wise[state_id]:
                    us_covid_cases.append(USCovidCase(date=date,
                                                      confirmed=us_covid_cases_state_wise[state_id][date]["confirmed"],
                                                      deaths=us_covid_cases_state_wise[state_id][date]["deaths"],
                                                      state_id=state_id))

            try:
                USCovidCase.objects.bulk_create(us_covid_cases)
            except IntegrityError as error:
                print("Error occurred in US cases!!", error)

        self.stdout.write("Data import successful")
