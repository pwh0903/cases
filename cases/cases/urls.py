from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('patients/', include('patients.urls')),
    path('admin/', admin.site.urls),
]
