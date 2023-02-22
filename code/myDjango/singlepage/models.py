from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=255, null = True)
    password = models.CharField(max_length=128, null = True)
    displayName = models.CharField(max_length=255)
    age = models.IntegerField()

    def __str__(self):
        return f'{self.displayName}, {self.age}'

class MoP(models.Model):
    name = models.CharField(max_length=255)
    age = models.IntegerField()

    def __str__(self):
        return f'{self.name}, {self.age}'


class Toilet(models.Model):
    pass

# review comments

