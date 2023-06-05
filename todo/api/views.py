from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view 
from .models import todoModel
from .serielizers import todoSerielizer
@api_view(['POST'])
def createTask(request):
    s=todoSerielizer(data=request.data, many=False)
    try:
        s.is_valid()
        s.save()
        print("Yes")
        return Response(s.data) 
    except Exception as e:
        print("No,e ",e)
        return Response({
            "resp":"Bad"
        }) 
@api_view(['GET'])
def getTasks(request):
    tasks=todoModel.objects.all()
    s=todoSerielizer(tasks,many=True)
    return Response(s.data)
@api_view(['DELETE'])
def deteleTask(request,id):
    task=todoModel.objects.get(id=id)
    task.delete()
    s=todoSerielizer(task)
    return Response(s.data)
@api_view(['DELETE'])
def clearTasks(request):
    task=todoModel.objects.all()
    task.delete()
    s=todoSerielizer(task,many=True)
    return Response(s.data)