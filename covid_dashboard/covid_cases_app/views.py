import datetime

from django_filters import rest_framework as filters
from django.db.models import Prefetch
from rest_framework import viewsets

from covid_cases_app.models import Country, CountryProvince, GlobalCovidCase, USCovidCase, State
from covid_cases_app.serializers import CountryCaseSerializer, CountryProvinceCaseSerializer, GlobalCaseSerializer, \
    USCaseSerializer, CountryNameSerializer, StateNameAndIdSerializer, CountryProvinceNameSerializer


def filtered_covid_cases_get_queryset(model, params):
    today = datetime.date.today()
    passed_days = params.get("days", None)

    if passed_days:
        starting_date = today - datetime.timedelta(days=int(passed_days))
        queryset = model.objects.prefetch_related(
            Prefetch("covid_cases", queryset=GlobalCovidCase.objects.filter(date__gte=starting_date, ),
                     to_attr="filtered_covid_cases")
        )

        return queryset

    else:
        queryset = model.objects.prefetch_related(
            Prefetch("covid_cases", queryset=GlobalCovidCase.objects.all(), to_attr="filtered_covid_cases")
        )

        return queryset


def filtered_global_us_get_queryset(model, params):
    today = datetime.date.today()
    passed_days = params.get("days", None)

    if passed_days:
        starting_date = today - datetime.timedelta(days=int(passed_days))
        queryset = model.objects.filter(date__gte=starting_date)

        return queryset

    else:
        queryset = model.objects.all()
        return queryset


class CountryNameViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Country.objects.all().order_by("name")
    serializer_class = CountryNameSerializer


class CountryProvinceNameViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountryProvinceNameSerializer

    lookup_field = "name"
    lookup_url_kwarg = "name"


class CountryCaseViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CountryCaseSerializer

    lookup_field = "name"
    lookup_url_kwarg = "name"

    def get_queryset(self):
        return filtered_covid_cases_get_queryset(Country, self.request.query_params)


class CountryProvinceCasesViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CountryProvinceCaseSerializer

    def get_queryset(self):
        return filtered_covid_cases_get_queryset(CountryProvince, self.request.query_params)


class GlobalCaseViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = GlobalCaseSerializer

    def get_queryset(self):
        return filtered_global_us_get_queryset(GlobalCovidCase, self.request.query_params)


class StateNameViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = State.objects.all().order_by("name")
    serializer_class = StateNameAndIdSerializer


class USCasesViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = USCaseSerializer

    filter_backends = (filters.DjangoFilterBackend, )
    filterset_fields = ("state", )

    def get_queryset(self):
        return filtered_global_us_get_queryset(USCovidCase, self.request.query_params)
