# UC07 - View Nearby Toilet
# UC15 - Viewing traffic incidents and road conditions

import json
import httplib2 as http
from urllib.parse import urlparse

import environ

env = environ.Env()
environ.Env.read_env()

from rest_framework.views import APIView
from django.http import JsonResponse

from ..models.Toilet import Toilet
from ..models.Review import Review
from ..utils import updateToilets

# changes: add review along with retrieve toilet view
class RetrieveToiletView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            updateToilets(50)

            payload = {
                "toilets": []
            }
            toiletsDatabase = Toilet.objects.all()
            for toilet in toiletsDatabase:
                toiletID = toilet.getToiletID()
                name = toilet.getName()
                address = toilet.getAddress()
                postalCode = toilet.getPostalCode()
                floorNumber = toilet.getFloorNumber()
                unitNumber = toilet.getUnitNumber()
                longitude = toilet.getLongitude()
                latitude = toilet.getLatitude()
                locationType = toilet.getLocationType()
                isPublic = toilet.getIsPublic()
                description = toilet.getDescription()

                initialReview = Review.retrieveSetByToiletID(toiletID=toiletID)
                averageRating = 0.0
                for review in initialReview:
                    averageRating += review["rating"]
                if len(initialReview) > 0:
                    averageRating = averageRating/(len(initialReview))

                payload["toilets"].append({"Address": {"name": name,
                                                        "address": address,
                                                        "postalCode": postalCode,
                                                        "floorNumber": floorNumber,
                                                        "unitNumber": unitNumber,
                                                        "coordinates": {"longitude": longitude,
                                                                        "latititude": latitude}},
                                            "Description":{"locationType": locationType,
                                                            "isPublic": isPublic,
                                                            "description": description},
                                            "reviews": initialReview,
                                            "averageRating": averageRating})
            
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
            for trafficIncident in trafficIncidents_json:
                trafficType = trafficIncident['Type']
                message = trafficIncident['Message']
                longitude = trafficIncident['Longitude']
                latitude = trafficIncident['Latitude']
                payload['incidents'].append({"trafficType": trafficType,
                                            "message": message,
                                            "coordinates": {"longitude": longitude,
                                                            "latitude": latitude}})
            
            return JsonResponse(payload)
        except:
            payload = {"error_message": "API down"}
            return JsonResponse(payload)

# UC06 - Report Bug is handled on the front-end