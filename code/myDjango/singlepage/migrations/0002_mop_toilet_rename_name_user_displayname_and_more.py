# Generated by Django 4.1.7 on 2023-02-20 15:50

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("singlepage", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="MoP",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255)),
                ("age", models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name="Toilet",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
            ],
        ),
        migrations.RenameField(
            model_name="user",
            old_name="name",
            new_name="displayName",
        ),
        migrations.AddField(
            model_name="user",
            name="password",
            field=models.CharField(max_length=128, null=True),
        ),
        migrations.AddField(
            model_name="user",
            name="username",
            field=models.CharField(max_length=255, null=True),
        ),
    ]
