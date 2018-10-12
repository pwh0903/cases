from django.db import models
# from django.contrib.auth.models import AbstractUser


class Hospital(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200, blank=True, null=True)
    detail = models.TextField(null=True, blank=True)
    # 1: normal, 0: delete
    status = models.IntegerField(null=True, default=1)

    def __str__(self):
        return self.name


class Department(models.Model):
    name = models.CharField(max_length=100)
    detail = models.TextField(null=True, blank=True)
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='department')
    # 1: normal, 0: delete
    status = models.IntegerField(null=True, default=1)

    def __str__(self):
        return self.name


class Doctor(models.Model):
    name = models.CharField(max_length=50)
    password = models.CharField(max_length=50, default='1234abcd')
    detail = models.TextField(null=True, blank=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='doctor')
    # 1: normal, 0: delete
    status = models.IntegerField(null=True, default=1)

    def __str__(self):
        return self.name


class Patient(models.Model):
    name = models.CharField(max_length=50)
    age = models.IntegerField(null=True)
    gender = models.CharField(max_length=10, null=True, blank=True)
    phone = models.CharField(max_length=50, null=True, blank=True)
    start_date = models.DateTimeField(auto_now_add=True)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='patient', blank=True, null=True)
    # 1: normal, 0: delete
    status = models.IntegerField(null=True, default=1)

    def __str__(self):
        return self.name


class Treatment(models.Model):
    name = models.CharField(max_length=100)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)
    detail = models.TextField(null=True, blank=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='treatment')
    # 1: normal, 0: delete
    status = models.IntegerField(null=True, default=1)

    def __str__(self):
        return self.name


class Picture(models.Model):
    name = models.CharField(max_length=50)
    upload_date = models.DateTimeField(auto_now_add=True)
    path = models.CharField(max_length=50, null=True, blank=True)
    treatment = models.ForeignKey(Treatment, on_delete=models.CASCADE, related_name='picture')
    data = models.TextField(null=True, blank=True)

    # 1: normal, 0: delete
    status = models.IntegerField(null=True, default=1)

    def __str__(self):
        return self.name

        