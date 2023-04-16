import re
import csv
import environ
import requests
from .models.Toilet import Toilet

env = environ.Env()
environ.Env.read_env()

def checkEmailFormat(emailAddress):
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    if(re.fullmatch(regex, emailAddress)):
        return True
    else:
        return False

def checkPasswordComplexity(password):
    flag = 0
    while True:
        if (len(password) < 8 or len(password) > 255):
            flag = 1
            break
        elif not re.search("[A-Za-z]", password):
            flag = 1
            break
        elif not re.search("[0-9]", password):
            flag = 1
            break
        else:
            return True
    return False

# PositionStack
def forwardGeocoding_ps(address):
    longitude, latitude = None, None
    API_KEY = env('POSITION_STACK_API_KEY')
    base_url = "http://api.positionstack.com/v1/forward"
    endpoint = f"{base_url}?access_key={API_KEY}&query={address}"

    r = requests.get(endpoint)
    if r.status_code not in range(200, 299):
        return 0, 0
    try:
        results = r.json()['data'][0]
        longitude = results['longitude']
        latitude = results['latitude']
    except:
        return 0, 0
    
    return longitude, latitude

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
        longitude = "{0:.6f}".format(longitude)
        latitude = response.json()["features"][0]["center"][1]
        latitude = "{0:.6f}".format(latitude)
    except:
        return 0, 0
    
    return longitude, latitude

def backwardGeocoding(longitude, latitude):
    API_KEY = env('NEXT_PUBLIC_MAPBOX_KEY')
    base_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
    endpoint = f"{base_url}{longitude},{latitude}.json?access_token={API_KEY}&limit=1"

    response = requests.get(endpoint)
    if response.status_code not in range(200, 299):
        return None
    try:
        address = response.json()["features"][0]["place_name"]
    except:
        return None
    return address

def extractToiletInfoOnline():
    print("hi")
    with open("./data/toilet/output.csv") as f:
        toilets = csv.reader(f)
    return toilets

def updateToilets(LIMIT:int=-1):
    with open("./data/toilet/output.csv") as f:
        toilets = csv.reader(f)
        counter = 0
        for toilet in toilets:
            if counter == LIMIT:
                break
            name = toilet[0] + " Toilet"
            address = toilet[1]
            locationType = toilet[2]
            
            try:
                postalCode_clean = ""
                postalCode_dirty = address.split("S(")[1][:6]
                for char in postalCode_dirty:
                    if ord(char) >= 48 and ord(char) <= 57:
                        postalCode_clean += char
            except:
                postalCode_clean = "None"
            longitude, latitude = forwardGeocoding(address)
            if Toilet.retrieveByLongitudeLatitude(longitude, latitude) != False:
                print(address)
                pass
            else:
                newToilet = Toilet(name=name,
                                   address=address,
                                   postalCode=postalCode_clean,
                                   longitude=longitude,
                                   latitude=latitude,
                                   locationType=locationType)
                newToilet.addToilet()
            counter += 1