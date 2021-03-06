from django.contrib import admin
from django.conf.urls import url
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token




urlpatterns = [
    path('patients/', include('patients.urls')),
    path('patients/api/', include('patients.api.urls'), name='api'),
    path('admin/', admin.site.urls),
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^api-token-refresh/', refresh_jwt_token),
    url(r'^api-token-verify/', verify_jwt_token),
]