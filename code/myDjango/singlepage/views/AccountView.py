# UC03 - Logout
# UC04 - Change Password

from rest_framework.views import APIView
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password

from ..models.User import User
from ..serializers import EditNameSerializer, EditEmailAddressSerializer, EditPasswordSerializer 

class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            user = User.retrieveInfo(request.session['user'])
            user.logout(request)
            payload = {"logout": True}
            return JsonResponse(payload)
        except:
            payload = {"logout": False}
            return JsonResponse(payload)

class EditNameView(APIView):
    serializer_class = EditNameSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            newName = serializer.data.get("name")
            user = User.retrieveInfo(request.session["user"])
            oldName = user.name

            if (newName == oldName):
                payload = {"edit_name": False,
                           "detail": "Same name"}
                return JsonResponse(payload)
            
            user.updateName(newName)
            payload = {"edit_name": True,
                       "detail": "Edit name successful"}
            return JsonResponse(payload)


class EditEmailAddressView(APIView):
    serializer_class = EditEmailAddressSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            newEmailAddress = serializer.data.get("emailAddress")
            user = User.retrieveInfo(request.session["user"])
            oldEmailAddress = user.emailAddress

            if (newEmailAddress == oldEmailAddress):
                payload = {"edit_emailAddress": False,
                           "detail": "Same emailAddress"}
                return JsonResponse(payload)
            
            if User.emailTaken(newEmailAddress):
                payload = {"edit_emailAddress": False,
                           "detail": "New emailAddress taken"}
                return JsonResponse(payload)

            user.updateEmailAddress(newEmailAddress)
            payload = {"edit_emailAddress": True,
                       "detail": "Edit emailAddress successful"}
            return JsonResponse(payload)


class EditPasswordView(APIView):
    serializer_class = EditPasswordSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            newPassword = serializer.data.get("password")
            newPassword = make_password(newPassword)
            user = User.retrieveInfo(request.session["user"])
            oldPassword = user.password

            if (newPassword == oldPassword):
                payload = {"edit_password": False,
                           "detail": "Same password"}
                return JsonResponse(payload)
        
            user.updatePassword(newPassword)
            payload = {"edit_password": True,
                      "detail": "Edit password successful"}
            return JsonResponse(payload)

