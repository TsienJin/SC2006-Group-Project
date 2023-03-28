# UC07: View Nearby Toilets
# UC12: Add Toilet Listing
# 
# deal with post requests when user presses on location and wants to view toilet description and reviews
import csv
from rest_framework.views import APIView
from django.http import JsonResponse

from ..models.Toilet import Toilet
from ..serializers import AddToiletSerializer, AddFavouriteToiletSerializer
from ..utils import forwardGeocoding

LIMIT = 2

# KIV - do we allow locations with the same long lat to be listed?
# 1) save all toilets from online toilet directory into database
# 2) send all toilet information in database to front-end
# changes: front end will run the scrape, i will update the database when front end prompts
# changes: add review along with retrieve toilet view
class RetrieveToiletView(APIView): # (into settings) to remove
    def get(self, request, *args, **kwargs):
        try:
            # call scrape.py everytime we toggle to update the csv
            # toilets = extractToiletInfoOnline()
            with open("./data/toilet/output.csv") as f:
                toilets = csv.reader(f)
                counter = 0
                for toilet in toilets:
                    if counter == LIMIT:
                        break
                    description = toilet[0] + " Toilet"
                    toiletType = "public"
                    addressComplete = toilet[1]
                    try:
                        postalCode_clean = ""
                        postalCode_dirty = addressComplete.split("S(")[1][:6]
                        for char in postalCode_dirty:
                            if ord(char) >= 48 and ord(char) <= 57:
                                postalCode_clean += char
                    except:
                        postalCode_clean = "None"
                    longitude, latitude = forwardGeocoding(addressComplete)

                    if Toilet.retrieveByLongitudeLatitude(longitude, latitude) != False:
                        print(addressComplete)
                        continue
                    else:
                        newToilet = Toilet(description=description, 
                                        toiletType=toiletType, 
                                        address=addressComplete, 
                                        postalCode=postalCode_clean, 
                                        longitude=longitude,
                                        latitude=latitude)
                        newToilet.addToilet()
                    counter += 1

            toiletsPayload = {}
            toiletsDatabase = Toilet.objects.all()
            for toilet in toiletsDatabase:
                description = toilet.description
                toiletType = toilet.toiletType
                address = toilet.address
                longitude = toilet.longitude
                latitude = toilet.latitude

                toiletsPayload[description] = {"toiletType": toiletType,
                                               "address": address,
                                               "longitude": longitude,
                                               "latitude": latitude}

            payload = {"everything": toiletsPayload}
            return JsonResponse(payload)
        except:
            payload = {"error_status": "405",
                       "error_message": "Toggle nearby toilets unsuccessful"}
            return JsonResponse(payload)

# KIV - whether to let front end post with long lat or send just the address and convernt in backend
class AddToiletView(APIView):
    serializer_class = AddToiletSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            description = serializer.data.get("description")
            toiletType = serializer.data.get("toiletType")
            address = serializer.data.get("address")
            postalCode = serializer.data.get("postalCode")
            longitude, latitude = forwardGeocoding(address)

            if Toilet.retrieveByLongitudeLatitude(longitude, latitude) == False:
                newToilet = Toilet(description=description, 
                                toiletType=toiletType, 
                                address=address, 
                                postalCode=postalCode, 
                                longitude=longitude,
                                latitude=latitude)
                newToilet.save()
                payload = {"success_message": "Toilet added successfully"}
                return JsonResponse(payload)
            else:
                payload = {"error_status": "406",
                           "error_message": "Toilet at address already exists"}
                return JsonResponse(payload)

class addFavouriteToiletView(APIView):
    serializer_class = AddFavouriteToiletSerializer
    def get(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            userID = serializer.data.get("userID")
            longitude = serializer.data.get("longitude")
            latitude = serializer.data.get("latitude")
            toilet = Toilet.retrieveByLongitudeLatitude(longitude=longitude, latitude=latitude)
            
            # toilet not found
            if toilet == False:
                payload = {"error_message": "Toilet not found"}
                return payload

            toiletID = toilet.getToiletID()
            # add toiletID into user.favToilets
            # update database




# class viewFavouriteToiletView

# class removeFavouriteToiletView