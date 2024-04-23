#projects.urls.py
from django.urls import path
from .views import ProjectListCreateView, ProjectRetrieveUpdateDestroyView ,ProjectEmployeeListCreateView, EmployeeProjectsView
 


urlpatterns = [
    path('create/', ProjectListCreateView.as_view(), name='project-create'),
    path('view/<int:pk>/', ProjectRetrieveUpdateDestroyView.as_view(), name='project-detail'),
    path('projectemployee/', ProjectEmployeeListCreateView.as_view()),
    path('employee/<int:pk>/', EmployeeProjectsView.as_view()),
]
    