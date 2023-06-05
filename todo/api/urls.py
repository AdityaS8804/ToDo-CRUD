from django.urls import path
from . import views
urlpatterns = [
path('create/',views.createTask,name="CreateTask"),
path("tasks/",views.getTasks,name="AllTasks"),
path("taskDelete/<int:id>/",views.deteleTask,name="DeleteTask"),
path("tasksClear/",views.clearTasks,name="ClearTasks")
]
