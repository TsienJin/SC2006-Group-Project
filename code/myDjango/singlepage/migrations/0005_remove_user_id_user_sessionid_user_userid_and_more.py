# Generated by Django 4.1.7 on 2023-02-28 08:05

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):
    dependencies = [
        ("singlepage", "0004_auto_20230222_1135"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="user",
            name="id",
        ),
        migrations.AddField(
            model_name="user",
            name="sessionID",
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name="user",
            name="userID",
            field=models.UUIDField(
                default=uuid.uuid4, editable=False, primary_key=True, serialize=False
            ),
        ),
        migrations.AlterField(
            model_name="location",
            name="id",
            field=models.BigAutoField(
                auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
            ),
        ),
        migrations.AlterField(
            model_name="mop",
            name="id",
            field=models.BigAutoField(
                auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
            ),
        ),
        migrations.AlterField(
            model_name="review",
            name="id",
            field=models.BigAutoField(
                auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
            ),
        ),
        migrations.AlterField(
            model_name="toilet",
            name="id",
            field=models.BigAutoField(
                auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
            ),
        ),
        migrations.AlterField(
            model_name="user",
            name="emailAddress",
            field=models.EmailField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="name",
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="password",
            field=models.CharField(max_length=255, null=True),
        ),
    ]
