# UC01 - Account Creation
# UC02 - Login
# UC03 - Logout
# UC04 - Change Password
# UC05 - Reset Password via Email

from rest_framework.views import APIView
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password

from ..models.User import User
from ..serializers import RegisterSerializer, EditNameSerializer, EditEmailAddressSerializer, EditPasswordSerializer, UserSerializer, ResetPasswordEmailSerializer
from ..utils import checkEmailFormat

''' Registers an account for MoP
checks for password and confirm password needs to be done at front end since it is not passed to backend
emailAddress must be unique
sessionID created and saved once account is registered and redirected to login
password is hashed before storing into database
Args:

Returns:

'''
class RegisterView(APIView):
    serializer_class = RegisterSerializer

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
            payload = { "userEmail": emailAddress,
                        "userName": name,
                        "userID": user.userID,
                        "sessionID": user.sessionID }

            return JsonResponse(payload)

class LoginView(APIView):
    serializer_class = UserSerializer
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

            payload = { "userEmail": emailAddress,
                        "userName": user.name,
                        "userID": user.userID,
                        "sessionID": user.sessionID }
            return JsonResponse(payload)
        
class LogoutView(APIView):
    def get(self, request, *args, **kwargs):
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
            for key, value in request.session.items():
                print('{} => {}'.format(key, value))
            user = User.retrieveInfo(request.session["user"])

            if user == False:
                payload = {"error_message": "User not found"}
                return JsonResponse(payload)
                
            oldName = user.getName()

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
            oldEmailAddress = user.getEmailAddress()

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
            oldPassword = user.getPassword()

            if (newPassword == oldPassword):
                payload = {"edit_password": False,
                           "detail": "Same password"}
                return JsonResponse(payload)
        
            user.updatePassword(newPassword)
            payload = {"edit_password": True,
                      "detail": "Edit password successful"}
            return JsonResponse(payload)

class ResetPasswordThroughEmailView(APIView):
    serializer_class = ResetPasswordEmailSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            emailAddress = serializer.data.get("emailAddress")
            newPassword = serializer.data.get("password")
            user = User.retrieveByEmailAddress(emailAddress)

            # User not registered
            if user == False:
                payload = {"error_message": "Email address not registered"}
                return JsonResponse(payload)
            
            # Same password
            oldPassword = user.getPassword()
            if (newPassword == oldPassword):
                payload = {"error_message": "Same password"}
                return JsonResponse(payload)
            
            user.updatePassword(newPassword)
            payload = {"edit_password": True,
                      "detail": "Edit password successful"}
            return JsonResponse(payload)
                
