from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED
from rest_framework.authtoken.models import Token
from .models import User


# Create your views here.
@api_view(["POST"])
def login(request):
    phone_number = request.data.get("phone_number")
    password = request.data.get("password")

    try:
        user = User.objects.get(phone_number=phone_number, password=password)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, 'id': token.user_id})
    except:
        return Response({"error": "Login failed"}, status=HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def driver_login(request):
    phone_number = request.data.get('phone_number')
    password = request.data.get('password')

    try:
        user = User.objects.get(phone_number=phone_number, password=password, is_worker=True)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, 'id': token.user_id})
    except:
        return Response({"error": "Login failed"}, status=HTTP_401_UNAUTHORIZED)



@api_view(['POST'])
def client_login_check(request):
    phone_number = request.data.get('phone_number')
    try:
        user = User.objects.get(phone_number=phone_number)
        if user:
            return Response({'status': 'true'})
    except:
        return Response({'status': 'false'})
