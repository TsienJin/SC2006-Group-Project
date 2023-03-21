# UC07: View Nearby Toilets
# deal with post requests when user presses on location and wants to view toilet description and reviews

from rest_framework.views import APIView
from django.http import JsonResponse

from ..models.Toilet import Toilet
from ..serializers import ToiletSerializer

class ToggleToiletView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            user = User.retrieveInfo(request.session['user'])
            user.logout(request)
            payload = {"logout": True}
            return JsonResponse(payload)
        except:
            payload = {"logout": False}
            return JsonResponse(payload)