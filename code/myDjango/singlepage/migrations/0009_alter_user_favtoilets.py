# Generated by Django 4.1.7 on 2023-03-29 08:26

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("singlepage", "0008_user_favtoilets"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="favToilets",
            field=django.contrib.postgres.fields.ArrayField(
                base_field=models.CharField(blank=True, max_length=255),
                default=list,
                size=None,
            ),
        ),
    ]
