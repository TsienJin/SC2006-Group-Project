from django.db import models
from djongo import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=255)
    age = models.IntegerField()

    class Meta:
        abstract = False



