import uuid
from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.hashers import check_password

class User(models.Model):
    ''' User class for registered users of Naviloo

    Attributes
    ---
    userID      : UUID          Unique identifier for each user in database
    name        : String        Name of account
    emailAddress: Email         Email address of account
    password    : String        Password of account
    sessionID   : String        Cookie keeping track of user login 
    favToilets  : List          List of toiletIDs that user favourited
    
    Methods
    -------
    register()
        Saves the User object to the database
    getUserID()
        Returns the userID attribute of the User object
    getName()
        Returns the name attribute of the User object
    getEmailAddress()
        Returns emailAddress attribute of User object
    getPassword()
        Returns password attribute of User object
    getSessionID()
        Returns sessionID attribute of User object
    getFavToilets()
        Returns favToilets attribute of User object
    login(request)
        Creates a session and updates sessionID with new sessionID to database
    logout(request)
        Clears the session and updates sessionID with NULL to database
    isAuthenticated(sessionKey)
        Checks if session belongs to User
    isFavourite(toiletID)
        Checks if toilet is favourited by User
    updateName(newName)
        Updates name with new name
    updateEmailAddress(newEmailAddress)
        Updates email address with new email address
    updatePassword(newPassword)
        Updates password with new password
    updateFavToilets(newFavToilets)
        Updates favToilets with new favToilets
    '''
    userID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    name = models.CharField(max_length=255, null=True)
    emailAddress = models.EmailField(max_length=255, null=True)
    password = models.CharField(max_length=255, null=True)
    sessionID = models.CharField(max_length=255, null=True)
    favToilets = ArrayField(models.CharField(max_length=255, blank=True), default=list, null=True, blank=True)
 
    # this is what displays on the admin interface
    def __str__(self):
        '''Defines string representation of User in database

        Returns
        -------
        String
            Description of User record
        '''
        return str(self.name)
    
    def register(self):
        ''' Saves User record to database
        '''
        self.save()
    
    def getUserID(self):
        ''' Returns userID attribute of User object

        Returns
        -------
        String
            userID attribute of User object
        '''
        return self.userID
    
    def getName(self):
        ''' Returns name attribute of User object

        Returns
        -------
        String
            Name attribute of User object
        '''
        return self.name
    
    def getEmailAddress(self):
        ''' Returns emailAddress attribute of User object

        Returns
        -------
        String
            Email address attribute of User object
        '''
        return self.emailAddress
    
    def getPassword(self):
        ''' Returns password attribute of User object

        Returns
        -------
        String
            Password attribute of User object
        '''
        return self.password

    def getSessionID(self):
        ''' Returns sessionID attribute of User object

        Returns
        -------
        String
            SessionID attribute of User object
        '''
        return self.sessionID

    def getFavToilets(self):
        ''' Returns favToilets attribute of User object

        Returns
        -------
        List
            FavToilets attribute of User object
        '''
        return self.favToilets
    
    def login(self, request):
        ''' Creates a session and updates sessionID with new sessionID to database

        Parameters
        ----------
        request: request
            Queryset of request values
        '''
        request.session.create()
        self.sessionID = request.session.session_key
        request.session['user'] = str(self.userID)
        self.save()
    
    def logout(self, request):
        ''' Clears the session and updates sessionID with NULL to database

        Parameters
        ----------
        request: request
            Queryset of request values
        '''
        self.sessionID = "NULL"
        request.session.clear()
        self.save()
    
    def isAuthenticated(self, sessionKey):
        ''' Checks if session belongs to User

        Parameters
        ----------
        sessionKey: String
            Session key of request
        
        Returns
        -------
        True if request session is the same as sessionID of user
        False otherwise
        '''
        if self.sessionID == sessionKey:
            return True
        return False

    def isFavourite(self, toiletID):
        ''' Checks if toilet is favourited by User

        Parameters
        ----------
        toiletID: String
            ToiletID to compare

        Returns
        -------
        True if toiletID is in favToilets
        False otherwise
        '''
        if str(toiletID) in list(self.favToilets):
            return True
        return False

    def updateName(self, newName):
        ''' Updates name with new name

        Parameters
        ----------
        newName: String
            New name to update
        '''
        self.name = newName
        self.save()

    def updateEmailAddress(self, newEmailAddress):
        ''' Updates email address with new email address

        Parameters
        ----------
        newEmailAddress: String
            New email address to update
        '''
        self.emailAddress = newEmailAddress
        self.save()
    
    def updatePassword(self, newPassword):
        ''' Updates password with new password

        Parameters
        ----------
        newPassword: String
            New password to update
        '''
        self.password = newPassword
        self.save()
    
    def updateFavToilets(self, newFavToilets):
        ''' Updates favToilets with new favToilets

        Parameters
        ----------
        newFavToilets: List
            New favToilts to update
        '''
        self.favToilets = newFavToilets
        self.save()
    
    ######################### Helper Functions #######################################

    def retrieveInfo(userID):
        ''' Retrieves User record in database using userID

        Parameters
        ----------
        userID: String
            UserID of user

        Returns
        -------
        User
            Unique User object corresponding to given userID 
        '''
        try:
            return User.objects.get(userID=userID)
        except:
            return False
    
    def retrieveByEmailAddress(emailAddress):
        ''' Retrieves User record in database using emailAddress

        Parameters
        ----------
        emailAddress: String
            Email address of user

        Returns
        -------
        User
            Unique User object corresponding to given userID 
        '''
        try:
            return User.objects.get(emailAddress=emailAddress)
        except:
            return False
    
    def verifyCredentials(emailAddress, password):
        ''' Checks if email address and password belongs to a user

        Parameters
        ----------
        emailAddress: String
            Email address of user 
        password: String
            Password of user
        
        Returns
        -------
        True if email address and password belong to a user
        False otherwise
        '''
        user = User.retrieveByEmailAddress(emailAddress)

        # check_password hashes the password first before comparing
        if not user or not check_password(password, user.password):
            return False
        return True
    
    def emailTaken(emailAddress):
        ''' Checks if email is already taken by a User record in database

        Parameters
        ----------
        emailAddress: String
            Email address of user
        
        Returns
        -------
        True if email is already taken by a User record in database
        False otherwise
        '''
        try:
            if User.objects.get(emailAddress=emailAddress):
                return True
        except:
            return False

