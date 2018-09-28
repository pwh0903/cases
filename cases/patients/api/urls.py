from django.urls import path
from rest_framework.routers import DefaultRouter 
from .views import PatientViewSet, PictureViewSet, TreatmentViewSet


router = DefaultRouter()
router.register(r'patients', PatientViewSet, base_name='patient')
router.register(r'pictures', PictureViewSet, base_name='picture')
router.register(r'treatments', TreatmentViewSet, base_name='treatment')

urlpatterns = router.urls