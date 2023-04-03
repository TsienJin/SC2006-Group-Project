import uuid
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class Toilet(models.Model):
    # unique identifier for toilets
    toiletID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    # address related fields
    name = models.CharField(max_length=255, null=True, default='')
    address = models.CharField(max_length=255, null=True, default ='')
    postalCode = models.CharField(max_length=255, null=True, default='')
    floorNumber = models.CharField(max_length=255, null=True, blank=True, default=0)
    unitNumber = models.CharField(max_length=255, null=True, blank=True, default='')
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
    # description related fields
    locationType = models.CharField(max_length=255, null=True, blank=True, default='')
    isPublic = models.BooleanField(null=False, blank=True, default=True) # 1 or 0 as string works as input
    description = models.CharField(max_length=255, null=True, blank=True, default='') # toilet name

    def __str__(self):
        return str(self.name)
    
    def getToiletID(self):
        return self.toiletID 
    
    def getName(self):
        return(self.name)
    
    def getAddress(self):
        return self.address
    
    def getPostalCode(self):
        return self.postalCode
    
    def getFloorNumber(self):
        return self.floorNumber
    
    def getUnitNumber(self):
        return self.unitNumber

    def getLongitude(self):
        return self.longitude
    
    def getLatitude(self):
        return self.latitude
    
    def getLocationType(self):
        return self.locationType
    
    def getIsPublic(self):
        return self.isPublic
    
    def getDescription(self):
        return self.description
    
    def addToilet(self):
        self.save()
    
    def deleteToilet(self):
        toilet = Toilet.objects.get(toiletID=self.toiletID)
        toilet.delete()

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
    
    def retrieveByToiletID(toiletID):
        try:
            return Toilet.objects.get(toiletID=toiletID)
        except:
            return False
        
    
    
    

    