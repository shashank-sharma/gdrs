from django.db import models
from accounts.models import User

# Create your models here.
class Driver(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    driving_licence_number = models.CharField(max_length=20)
    expiry_date = models.DateField()
    working = models.BooleanField(default=False)


class Cab(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE)
    license_plate = models.CharField(max_length=20)
    car_model_id = models.CharField(max_length=20)
    manufacturing_id = models.CharField(max_length=20)
    active = models.BooleanField(default=True)


class CarModel(models.Model):
    cab = models.ForeignKey(Cab, on_delete=models.CASCADE)
    model_name = models.CharField(max_length=80)
    model_description = models.CharField(max_length=100)


class shift(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE)
    shift_start = models.DateField()
    shift_end = models.DateField()
    login_time = models.DateField()
    logout_time = models.DateField()
