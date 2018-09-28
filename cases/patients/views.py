import os
import datetime

from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from django.views import generic
from django.db.models import Q
from django.conf import settings

from .models import Patient, Picture, Treatment


# class IndexView(generic.ListView):
#     template_name = 'patients/index.html'
#     context_object_name = 'patients_list'

#     def get_queryset(self):
#         return Patient.objects.all()


class SearchView(generic.ListView):
    template_name = 'patients/index.html'
    context_object_name = 'patients_list'

    def get_queryset(self):
        search_value = self.request.GET.get('search_value')
        if search_value.strip() != '':
            result = Patient.objects.filter(Q(name=search_value)|Q(phone=search_value))
        else:
            result = Patient.objects.all()
        return result


# class DetailView(generic.DetailView):
#     model = Patient
#     template_name = 'patients/detail.html'


def index(request):
    _method = request.POST.get('_method')
    if _method == 'create':
        return render(request, 'patients/patient_create.html')
    if _method == 'submit':
        patient = Patient()
        patient.name = request.POST.get('name')
        patient.age = request.POST.get('age')
        patient.phone = request.POST.get('phone')
        patient.gender = request.POST.get('gender')
        patient.save()
    patients = Patient.objects.all()
    context = {'patients_list': patients}
    return render(request, 'patients/index.html', context)


def treatment(request, pk):
    print(request.build_absolute_uri())
    return render(request, 'patients/treatment_detail.html')


def detail(request, pk):
    base_dir = settings.BASE_DIR
    detail_static_path = os.path.join(base_dir, settings.STATIC_URL.strip('/').strip('\\'), str(pk))
    try:
        patient = Patient.objects.get(pk=pk)
        if not os.path.isdir(detail_static_path):
            os.mkdir(detail_static_path)
    except Patient.DoesNotExist:
        raise Http404("没有这个病人")
    
    if request.method == 'POST':
        _method = request.POST.get('_method')
        if _method == 'update':
            return render(request, 'patients/detail_edit.html', {'patient': patient})
        elif _method == 'submit':
            pictures = request.FILES.getlist('pictures')
            if len(pictures) > 0:
                for picture in pictures:
                    try:
                        picture_name = picture.name
                        pics = Picture.objects.filter(name=picture_name)
                        if len(pics) > 0:
                            continue
                        pic = Picture()
                        pic.name = picture_name
                        pic.path = os.path.join(settings.STATIC_URL, str(pk), pic.name)
                        pic.owner = patient.treatment.all()[0]
                        dest = open(os.path.join(detail_static_path, picture_name), 'wb')
                        for chunk in picture.chunks():
                            dest.write(chunk)
                        dest.close()
                        pic.save()
                    except Exception as e:
                        print('failed to save picture, error: {}'.format(e))

            patient.name = request.POST.get('name')
            patient.age = request.POST.get('age')
            patient.phone = request.POST.get('phone')
            patient.gender = request.POST.get('gender')
            patient.save()
            return render(request, 'patients/detail.html', {'patient': patient})
        
    
    return render(request, 'patients/detail.html', {'patient': patient})
