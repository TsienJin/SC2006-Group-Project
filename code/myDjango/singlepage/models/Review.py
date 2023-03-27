from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from ..models import User

class Review(models.Model):
    userID = models.CharField(max_length=255, null = True)
    toiletID = models.CharField(max_length=255, null = True)
    rating = models.IntegerField(    
        validators=[MaxValueValidator(5), MinValueValidator(0)],
        null = False,
        default = 0
    )
    comment = models.CharField(max_length=255, null = True, default = '')


    def __str__(self):
        return f'{self.rating}, {self.comment}'
    
    def addReview(self):
        self.save()

    def getRating(self):
        return self.rating
    
    def getComment(self):
        return self.comment


    ######################### Helper Functions #######################################

    def retrieveByToiletID(userID, toiletID):
        try:
            return User.objects.get(userID=id)
        except:
            return False
    
    def retrieveComment(userID, toiletID):
        try:
            return User.objects.get(userID=id)
        except:
            return False