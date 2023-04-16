import uuid
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from ..models.User import User

class Review(models.Model):
    ''' Review class for user created review on Toilet

    Attributes
    ---
    reviewID    : UUID          Unique identifier for each review in database
    userID      : String        Foreign key to userID
    toiletID    : String        Foreign key to toiletID
    rating      : Integer       1 to 5 star rating for Toilet (Higher the score, higher the rating)
    comment     : String        Additional review description
    
    Methods
    -------
    addReview()
        Saves the Review object to the database
    getReviewID()
        Returns the reviewID attribute of Review object
    getRating()
        Returns rating attribute of Review object
    getComment()
        Returns comment attribute of Review object
    '''
    reviewID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    userID = models.CharField(max_length=255, null=True, blank=False)
    toiletID = models.CharField(max_length=255, null = True, blank=False)
    rating = models.IntegerField(    
        validators=[MaxValueValidator(5), MinValueValidator(0)],
        null = False,
        default = 0
    )
    comment = models.CharField(max_length=255, null = True, blank=True, default = '')

    def __str__(self):
        ''' Defines string representation of Review in database

        Returns
        -------
        String
            Description of Review record
        '''
        userName = User.retrieveInfo(userID=self.userID).getName()
        return f"{self.toiletID}-{userName}"  
    
    def addReview(self):
        ''' Saves Review record to database
        '''
        self.save()
    
    def getReviewID(self):
        ''' Returns the reviewID attribute of Review object

        Returns
        -------
        String
            ReviewID attribute of Review object
        '''
        return self.reviewID

    def getRating(self):
        ''' Returns rating attribute of Review object

        Returns
        -------
        Integer
            Rating attribute of Review object
        '''
        return self.rating
    
    def getComment(self):
        ''' Returns comment attribute of Review object

        Returns
        -------
        String
            String attribute of Review object
        '''
        return self.comment

    ######################### Helper Functions #######################################

    def retrieveByUserAndToilet(userID, toiletID):
        ''' Retrieves Review record in database using userID and toiletID

        Parameters
        ----------
        userID: String
            userID of user that created Review object
        toiletID: String
            toiletID of toilet object reviewed in Review object

        Returns
        -------
        Review
            Unique Review object corresponding to given userID and toiletID 
        '''
        try:
            return Review.objects.get(userID=userID, toiletID=toiletID)
        except:
            return False
    
    def retrieveSetByToiletID(toiletID):
        ''' Retrieves a list of reviewID corresponding to a toiletID

        Parameters
        ----------
        toiletID: String
            toiletID of toilet object reviewed in Review object

        Returns
        -------
        List
            List of reviewID strings
        '''
        reviews = []
        querySet = Review.objects.filter(toiletID=toiletID)
        for review in querySet.values():
            userID = review["userID"]
            name = User.retrieveInfo(userID=userID).getName()
            rating = review["rating"]
            comment = review["comment"]
            reviews.append({"name": name, 
                            "rating" : rating, 
                            "comment": comment})
        return reviews



    
  