from django.db import models

class Toilet(models.Model):
    description = models.CharField(max_length=255, null = True, default = '')
    toiletType = models.CharField(max_length=255, null = False, default = 'public')
    # review = Review()
    # location = Location()

    def __str__(self):
        return f'{self.description}, {self.toiletType}'