from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import routers, serializers, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED
from rest_framework.views import APIView
from django.core import serializers as django_serializers
from accounts.models import User
from api.serializers import UserSerializer, GarbageStatusSerializer
from client.models import GarbageStatus
import math
import json


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
    worker_lat = float(request.data['lat'])
    worker_lon = float(request.data['lon'])
    all_status = GarbageStatus.objects.filter(status='In-Progress')
    lowest = 10000
    lowest_data = None
    for status in all_status:
        temp_distance = distance_between_two(float(status.lat), float(status.long), worker_lat, worker_lon)
        if temp_distance < lowest:
            lowest = temp_distance
            lowest_data = status

    if lowest_data:
        data = django_serializers.serialize("json", [lowest_data, ])
        return HttpResponse(data)
    else:
        return Response({"status": "Not found"})



@api_view(['POST'])
def nearest_request_group(request):
    worker_lat = float(request.data['lat'])
    worker_lon = float(request.data['lon'])
    all_status = GarbageStatus.objects.filter(status='In-Progress')
    json_data = {}
    for status in all_status:
        temp_distance = distance_between_two(float(status.lat), float(status.long), worker_lat, worker_lon)
        json_data[temp_distance] = status

    final_data = []
    count = 1

    keylist = json_data.keys()
    keylist.sort()
    for key in keylist:
        final_data.push(json_data[key])

    if final_data:
        data = django_serializers.serialize("json", final_data[1:10])
        return HttpResponse(data)
    else:
        return Response({"status": "Not found"})



# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer



class GarbageStatusViewSet(viewsets.ModelViewSet):
    queryset = GarbageStatus.objects.all()
    serializer_class = GarbageStatusSerializer


class GarbageStatusUpdate(APIView):

    def post(self, request):
        id = request.data.get('id', None)
        print(id)
        if not id:
            # perform creation
            serializer = GarbageStatusSerializer(data=request.data)
        else:
            # perform updation
            product_discount_controll = GarbageStatus.objects.get(id=int(id))
            print(product_discount_controll)
            serializer = GarbageStatusSerializer(product_discount_controll, data=request.data)

        if (serializer.is_valid()):
            serializer.save()
            return Response(True)
        else:
            return Response(serializer.errors)
