from rest_framework import viewsets
from .models import IGEDataModel
from .serializers import IGEDataSerializer

# Create your views here.
class IGEViewSet(viewsets.ModelViewSet):
    queryset = IGEDataModel.objects.all()
    serializer_class = IGEDataSerializer
