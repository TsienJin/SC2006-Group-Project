# UC09 - Adding Toilets to Favourites
# UC10 - View Favourited Toilets
# UC11 - Add Toilet Listing

import csv
from rest_framework.views import APIView
from django.http import JsonResponse

from ..models.User import User
from ..models.Toilet import Toilet
from ..serializers import AddToiletSerializer
from ..serializers import AddFavouriteToiletSerializer
from ..utils import forwardGeocoding

class AddToiletView(APIView):
    serializer_class = AddToiletSerializer
    def post(self, request, *args, **kwargs):
        req_data = request.data.copy()
        req_data["longitude"] = "{0:.6f}".format(float(req_data["longitude"]))
        req_data["latitude"] = "{0:.6f}".format(float(req_data["latitude"]))
        serializer = self.serializer_class(data=req_data)
        if serializer.is_valid():
            name = serializer.data.get("name")
            address = serializer.data.get("address")
            postalCode = serializer.data.get("postalCode")
            floorNumber = serializer.data.get("floorNumber")
            unitNumber = serializer.data.get("unitNumber")
            longitude = serializer.data.get("longitude")
            latitude = serializer.data.get("latitude")
            locationType = serializer.data.get("locationType")
            isPublic = serializer.data.get("isPublic")
            description = serializer.data.get("description")

            if Toilet.retrieveByLongitudeLatitude(longitude, latitude) == False:
                newToilet = Toilet(name=name,
                                   address=address,
                                   postalCode=postalCode,
                                   floorNumber=floorNumber,
                                   unitNumber=unitNumber,
                                   longitude=longitude,
                                   latitude=latitude,
                                   locationType=locationType,
                                   isPublic=isPublic,
                                   description=description)
                newToilet.save()
                payload = {"success_message": "Toilet added successfully"}
                return JsonResponse(payload)
            else:
                payload = {"error_status": "406",
                           "error_message": "Toilet at address already exists"}
                return JsonResponse(payload)
        else:
            payload = {"error_message": "Toilet added unsuccessfully"}
            return JsonResponse(payload)
        
class AddFavouriteToiletView(APIView):
    serializer_class = AddFavouriteToiletSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            userID = request.session['user']
            longitude = serializer.data.get("longitude")
            latitude = serializer.data.get("latitude")
            user = User.retrieveInfo(userID)
            toilet = Toilet.retrieveByLongitudeLatitude(longitude=longitude, latitude=latitude)

            # toilet not found
            if toilet == False:
                payload = {"error_message": "Toilet not found"}
                return JsonResponse(payload)

            toiletID = toilet.getToiletID()
            
            # check if toilet is already a favourite
            if user.isFavourite(toiletID):
                payload = {"error_message": "Toilet already favourited"}
                return JsonResponse(payload)
            else:
                favToilets = user.getFavToilets()
                favToilets.append(toiletID)
                user.updateFavToilets(favToilets)
                payload = {"succcess_message": "Toilet favourited successfully"}
                return JsonResponse(payload)

class RetrieveFavouriteToiletView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            userID = request.GET["userID"]
            user = User.retrieveInfo(userID=userID)
            if user == False:
                payload = {"error_message": "Invalid user"}
                return JsonResponse(payload)
            favToilets = user.getFavToilets()
            if favToilets == []:
                payload = {"error_message": "Empty favourite toilet list"}
                return JsonResponse(payload)
            else:
                payload = {
                    "favourite_toilets": []
                }
                for toiletID in favToilets:
                    toilet = Toilet.retrieveByToiletID(toiletID)
                    if toilet == False:
                        payload = {"error_message": "Toilet not found"}
                        return JsonResponse(payload)
                    else:
                        toiletName = toilet.getName()
                        coordinates = {"longitude": toilet.getLongitude(),
                                      "latitude": toilet.getLatitude()}
                        payload["favourite_toilets"].append({"toiletID": toiletID,
                                                             "toiletName": toiletName,
                                                            "coordinates": coordinates})
                return JsonResponse(payload)
        except:
            payload = {"error_message": "Unexpected error"}
            return JsonResponse(payload)

# KIV - remove favourite toilet