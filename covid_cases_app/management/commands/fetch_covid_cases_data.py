from django.core.management.base import BaseCommand

from covid_cases_app.helper import *


class Command(BaseCommand):
    help = "Fetch the data for covid cases from csv files"

    def handle(self, *args, **options):
        # Code to fetch data from online csv files
        global_confirmed_cases, global_deaths_cases, global_recovered_cases, us_confirmed_cases, us_deaths_cases \
            = fetch_cases_from_urls()

        # Country names and Ids dictionary
        country_dict = get_or_create_countries_dict(global_confirmed_cases)

        # Province names and Ids dictionary
        province_dict = get_or_create_provinces_dict(global_confirmed_cases, country_dict)

        # State names and Ids dictionary
        state_dict = get_or_create_state_dict(us_confirmed_cases)

        # Getting Entry Object lists of global cases and us cases
        global_covid_cases, us_covid_cases = get_object_list(global_confirmed_cases, global_deaths_cases,
                                                             global_recovered_cases, us_confirmed_cases,
                                                             us_deaths_cases, country_dict, province_dict, state_dict)

        try:
            GlobalCovidCase.objects.bulk_create(global_covid_cases, ignore_conflicts=True)
        except IntegrityError as error:
            print("Error occurred in global cases!!", error)

        try:
            USCovidCase.objects.bulk_create(us_covid_cases, ignore_conflicts=True)
        except IntegrityError as error:
            print("Error occurred in US cases!!", error)

        self.stdout.write("Data import successful")
