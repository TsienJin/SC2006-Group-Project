# Generated by Django 4.1.7 on 2023-04-03 12:01

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("singlepage", "0002_alter_toilet_locationtype"),
    ]

    operations = [
        migrations.AlterField(
            model_name="toilet",
            name="floorNumber",
            field=models.CharField(blank=True, default=0, max_length=255, null=True),
        ),
    ]
