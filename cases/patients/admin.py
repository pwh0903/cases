from django.contrib import admin
from .models import Patient, Picture, Doctor

admin.site.register(Patient)
admin.site.register(Picture)
admin.site.register(Doctor)
