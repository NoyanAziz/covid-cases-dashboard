import datetime

from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django_filters import rest_framework as filters
from django.db.models import Sum
from rest_framework import viewsets

from covid_cases_app.models import Country, CountryProvince, GlobalCovidCase, USCovidCase, State
from covid_cases_app.serializers import CountryCaseSerializer, CountryProvinceCaseSerializer, GlobalCaseSerializer, \
    USCaseSerializer, CountryNameSerializer, StateNameAndIdSerializer, CountryProvinceNameSerializer
from .helper import filtered_covid_cases_get_queryset, filtered_global_us_get_queryset


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

    def retrieve(self, request, name=None, *args, **kwargs):
        country = get_object_or_404(Country.objects.all(), name=name)

        today = datetime.date.today()
        passed_days = self.request.query_params.get("days", None)

        if passed_days and passed_days.isdigit():
            starting_date = today - datetime.timedelta(days=int(passed_days))
            covid_cases = list(GlobalCovidCase.objects
                               .filter(country_id=country.id, date__gte=starting_date)
                               .values("date")
                               .order_by("date")
                               .annotate(confirmed=Sum("confirmed"), deaths=Sum("deaths"), recovered=Sum("recovered"))
                               )

        else:
            covid_cases = list(GlobalCovidCase.objects
                               .filter(country_id=country.id)
                               .values("date")
                               .order_by("date")
                               .annotate(confirmed=Sum("confirmed"), deaths=Sum("deaths"), recovered=Sum("recovered"))
                               )

        return JsonResponse({"covid_cases": covid_cases}, safe=False)


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
