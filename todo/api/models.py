from django.db import models

# Create your models here.


class todoModel(models.Model):
    task = models.CharField(max_length=50)
    def __str__(self):
        return f'{self.task}'
