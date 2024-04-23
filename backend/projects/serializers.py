# serializers.py
from rest_framework import serializers
from .models import Project, ProjectEmployee

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'objective', 'status', 'deadline']

class ProjectEmployeeSerializer(serializers.ModelSerializer):
    project = ProjectSerializer()
    class Meta:
        model = ProjectEmployee
        fields = ['project', 'employee']