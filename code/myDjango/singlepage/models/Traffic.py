import uuid
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# LTA's data on longitude and latitude is much more accurate than MapBox (16 vs 6 decimal places).
class Traffic(models.Model):
    trafficID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    trafficType = models.CharField(max_length=255, null = False, default = '')
    message = models.CharField(max_length=255, null = False, default = '')
    longitude = models.DecimalField(
        validators=[MaxValueValidator(180), MinValueValidator(-180)],
        null = False,
        default = 0,
        decimal_places = 6,
        max_digits = 9
    )
    latitude = models.DecimalField(
        validators=[MaxValueValidator(90), MinValueValidator(-90)],
        null = False,
        default = 0,
        decimal_places = 6,
        max_digits = 8
    )

    def __str__(self):
        return str(self.message)

    def addTrafficIncident(self):
        self.save()
    
    ######################### Helper Functions #######################################
    def retrieveByLongitudeLatitude(longitude, latitude):
        try:
            return Traffic.objects.get(longitude=longitude, latitude=latitude)
        except:
            return False