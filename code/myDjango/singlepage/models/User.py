import uuid
from django.db import models
from django.contrib.auth.hashers import check_password

class User(models.Model):
    name = models.CharField(max_length=255, null=True)
    emailAddress = models.EmailField(max_length=255, null=True)
    password = models.CharField(max_length=255, null=True)
    userID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True) # turn editable to False once out of dev
    sessionID = models.CharField(max_length=255, null=True)
    favToilets = models.ArrayField(models.CharField(max_length=255, null=True)) # favourite toilets as list of toiletIDs
 
    # this is what displays on the admin interface
    def __str__(self):
        return str(self.name)
    
    def register(self):
        self.save()
    
    def login(self, request):
        request.session.create()
        self.sessionID = request.session.session_key
        request.session['user'] = str(self.userID)
        self.save()
    
    def logout(self, request):
        self.sessionID = "NULL"
        request.session.clear()
        self.save()

    def updateName(self, newName):
        self.name = newName
        self.save()

    def updateEmailAddress(self, newEmailAddress):
        self.emailAddress = newEmailAddress
        self.save()
    
    def updatePassword(self, newPassword):
        self.password = newPassword
        self.save()
    
    def isAuthenticated(self, sessionKey):
        if self.sessionID == sessionKey:
            return True
        return False
    
    def getFavToilets(self):
        return self.favToilets
    
    def isFavourite(self, toiletID):
        if toiletID in self.favToilets:
            return True
        return False
    
    
    ######################### Helper Functions #######################################

    def retrieveInfo(id):
        try:
            return User.objects.get(userID=id)
        except:
            return False
    
    def retrieveByEmailAddress(emailAddress):
        try:
            return User.objects.get(emailAddress=emailAddress)
        except:
            return False
    
    # can split "not registered user" and "wrong password" if needed 
    def verifyCredentials(emailAddress, password):
        user = User.retrieveByEmailAddress(emailAddress)

        # check_password hashes the password first before comparing
        if not user or not check_password(password, user.password):
            return False
        return True
    
    # TODI - should i add checks for same password taken?
    def emailTaken(emailAddress):
        try:
            if User.objects.get(emailAddress=emailAddress):
                return True
        except:
            return False

