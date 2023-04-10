import uuid
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from ..models import Review

class Toilet(models.Model):
    ''' User class for registered users of Naviloo

    Attributes
    ---
    userID      : UUID          Unique identifier for each user in database
    name        : String        Name of account
    emailAddress: Email         Email address of account
    password    : String        Password of account
    sessionID   : String        Cookie keeping track of user login 
    favToilets  : List          List of toiletIDs that user favourited
    
    Methods
    -------
    register()
        Saves the User object to the database
    getName()
        Returns the name attribute of the User object
    getEmailAddress()
        Returns emailAddress attribute of User object
    getPassword()
        Returns password attribute of User object
    getSessionID()
        Returns sessionID attribute of User object
    getFavToilets()
        Returns favToilets attribute of User object
    login(request)
        Creates a session and updates sessionID with new sessionID to database
    logout(request)
        Clears the session and updates sessionID with NULL to database
    isAuthenticated(sessionKey)
        Checks if session belongs to User
    isFavourite(toiletID)
        Checks if toilet is favourited by User
    updateName(newName)
        Updates name with new name
    updateEmailAddress(newEmailAddress)
        Updates email address with new email address
    updatePassword(newPassword)
        Updates password with new password
    updateFavToilets(newFavToilets)
        Updates favToilets with new favToilets
    '''
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

    def getAverageRating(self):
        averageRating = 0.0
        reviews = Review.Review.retrieveSetByToiletID(toiletID=self.toiletID)
        for review in reviews:
            averageRating += review["rating"]
        if len(reviews) > 0:
            averageRating = averageRating/(len(reviews))
        return averageRating

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
        
    
    
    

    