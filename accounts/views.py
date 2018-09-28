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
    print(phone_number, password)

    try:
        user = User.objects.get(phone_number=phone_number, password=password)
        print(user)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key})
    except:
        return Response({"error": "Login failed"}, status=HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def driver_login(request):
    phone_number = request.data.get('phone_number')
    password = request.data.get('password')

    try:
        user = User.objects.get(phone_number=phone_number, passowrd=password, is_worker=True)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key})
    except:
        return Response({"error": "Login failed"}, status=HTTP_401_UNAUTHORIZED)

