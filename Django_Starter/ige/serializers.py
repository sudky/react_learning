from rest_framework import serializers
from .models import IGEDataModel


class IGEDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = IGEDataModel
        fields = '__all__'
