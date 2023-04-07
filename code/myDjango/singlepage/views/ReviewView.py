# UC08 - Review of Toilet

from rest_framework.views import APIView
from django.http import JsonResponse

from ..models.User import User
from ..models.Toilet import Toilet
from ..models.Review import Review
from ..serializers import AddReviewSerializer, RetrieveReviewSerializer

# get user specific reviews
class RetrieveReviewView(APIView):
    serializer_class = RetrieveReviewSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            userID = serializer.get('userID')
            toiletID = serializer.get('toiletID')

            # user does not exist
            if User.retrieveInfo(userID=userID) == False:
                payload = {"error_message": "User does not exist"}
                return JsonResponse(payload)
            
            # user have not reviewed the toilet
            if Review.retrieveByUserAndToilet(userID=userID, toiletID=toiletID) == False:
                payload = {"error_message": "User have not reviewed toilet"}
                return JsonResponse(payload)
            else:
                review = Review.retrieveByUserAndToilet(userID=userID, toiletID=toiletID)
                rating = Review.getRating()
                comment =Review.getComment()
                payload = {"rating": rating,
                           "comment": comment}
                return JsonResponse(payload)

# only one review per person on each toilet
class AddReviewView(APIView):
    serializer_class = AddReviewSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            longitude = serializer.data.get('longitude')
            latitude = serializer.data.get('latitude')
            rating = serializer.data.get('rating')
            comment = serializer.data.get('comment')

            toilet = Toilet.retrieveByLongitudeLatitude(longitude=longitude, latitude=latitude)
            if toilet == False:
                payload = {"error_message": "Toilet not found"}
                return JsonResponse(payload)
            
            toiletID = toilet.getToiletID()
            userID = request.session["user"]
            
            # user already reviewed the toilet
            if Review.retrieveByUserAndToilet(userID=userID, toiletID=toiletID) != False:
                payload = {"error_message": "User already reviewed the toilet"}
                return JsonResponse(payload)
            else:
                newReview = Review(userID=userID, toiletID=toiletID, rating=rating, comment=comment)
                newReview.addReview()
                payload = {"success_message": "Review added successfully"}
                return JsonResponse(payload)



            



