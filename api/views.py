from django.shortcuts import render
from rest_framework import routers, serializers, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED
from accounts.models import User
from api.serializers import UserSerializer, GarbageStatusSerializer
from client.models import GarbaseStatus
import math


def dtwor(deg):
    return deg * (math.pi / 180)


def distance_between_two(lat1, lon1, lat2, lon2):
    r = 6371
    dlat = dtwor(lat2 - lat1)
    dlon = dtwor(lon2 - lon1)
    hav = math.sin(dlat / 2) * math.sin(dlat / 2) + math.cos(dtwor(lat1)) * math.cos(dtwor(lat2)) * math.sin(
        dlon / 2) * math.sin(dlon / 2)

    c = 2 * math.atan2(math.sqrt(hav), math.sqrt(1 - hav))
    d = r * c
    return d


@api_view(['POST'])
def nearest_request(request):
    worker_lat = request.data['lat']
    worker_lan = request.data['lan']
    all_status = GarbaseStatus.objects.all(status='In-Progress')
    lowest = 10000
    lowest_data = None
    for status in all_status:
        temp_distance = distance_between_two(status.lat, status.lon, worker_lat, worker_lan)
        if temp_distance < lowest:
            lowest = temp_distance
            lowest_data = status

    if lowest_data:
        return serializers.serialize('json', lowest_data)
    else:
        return Response({"status": "Not found"})



# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GarbageStatusViewSet(viewsets.ModelViewSet):
    queryset = GarbaseStatus.objects.all()
    serializer_class = GarbageStatusSerializer
