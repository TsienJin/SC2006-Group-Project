from django.db import models

class Location(models.Model):
    longitude = models.PositiveIntegerField(null = False, default = 0)
    latitude = models.PositiveIntegerField(null = False, default = 0)
    addressLineOne = models.CharField(max_length=255, null = True, default = '')
    addressLineTwo = models.CharField(max_length=255, null = True, default = '')
    postalCode = models.PositiveIntegerField(null = True, default = '000000')
    floorNumber = models.CharField(max_length=255, null = True, default = '')

    def __str__(self):
        return f'{self.longitude}, {self.latitude}'