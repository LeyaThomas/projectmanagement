# views.py
from rest_framework import generics
from rest_framework.generics import RetrieveAPIView
from .models import Project, ProjectEmployee
from .serializers import ProjectEmployeeSerializer, ProjectSerializer, ProjectEmployeeSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes

@permission_classes([AllowAny])
class ProjectListCreateView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def perform_create(self, serializer):
        project = serializer.save()
        employee_id = self.request.data.get('employeeId')
        ProjectEmployee.objects.create(project=project, employee_id=employee_id)

@permission_classes([AllowAny])
class ProjectRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

@permission_classes([AllowAny])
class ProjectEmployeeListCreateView(generics.ListCreateAPIView):
    queryset = ProjectEmployee.objects.all()
    serializer_class = ProjectEmployeeSerializer

@permission_classes([AllowAny])
class EmployeeProjectsView(RetrieveAPIView):
    queryset = ProjectEmployee.objects.all()
    serializer_class = ProjectEmployeeSerializer
    lookup_field = 'pk'
