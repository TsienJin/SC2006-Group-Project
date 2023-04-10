import uuid
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class Traffic(models.Model):
    ''' Traffic class for traffic incidents extracted from LTA DataMall

    Attributes
    ----------
    trafficID   : UUID          
        Unique identifier for each traffic incident in database
    trafficType : String        
        Type of traffic incident (e.g., roadwork, accident, etc.)
    message     : String        
        Description of traffic incident
    longitude   : Float         
        6-decimal place longitude of traffic incident location
    latitude    : Float         
        6-decimal place latitude of traffic incident location location
    
    Methods
    -------
    addTrafficIncident()
        Saves the Traffic object to the database
    '''

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
        '''Defines string representation of Traffic record in database
        
        Returns
        -------
        String
            Description of Traffic record
        '''
        return str(self.message)

    def addTrafficIncident(self):
        ''' Saves Traffic record to database
        '''
        self.save()
    
    ######################### Helper Functions #######################################
    def retrieveByLongitudeLatitude(longitude, latitude):
        ''' Retrieves Traffic record in database using longitude and latitude

        Parameters
        ----------
        longitude: Float
            Longitude of traffic incident
        latitude: Float
            Latitude of traffic incident

        Returns
        -------
        Traffic
            Unique Traffic object corresponding to given longitude and latitude
        '''
        try:
            return Traffic.objects.get(longitude=longitude, latitude=latitude)
        except:
            return False