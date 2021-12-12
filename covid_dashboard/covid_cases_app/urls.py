from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import CountryNameViewSet, CountryCaseViewSet, CountryProvinceCasesViewSet, GlobalCaseViewSet, \
    USCasesViewSet, StateNameViewSet

router = DefaultRouter()
router.register(r"countries", CountryNameViewSet, basename="countries")
router.register(r"country-cases", CountryCaseViewSet, basename="country-cases")
router.register(r"country-province-cases", CountryProvinceCasesViewSet, basename="country-province-cases")
router.register(r"global-cases", GlobalCaseViewSet, basename="global-cases")
router.register(r"us-cases", USCasesViewSet, basename="us-cases")
router.register(r"states", StateNameViewSet, basename="states")


urlpatterns = [
    path("", include(router.urls)),
]
