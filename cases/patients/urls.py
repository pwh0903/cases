from django.urls import path, include

from . import views


app_name = 'patients'
urlpatterns = [
    path('', views.index, name='index'),
    path('search/', views.SearchView.as_view(), name='search'),
    path('<int:pk>/treatment/', views.treatment, name='treatment'),
    path('<int:pk>/', views.detail, name='detail'),
]