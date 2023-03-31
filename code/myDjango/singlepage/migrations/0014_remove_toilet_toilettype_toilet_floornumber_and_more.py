# Generated by Django 4.1.7 on 2023-03-30 16:14

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("singlepage", "0013_traffic_delete_location_delete_mop_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="toilet",
            name="toiletType",
        ),
        migrations.AddField(
            model_name="toilet",
            name="floorNumber",
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AddField(
            model_name="toilet",
            name="isPublic",
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name="toilet",
            name="locationType",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
        migrations.AddField(
            model_name="toilet",
            name="name",
            field=models.CharField(default="", max_length=255, null=True),
        ),
        migrations.AddField(
            model_name="toilet",
            name="unitNumber",
            field=models.CharField(default="", max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name="toilet",
            name="description",
            field=models.CharField(blank=True, default="", max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name="toilet",
            name="postalCode",
            field=models.CharField(default="", max_length=255, null=True),
        ),
    ]