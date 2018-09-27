from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404

from .models import Patient


def index(request):
    patients_list = Patient.objects.all()
    context = {
        'patients_list': patients_list,
    }
    return HttpResponse(render(request, 'patients/index.html', context))


def detail(request, patient_id):
    patient = get_object_or_404(Patient, pk=patient_id)
    return render(request, 'patients/detail.html', {'patient': patient})