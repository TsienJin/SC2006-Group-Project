# UC07: View Nearby Toilets
# deal with post requests when user presses on location and wants to view toilet description and reviews
import csv
from rest_framework.views import APIView
from django.http import JsonResponse

from ..models.Toilet import Toilet
from ..serializers import ToiletSerializer
from ..utils import convertAddressToLongLat, extractToiletInfoOnline

LIMIT = 2

# 1) save all toilets from online toilet directory into database
# 2) send all toilet information in database to front-end
class ToggleToiletView(APIView):
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
                    longitude, latitude = convertAddressToLongLat(addressComplete)

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
            payload = {"Error": 500}
            return JsonResponse(payload)