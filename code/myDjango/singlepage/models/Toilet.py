import uuid
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class Toilet(models.Model):
    toiletID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    description = models.CharField(max_length=255, null = True, default = '') # toilet name
    toiletType = models.CharField(max_length=255, null = False, default = 'public')
    address = models.CharField(max_length=255, null = True, default ='')
    postalCode = models.CharField(max_length=255, null = True, default = 'None')
    # 6 decimal places is represents 0.11m, more than enough to separate toilets within the same building
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
        return str(self.description)
    
    def getToiletID(self):
        return self.toiletID
    
    def addToilet(self):
        self.save()
    
    def deleteToilet(self):
        toilet = Toilet.objects.get(toiletID=self.toiletID)
        toilet.delete()

    def getLongitude(self):
        return self.longitude
    
    def getLatitude(self):
        return self.latitude

    def getAddress(self):
        return self.address
    
    ######################### Helper Functions #######################################

    def retrieveByLongitudeLatitude(longitude, latitude):
        try:
            return Toilet.objects.get(longitude=longitude, latitude=latitude)
        except:
            return False
    
    def retrieveByAddress(address):
        try:
            return Toilet.objects.get(address=address)
        except:
            return False
    
    def retrieveByPostalCode(postalCode):
        try:
            return Toilet.objects.get(postalCode=postalCode)
        except:
            return False
    
    def retrieveByToiletID(toiletID):
        try:
            return Toilet.objects.get(toiletID=toiletID)
        except:
            return False
    
    

    