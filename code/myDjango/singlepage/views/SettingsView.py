# UC07 - View Nearby Toilet
# UC15 - Viewing traffic incidents and road conditions

import csv
import json
import httplib2 as http
from urllib.parse import urlparse

import environ

env = environ.Env()
environ.Env.read_env()


from rest_framework.views import APIView
from django.http import JsonResponse

from ..models import Toilet
from ..models import Traffic
from ..utils import forwardGeocoding


# separate the parsing logic into another function, this route will only iterate the database and send all info to front end
    
LIMIT = 10
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
        



# trigger the traffic api to send high traffic areas to the front end to display
class RetrieveTrafficView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            API_KEY = env('LTA_API_KEY')
            base_url = "http://datamall2.mytransport.sg/ltaodataservice/TrafficIncidents"
            headers = {"AccountKey": API_KEY,
                    "accept": "application/json"}
            
            target = urlparse(base_url)
            method = "GET"
            body = ""

            h = http.Http()

            response, content = h.request(target.geturl(),
                                        method,
                                        body,
                                        headers)
            trafficIncidents_json = json.loads(content)["value"]

            payload = {
                'incidents': []
            }
            counter = 1
            for trafficIncident in trafficIncidents_json:
                trafficType = trafficIncident['Type']
                message = trafficIncident['Message']
                longitude = trafficIncident['Longitude']
                latitude = trafficIncident['Latitude']
                payload['incidents'].append({"trafficType": trafficType,
                                    "message": message,
                                    "coordinates": {"longitude": longitude,
                                                    "latitude": latitude}})
                counter += 1
            
            return JsonResponse(payload)
        except:
            payload = {"error_message": "API down"}
            return JsonResponse(payload)

# UC06 - Report Bug is handled on the front-end