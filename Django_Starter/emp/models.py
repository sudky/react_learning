from django.db import models

# Create your models here.
class Employee(models.Model):
    name = models.CharField(max_length=50)
    dept = models.CharField(max_length=50)
    city = models.CharField(max_length=50)