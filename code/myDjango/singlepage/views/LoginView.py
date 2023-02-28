# UC03 - Login

from rest_framework.views import APIView
from django.http import JsonResponse

from ..models.User import User
from ..serializers import UserSerializer

class LoginView(APIView):
    serializer_class = UserSerializer

    # send user information response back to frontend
    # def get(self, request, *args, **kwargs):
    #     if request.user.is_authenticated:
    #         emailAddress = User.retrieveInfo(request.session['user']).emailAddress
    #         name = User.retrieveInfo(request.session['user']).name
    #         userID = User.retrieveInfo(request.session['user']).userID
    #         sessionID = User.retrieveInfo(request.session['user']).sessionID
    #         payload = { "usrEmail": emailAddress,
    #                     "usrName": name,
    #                     "usrID": userID,
    #                     "sessionID": sessionID }
    #         return JsonResponse(payload)
        
    #     else:
    #         payload = {error }

    
    # one additional check if emailAddress and password exists
    # checks database if user with emailAddress and password exists
    # if exists, logs in user and returns information back to frontend
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            emailAddress = serializer.data.get('emailAddress')
            password = serializer.data.get('password')

            if emailAddress is None or password is None:
                return JsonResponse({"error_status": "400",
                                    "error_message": "Invalid parameters passed"})

            authenticated = User.verifyCredentials(emailAddress, password)

            if not authenticated:
                return JsonResponse({"error_status": "401",
                                    "error_message": "Wrong email address or password"})

            user = User.retrieveByEmailAddress(emailAddress)
            user.login(request)

            payload = { "usrEmail": emailAddress,
                        "usrName": user.name,
                        "usrID": user.userID,
                        "sessionID": user.sessionID }
            return JsonResponse(payload)

            

