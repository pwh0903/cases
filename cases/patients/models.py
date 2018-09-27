from django.db import models


class Patient(models.Model):
    name = models.CharField(max_length=50)
    age = models.IntegerField(default=0)
    gender = models.CharField(max_length=10)
    phone = models.CharField(max_length=50)
    start_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name


class Picture(models.Model):
    name = models.CharField(max_length=50)
    upload_date = models.DateField(auto_now_add=True)
    path = models.CharField(max_length=50)
    owner = models.ForeignKey(Patient, on_delete=models.CASCADE)

    def __str(self):
        return self.name