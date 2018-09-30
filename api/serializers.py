from rest_framework.serializers import ModelSerializer
from accounts.models import User
from client.models import GarbageStatus


class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ('__all__')


class GarbageStatusSerializer(ModelSerializer):

    class Meta:
        model = GarbageStatus
        fields = '__all__'