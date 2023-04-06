import uuid

from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from ..models.User import User

class Review(models.Model):
    reviewID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    userID = models.CharField(max_length=255, null=True, blank=False)
    toiletID = models.CharField(max_length=255, null = True, blank=False)
    rating = models.IntegerField(    
        validators=[MaxValueValidator(5), MinValueValidator(0)],
        null = False,
        default = 0
    )
    comment = models.CharField(max_length=255, null = True, default = '')

    def __str__(self):
        userName = User.retrieveInfo(userID=self.userID).getName()
        return f"{self.toiletID}-{userName}"  
    
    def addReview(self):
        self.save()

    def getRating(self):
        return self.rating
    
    def getComment(self):
        return self.comment


    ######################### Helper Functions #######################################

    def retrieveByUserAndToilet(userID, toiletID):
        try:
            return Review.objects.get(userID=userID, toiletID=toiletID)
        except:
            return False
    
    def retrieveSetByToiletID(toiletID):
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



    
  