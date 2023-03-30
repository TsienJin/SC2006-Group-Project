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
        fields = ["emailAddress"]

# just need to take in lat long 
class AddToiletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Toilet
        fields = ["description", "toiletType", "address", "postalCode"]

class AddFavouriteToiletSerializer(serializers.ModelSerializer):
    userID = serializers.CharField(read_only=False)
    class Meta:
        model = Toilet
        fields = ["userID", "longitude", "latitude"]

class RetrieveReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["userID", "toiletID"]

class AddReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["toiletID", "rating", "comment"]
