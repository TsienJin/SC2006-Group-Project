# Generated by Django 4.1.6 on 2023-03-30 11:22

import django.contrib.postgres.fields
import django.core.validators
from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('singlepage', '0012_alter_user_favtoilets'),
    ]

    operations = [
        migrations.CreateModel(
            name='Traffic',
            fields=[
                ('trafficID', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('trafficType', models.CharField(default='', max_length=255)),
                ('message', models.CharField(default='', max_length=255)),
                ('longitude', models.DecimalField(decimal_places=6, default=0, max_digits=9, validators=[django.core.validators.MaxValueValidator(180), django.core.validators.MinValueValidator(-180)])),
                ('latitude', models.DecimalField(decimal_places=6, default=0, max_digits=8, validators=[django.core.validators.MaxValueValidator(90), django.core.validators.MinValueValidator(-90)])),
            ],
        ),
        migrations.DeleteModel(
            name='Location',
        ),
        migrations.DeleteModel(
            name='MoP',
        ),
        migrations.AlterField(
            model_name='user',
            name='favToilets',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=255), blank=True, default=list, null=True, size=None),
        ),
    ]
