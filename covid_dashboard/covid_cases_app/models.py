from django.db import models


class State(models.Model):
    name = models.CharField(max_length=100, unique=True)


class Country(models.Model):
    name = models.CharField(max_length=100, unique=True)


class CountryProvince(models.Model):
    province_name = models.CharField(max_length=100)

    country = models.ForeignKey(Country, related_name="provinces", on_delete=models.CASCADE)

    class Meta:
        unique_together = ["province_name", "country"]


class GlobalCovidCase(models.Model):
    date = models.DateField()
    confirmed = models.PositiveIntegerField()
    deaths = models.PositiveIntegerField()
    recovered = models.PositiveIntegerField()

    country_province = models.ForeignKey(CountryProvince, related_name="covid_cases", on_delete=models.CASCADE)
    country = models.ForeignKey(Country, related_name="covid_cases", on_delete=models.CASCADE)

    class Meta:
        unique_together = ["date", "country_province"]


class USCovidCase(models.Model):
    date = models.DateField()
    confirmed = models.PositiveIntegerField()
    deaths = models.PositiveIntegerField()

    state = models.ForeignKey(State, related_name="covid_cases", on_delete=models.CASCADE)

    class Meta:
        unique_together = ["date", "state"]
