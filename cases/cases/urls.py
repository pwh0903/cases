from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('patients/', include('patients.urls')),
    path('patients/api/', include('patients.api.urls'), name='api'),
    path('admin/', admin.site.urls),
]
