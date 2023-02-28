# UC01 - Account Creation
# UC05 - Reset Password via Email

import json
from rest_framework.views import APIView
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
from django.core.serializers.json import DjangoJSONEncoder

from ..models.User import User
from ..serializers import RegisterSerializer
from ..utils import checkEmailFormat

class RegisterView(APIView):
    serializer_class = RegisterSerializer

    # checks for password and confirm password needs to be done at front end since it is not passed to backend
    # emailAddress must be unique
    # sessionID created and saved once account is registered and redirected to login
    # password is hashed before storing into database
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            emailAddress = serializer.data.get('emailAddress')
            password = serializer.data.get('password')

            if User.emailTaken(emailAddress):
                return JsonResponse({"error_status": "402",
                                     "error_message": "Email already taken."})

            if not checkEmailFormat(emailAddress):
                return JsonResponse({"error_status": "403",
                                     "error_message": "Invalid email address format."})
            
            # make_password() hashes the password using the hashers we put in settings.py
            # we are using bcrypt SHA256 primarily here
            password = make_password(password)
            user = User(name=name, emailAddress=emailAddress, password=password)
            user.register()
            user.login(request)
            
            # json.dumps(user.userID, cls=DjangoJSONEncoder)
            payload = { "usrEmail": emailAddress,
                        "usrName": name,
                        "usrID": user.userID,
                        "sessionID": user.sessionID }

            return JsonResponse(payload)
        


            




