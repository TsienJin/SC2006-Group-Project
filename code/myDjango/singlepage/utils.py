import re
import csv
import environ
import requests
from models.Toilet import Toilet

env = environ.Env()
environ.Env.read_env()

# though models.EmailField already checks for email format, this is for additional restrictions
def checkEmailFormat(emailAddress):
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    if(re.fullmatch(regex, emailAddress)):
        return True
    else:
        return False

# PositionStack
# def convertAddressToLongLat(address):
#     longitude, latitude = None, None
#     API_KEY = env('POSITION_STACK_API_KEY')
#     base_url = "http://api.positionstack.com/v1/forward"
#     endpoint = f"{base_url}?access_key={API_KEY}&query={address}"

#     r = requests.get(endpoint)
#     if r.status_code not in range(200, 299):
#         return 0, 0
#     try:
#         results = r.json()['data'][0]
#         longitude = results['longitude']
#         latitude = results['latitude']
#     except:
#         return 0, 0
    
#     return longitude, latitude

# MapBox
def forwardGeocoding(address):
    longitude, latitude = None, None
    API_KEY = env('NEXT_PUBLIC_MAPBOX_KEY')
    base_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
    endpoint = f"{base_url}{address}.json?access_token={API_KEY}&limit=1"

    response = requests.get(endpoint)
    if response.status_code not in range(200, 299):
        return 0, 0
    try:
        longitude = response.json()["features"][0]["center"][0]
        latitude = response.json()["features"][0]["center"][1]
    except:
        return 0, 0
    
    return longitude, latitude

def backwardGeocoding(longitude, latitude):
    pass

def extractToiletInfoOnline():
    print("hi")
    with open("./data/toilet/output.csv") as f:
        toilets = csv.reader(f)
    return toilets

LIMIT = 2
def updateToilets():
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
    
updateToilets()

