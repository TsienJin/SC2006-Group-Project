import csv
import json
import httplib2 as http
from urllib.parse import urlparse

import environ

env = environ.Env()
environ.Env.read_env()

if __name__ == '__main__':
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
    columns = trafficIncidents_json[0].keys()
    
    with open("output.csv", "w", newline='') as f:
        writer = csv.DictWriter(f, fieldnames=columns)
        writer.writeheader()
        for trafficIncident in trafficIncidents_json:
            writer.writerow(trafficIncident)