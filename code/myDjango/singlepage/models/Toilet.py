import uuid
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from ..models import Review

class Toilet(models.Model):
    ''' Toilet class for user created and scraped toilet data

    Attributes
    ---
    toiletID        : UUID          Unique identifier for each toilet in database
    name            : String        Toilet name
    address         : String        Address of toilet
    postalCode      : Integer       Postal code of toilet
    floorNumber     : String        Floor number of toilet 
    unitNumber      : String        Unit number of toilet
    longitude       : Float         6 decimal degree longitude (0.11m accuracy)
    latitude        : Float         6 decimal degree latitude (0.11m accuracy)
    locationType    : String        Location type of toilet
    isPublic        : Boolean       Boolean indicating whether toilet is public
    description     : String        Additional toilet description
    
    Methods
    -------
    getToiletID()
        Returns the ToiletID attribute of Toilet object
    getName()
        Returns name attribute of Toilet object
    getAddress()
        Returns address attribute of Toilet object
    getPostalCode()
        Returns postalCode attribute of Toilet object
    getFloorNumber()
        Returns floorNumber attribute of Toilet object
    getUnitNumber()
        Returns unitNumber attribute of Toilet object
    getLongitude()
        Returns longitude attribute of Toilet object
    getLatitude()
        Returns latitude attribute of Toilet object
    getLocationType()
        Returns locationType attribute of Toilet object
    getIsPublic()
        Returns isPublic attribute of Toilet object
    getDescription()
        Returns description attribute of Toilet object
    addToilet()
        Saves toilet record to database
    deleteToilet()
        Deletes toilet record from database
    getAverageRating()
        Returns average rating of Toilet from all reviews
    '''
    toiletID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    name = models.CharField(max_length=255, null=True, default='')
    address = models.CharField(max_length=255, null=True, default ='')
    postalCode = models.CharField(max_length=255, null=True, default='')
    floorNumber = models.CharField(max_length=255, null=True, blank=True, default=0)
    unitNumber = models.CharField(max_length=255, null=True, blank=True, default='')
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
        ''' Defines string representation of Toilet in database

        Returns
        -------
        String
            Description of Toilet record
        '''
        return str(self.name)
    
    def getToiletID(self):
        ''' Returns toiletID attribute of Toilet object

        Returns
        -------
        String
            toiletID attribute of Toilet object
        '''
        return self.toiletID 
    
    def getName(self):
        ''' Returns name attribute of Toilet object

        Returns
        -------
        String
            name attribute of Toilet object
        '''
        return(self.name)
    
    def getAddress(self):
        ''' Returns address attribute of Toilet object

        Returns
        -------
        String
            Address attribute of Toilet object
        '''
        return self.address
    
    def getPostalCode(self):
        ''' Returns postalCode attribute of Toilet object

        Returns
        -------
        String
            PostalCode attribute of Toilet object
        '''
        return self.postalCode
    
    def getFloorNumber(self):
        ''' Returns floorNumber attribute of Toilet object

        Returns
        -------
        String
            FloorNumber attribute of Toilet object
        '''
        return self.floorNumber
    
    def getUnitNumber(self):
        ''' Returns unitNumber attribute of Toilet object

        Returns
        -------
        String
            UnitNumber attribute of Toilet object
        '''
        return self.unitNumber

    def getLongitude(self):
        ''' Returns longitude attribute of Toilet object

        Returns
        -------
        Float
            Logitude attribute of Toilet object
        '''
        return self.longitude
    
    def getLatitude(self):
        ''' Returns latitude attribute of Toilet object

        Returns
        -------
        FLoat
            Latitude attribute of Toilet object
        '''
        return self.latitude
    
    def getLocationType(self):
        ''' Returns loationType attribute of Toilet object

        Returns
        -------
        String
            LocationType attribute of Toilet object
        '''
        return self.locationType
    
    def getIsPublic(self):
        ''' Returns IsPublic attribute of Toilet object

        Returns
        -------
        Boolean
            IsPublic attribute of Toilet object
        '''
        return self.isPublic
    
    def getDescription(self): 
        ''' Returns description attribute of Toilet object

        Returns
        -------
        String
            Description attribute of Toilet object
        '''
        return self.description
    
    def addToilet(self):
        ''' Saves Toilet record to database
        '''
        self.save()
    
    def deleteToilet(self):
        ''' Deletes Toilet record from database
        '''
        toilet = Toilet.objects.get(toiletID=self.toiletID)
        toilet.delete()

    def getAverageRating(self):
        ''' Returns average rating of Toilet from all reviews

        Searches for all reviews with the object's toiletID and returns the average rating

        Returns
        -------
        Float
            Average rating of toilet
        '''
        averageRating = 0.0
        reviews = Review.Review.retrieveSetByToiletID(toiletID=self.toiletID)
        for review in reviews:
            averageRating += review["rating"]
        if len(reviews) > 0:
            averageRating = averageRating/(len(reviews))
        return averageRating

    ######################### Helper Functions #######################################

    def retrieveByLongitudeLatitude(longitude, latitude):
        ''' Retrieves Toilet record in database using longitude and latitude

        Parameters
        ----------
        longitude: Float {.6f}
            Longitude of toilet
        latitude: Float {.6f}
            Latitude of toilet

        Returns
        -------
        Toilet
            Unique Toilet object corresponding to given longtiude and latitude 
        '''
        try:
            return Toilet.objects.get(longitude=longitude, latitude=latitude)
        except:
            return False
    
    def retrieveByAddress(address):
        ''' Retrieves Toilet record in database using address

        Assumes all toilets have unique addresses

        Parameters
        ----------
        address: String
            Address of toilet

        Returns
        -------
        toilet
            Unique Toilet object corresponding to given address 
        '''
        try:
            return Toilet.objects.get(address=address)
        except:
            return False
    
    def retrieveByToiletID(toiletID):
        ''' Retrieves Toilet record in database using toiletID

        Parameters
        ----------
        toiletID: String
            toiletID of Toilet

        Returns
        -------
        Toilet
            Unique Toilet object corresponding to given toiletID 
        '''
        try:
            return Toilet.objects.get(toiletID=toiletID)
        except:
            return False
        
    
    
    

    