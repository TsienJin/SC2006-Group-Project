# Generated by Django 4.1.7 on 2023-03-31 02:31

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("singlepage", "0016_alter_toilet_managers"),
    ]

    operations = [
        migrations.AlterField(
            model_name="toilet",
            name="isPublic",
            field=models.BooleanField(blank=True, default=True),
        ),
    ]