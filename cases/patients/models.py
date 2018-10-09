from django.db import models


class Patient(models.Model):
    name = models.CharField(max_length=50)
    age = models.IntegerField(null=True)
    gender = models.CharField(max_length=10, null=True, blank=True)
    phone = models.CharField(max_length=50, null=True, blank=True)
    start_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Treatment(models.Model):
    name = models.CharField(max_length=100)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)
    detail = models.TextField(null=True, blank=True)
    owner = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='treatment')

    def __str__(self):
        return self.name


class Picture(models.Model):
    name = models.CharField(max_length=50)
    upload_date = models.DateTimeField(auto_now_add=True)
    path = models.CharField(max_length=50, null=True, blank=True)
    owner = models.ForeignKey(Treatment, on_delete=models.CASCADE, related_name='picture')
    data = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name