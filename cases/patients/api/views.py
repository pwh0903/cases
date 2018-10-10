import json

from rest_framework import viewsets
from django.http.response import HttpResponse, JsonResponse

from patients.models import Patient, Picture, Treatment
from .serializers import PatientSerializer, PictureSerializer, TreatmentSerializer


class PatientViewSet(viewsets.ModelViewSet):
    serializer_class = PatientSerializer

    def get_queryset(self):
        queryset = Patient.objects.all()
        name = self.request.query_params.get('name')
        if name is not None and name.strip() != '':
            queryset = queryset.filter(name__contains=name)
        phone = self.request.query_params.get('phone')
        if phone is not None and phone.strip() != '':
            queryset = queryset.filter(phone__contains=phone)
        return queryset

    def create(self, request):
        try:
            result = ''
            data = request.POST.dict().get('data')
            try:
                data = json.loads(data)
            except Exception as e:
                pass
            patient = data.get('patient')
            patient_name = patient.get('name').strip()
            patients = Patient.objects.filter(name=patient_name)
            if len(patients) > 0:
                return HttpResponse(status=400)
            p = Patient()
            p.name = patient_name
            p.age = patient.get('age').strip()
            p.phone = patient.get('phone').strip()
            p.gender = patient.get('gender').strip()
            p.save()

            treatments = data.get('treatments')
            for treatment in treatments:
                pictures = treatment.get('pictures')
                t = Treatment()
                t.name = treatment.get('name').strip()
                t.detail = treatment.get('detail')
                t.owner = p
                t.save()
                for picture in pictures:
                    p = Picture()
                    p.owner = t
                    p.name = picture.get('name').strip()
                    p.data = picture.get('data')
                    p.save()
            return HttpResponse(status=201)
        except Exception as e:
            return HttpResponse(status=500)

    def retrieve(self, request, pk):
        try:
            result_data = dict()
            patient = Patient.objects.get(pk=pk)
            if not patient:
                return JsonResponse(status=404)
            result_data['patient'] = {
                'id': patient.id,
                'name': patient.name,
                'age': patient.age,
                'gender': patient.gender,
                'phone': patient.phone
            }
            result_data['treatments'] = list()
            treatments = patient.treatment.all()
            for treatment in treatments:
                t = {
                    'id': treatment.id,
                    'name': treatment.name,
                    'detail': treatment.detail,
                    'start_time': treatment.start_time,
                    'end_time': treatment.end_time,
                    'pictures': list()
                }
                pics = treatment.picture.all()
                for pic in pics:
                    p = {
                        'id': pic.id,
                        'name': pic.name,
                        'data': pic.data
                    }
                    t['pictures'].append(p)
                result_data['treatments'].append(t)
            return JsonResponse(result_data)
        except Exception as e:
            return HttpResponse(status=500)

    def update(self, request, pk):
        try:
            update_data = json.loads(request.body)
            patient_data = update_data.get('patient')
            treatments = update_data.get('treatments')
            p = Patient.objects.get(pk=patient_data.get('id'))
            if not p:
                return HttpResponse(status=404)
            # update patient basic info
            p.name = patient_data.get('name')
            p.age = patient_data.get('age')
            p.gender = patient_data.get('gender')
            p.phone = patient_data.get('phone')
            p.save()

            # update treatment info
            for treatment in treatments:
                pictures = treatment.get('pictures')
                try:
                    t = Treatment.objects.get(pk=treatment.get('id'))
                    t.name = treatment.get('name').strip()
                    t.detail = treatment.get('detail')
                    t.save()
                    # delete all old pics
                    [i.delete() for i in t.picture.all()]
                except Exception as e:
                    t = Treatment()
                    t.name = treatment.get('name').strip()
                    t.detail = treatment.get('detail')
                    t.owner = p
                    t.save()
                # create new pics
                for picture in pictures:
                    pic = Picture()
                    pic.owner = t
                    pic.name = picture.get('name').strip()
                    pic.data = picture.get('data')
                    pic.save()
            return HttpResponse(status=201)
        except Exception as e:
            return HttpResponse(status=500)


class PictureViewSet(viewsets.ModelViewSet):
    queryset = Picture.objects.all()
    serializer_class = PictureSerializer


class TreatmentViewSet(viewsets.ModelViewSet):
    queryset = Treatment.objects.all()
    serializer_class = TreatmentSerializer