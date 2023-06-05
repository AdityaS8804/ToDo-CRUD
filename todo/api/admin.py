from django.contrib import admin
from .models import todoModel
# Register your models here.
class todoAdmin(admin.ModelAdmin):
    pass
admin.site.register(todoModel,todoAdmin)