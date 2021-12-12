from django.db import models


class State(models.Model):
    name = models.CharField(max_length=100)


class Country(models.Model):
    name = models.CharField(max_length=100)


class CountryProvince(models.Model):
    class Meta:
        unique_together = ["province_name", "country"]

    province_name = models.CharField(max_length=100)

    country = models.ForeignKey(Country, related_name="provinces", on_delete=models.CASCADE)


class GlobalCovidCase(models.Model):
    class Meta:
        unique_together = ["date", "country_province"]

    date = models.DateField()
    confirmed = models.PositiveIntegerField()
    deaths = models.PositiveIntegerField()
    recovered = models.PositiveIntegerField()

    country_province = models.ForeignKey(CountryProvince, related_name="covid_cases", on_delete=models.CASCADE)
    country = models.ForeignKey(Country, related_name="covid_cases", on_delete=models.CASCADE)


class USCovidCase(models.Model):
    class Meta:
        unique_together = ["date", "state"]

    date = models.DateField()
    confirmed = models.PositiveIntegerField()
    deaths = models.PositiveIntegerField()

    state = models.ForeignKey(State, related_name="covid_cases", on_delete=models.CASCADE)
