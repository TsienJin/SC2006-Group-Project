# Generated by Django 4.1.7 on 2023-03-31 01:31

from django.db import migrations
import django.db.models.manager


class Migration(migrations.Migration):
    dependencies = [
        ("singlepage", "0014_remove_toilet_toilettype_toilet_floornumber_and_more"),
    ]

    operations = [
        migrations.AlterModelManagers(
            name="toilet",
            managers=[
                ("object", django.db.models.manager.Manager()),
            ],
        ),
    ]