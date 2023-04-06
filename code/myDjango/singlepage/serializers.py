from rest_framework import serializers

from .models.User import User
from .models.Toilet import Toilet 
from .models.Review import Review


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["emailAddress", "password"]

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["name", "emailAddress", "password"]

class EditNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["name"]

class EditEmailAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["emailAddress"]

class EditPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["password"]

class ResetPasswordEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["emailAddress", "password"]

class AddToiletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Toilet
        fields = ["name", "address", "postalCode", "floorNumber", "unitNumber", "longitude", "latitude", "locationType", "isPublic", "description"]

class AddFavouriteToiletSerializer(serializers.ModelSerializer):
    userID = serializers.CharField(read_only=False)
    class Meta:
        model = Toilet
        fields = ["userID", "longitude", "latitude"]

class RemoveFavouriteToiletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Toilet
        fields = ["longitude", "latitude"] 

class RetrieveReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["userID", "toiletID"]

class AddReviewSerializer(serializers.ModelSerializer):
    longitude = serializers.DecimalField(decimal_places = 6, max_digits = 9, read_only=False)
    latitude = serializers.DecimalField(decimal_places = 6, max_digits = 8, read_only=False)
    class Meta:
        model = Review
        fields = ["longitude", "latitude", "rating", "comment"]
