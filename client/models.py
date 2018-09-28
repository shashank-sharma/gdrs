from django.db import models
from accounts.models import User
from worker.models import Driver


# Create your models here.
class GarbageStatus(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    long = models.DecimalField(max_digits=15, decimal_places=8)
    lat = models.DecimalField(max_digits=15, decimal_places=8)
    waste_type = models.CharField(max_length=60)
    quantity = models.CharField(max_length=6)
    status = models.CharField(max_length=20)  # In-Progress, Accepted, Completed, Canceled
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
