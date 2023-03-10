from rest_framework import serializers

from .models.User import User
from .models.MoP import MoP
from .models.Toilet import Toilet
from .models.Location import Location
from .models.Review import Review


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["emailAddress", "password"]

class MoPSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoP
        fields = ["sessionID"] # KIV

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
class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ["logitude", "latitude", "addressLineOne", "addressLineTwo", "postalCode", "floorNumber"]

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ToiletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Toilet
        fields = ["description", "toiletType"]
