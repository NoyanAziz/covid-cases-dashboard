from rest_framework import serializers

from covid_cases_app.models import Country, CountryProvince, GlobalCovidCase, USCovidCase, State


class ProvinceNameAndId(serializers.ModelSerializer):

    class Meta:
        model = CountryProvince
        fields = ["id", "province_name"]


class CountryNameSerializer(serializers.ModelSerializer):

    class Meta:
        model = Country
        fields = ["name"]


class CountryProvinceNameSerializer(serializers.ModelSerializer):
    provinces = ProvinceNameAndId(many=True, read_only=True)

    class Meta:
        model = Country
        fields = ["name", "provinces"]


class GlobalCaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = GlobalCovidCase
        fields = "__all__"


class CountryCaseSerializer(serializers.ModelSerializer):
    covid_cases = GlobalCaseSerializer(many=True, read_only=True, source="filtered_covid_cases")

    class Meta:
        model = Country
        fields = "__all__"


class CountryProvinceCaseSerializer(serializers.ModelSerializer):
    covid_cases = GlobalCaseSerializer(many=True, read_only=True, source="filtered_covid_cases")

    class Meta:
        model = CountryProvince
        fields = "__all__"


class StateNameAndIdSerializer(serializers.ModelSerializer):

    class Meta:
        model = State
        fields = "__all__"


class USCaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = USCovidCase
        fields = "__all__"
