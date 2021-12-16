# Generated by Django 4.0 on 2021-12-16 18:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='CountryProvince',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('province_name', models.CharField(max_length=100)),
                ('country', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='provinces', to='covid_cases_app.country')),
            ],
            options={
                'unique_together': {('province_name', 'country')},
            },
        ),
        migrations.CreateModel(
            name='State',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='USCovidCase',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('confirmed', models.PositiveIntegerField()),
                ('deaths', models.PositiveIntegerField()),
                ('state', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='covid_cases', to='covid_cases_app.state')),
            ],
            options={
                'unique_together': {('date', 'state')},
            },
        ),
        migrations.CreateModel(
            name='GlobalCovidCase',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('confirmed', models.PositiveIntegerField()),
                ('deaths', models.PositiveIntegerField()),
                ('recovered', models.PositiveIntegerField()),
                ('country', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='covid_cases', to='covid_cases_app.country')),
                ('country_province', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='covid_cases', to='covid_cases_app.countryprovince')),
            ],
            options={
                'unique_together': {('date', 'country_province')},
            },
        ),
    ]
