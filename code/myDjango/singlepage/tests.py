from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.hashers import check_password

from .models.User import User
from .models.Toilet import Toilet
from .models.Review import Review

from .utils import checkEmailFormat, checkPasswordComplexity

class AccountCreationTest(TestCase):
    def test_Registration(self):
        name = "test"
        self.assertIsNotNone(name)

        emailAddress = "test@naviloo.com"
        self.assertIsNotNone(emailAddress)
        self.assertTrue(checkEmailFormat(emailAddress))

        password = "test1234"
        self.assertIsNotNone(password)
        self.assertTrue(checkPasswordComplexity(password))

        response = self.client.post(reverse("register"),
                                    {'name': name, 'emailAddress': emailAddress, 'password': password})
        self.assertEqual(response.status_code, 200)
        user = User.objects.get(emailAddress="test@naviloo.com")

# Testing does not support middleware. Session and authentication attributes must be supplied by the test itself
class LoginTest(TestCase):
    def setUp(self):
        name = "test"
        emailAddress = "test@naviloo.com"
        password = "test1234"
        self.client.post(reverse("register"),
                        {'name': name, 'emailAddress': emailAddress, 'password': password})
        
    def test_Login(self):
        user = User.objects.get(emailAddress="test@naviloo.com")
        pre = user.sessionID

        response = self.client.post(reverse("login"),
                                    {'emailAddress': "test@naviloo.com", "password": "test1234"})
        self.assertEqual(response.status_code, 200)

        user = User.objects.get(emailAddress="test@naviloo.com")
        post = user.sessionID

        self.assertNotEqual(pre, post)

class AccountCredentialUpdateTest(TestCase):
    def setUp(self):
        name = "test"
        emailAddress = "test@naviloo.com"
        password = "test1234"
        self.client.post(reverse("register"),
                        {'name': name, 'emailAddress': emailAddress, 'password': password})
        self.client.post(reverse("login"),
                        {'emailAddress': "test@naviloo.com", "password": "test1234"})

    def test_EditName(self):
        newName = "newtest"
        self.assertIsNotNone(newName)

        response = self.client.post(reverse("editName"),
                                    {"name": newName})
        self.assertEqual(response.status_code, 200)

        user = User.objects.get(emailAddress="test@naviloo.com")
        self.assertEqual(user.getName(), newName)


    def test_EditEmail(self):
        newEmail = "newtest@naviloo.com"
        self.assertIsNotNone(newEmail)
        self.assertTrue(checkEmailFormat(newEmail))

        response = self.client.post(reverse("editEmailAddress"),
                                    {"emailAddress": newEmail})
        self.assertEqual(response.status_code, 200)

        user = User.objects.get(name="test")
        self.assertEqual(user.getEmailAddress(), newEmail)

    def test_EditPassword(self):
        newPassword = "test12345"
        self.assertIsNotNone(newPassword)
        self.assertTrue(checkPasswordComplexity(newPassword))

        response = self.client.post(reverse("editPassword"),
                                    {"password": newPassword})
        self.assertEqual(response.status_code, 200)

        user = User.objects.get(emailAddress="test@naviloo.com")
        self.assertFalse(check_password(user.getPassword(), newPassword))

class AddToiletTest(TestCase):
    def setUp(self):
        pass

    def test_AddToilet(self):
        name = "Test"
        self.assertIsNotNone(name)

        address = "ABC Boulevard 61th Street 5 S(612345)"
        self.assertIsNotNone(address)

        postalCode = "612345"
        self.assertIsNotNone(postalCode)

        locationType = "Bus Interchange"
        self.assertIsNotNone(locationType)

        longitude = 123.123456
        self.assertIsNotNone(longitude)

        latitude = 12.123456
        self.assertIsNotNone(latitude)

        response = self.client.post(reverse("addToilet"),
                                    {"name": name, 
                                     "address": address, 
                                     "postalCode": postalCode, 
                                     "locationType": locationType,
                                     "longitude": longitude,
                                     "latitude": latitude})
        self.assertEqual(response.status_code, 200)

        toilet = Toilet.objects.get(name="Test Toilet")
        self.assertIsNotNone(toilet.getToiletID())

class ReviewTest(TestCase):
    def setUp(self):
        name = "test"
        emailAddress = "test@naviloo.com"
        password = "test1234"
        self.client.post(reverse("register"),
                        {'name': name, 'emailAddress': emailAddress, 'password': password})
        self.client.post(reverse("login"),
                        {'emailAddress': "test@naviloo.com", "password": "test1234"})
        
        name = "Test"
        address = "ABC Boulevard 61th Street 5 S(612345)"
        postalCode = "612345"
        locationType = "Bus Interchange"
        longitude = 123.123456
        latitude = 12.123456
        self.client.post(reverse("addToilet"),
                        {"name": name, 
                        "address": address, 
                        "postalCode": postalCode, 
                        "locationType": locationType,
                        "longitude": longitude,
                        "latitude": latitude})

    def test_AddReview(self):
        rating = 5
        self.assertIsNotNone(rating)

        response = self.client.post(reverse("addReview"),
                                    {"rating": rating,
                                     "longitude": 123.123456,
                                     "latitude": 12.123456})
        self.assertEqual(response.status_code, 200)

        user = User.objects.get(emailAddress="test@naviloo.com")
        userID = user.getUserID()

        toilet = Toilet.objects.get(longitude=123.123456, latitude=12.123456)
        toiletID = toilet.getToiletID()

        review = Review.objects.get(userID=userID, toiletID=toiletID)
        self.assertIsNotNone(review.getReviewID())
