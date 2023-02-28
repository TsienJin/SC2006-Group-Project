from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class Review(models.Model):
    rating = models.IntegerField(    
        validators=[MaxValueValidator(5), MinValueValidator(0)],
        null = False,
        default = 0
    )
    comment = models.CharField(max_length=255, null = True, default = '')

    def __str__(self):
        return f'{self.rating}, {self.comment}'