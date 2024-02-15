from django.db import models


class ProjectManager(models.Model):
    name = models.CharField(unique=True, max_length=100)
    created = models.DateTimeField(auto_now_add = True)
    modified = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
# Create your models here.
class Project(models.Model):
    name = models.CharField(unique = True, max_length = 100)
    projectmanager = models.ForeignKey(ProjectManager, on_delete = models.CASCADE,blank=True, null=True)
    startDate =  models.DateField()
    endDate =  models.DateField()
    comments = models.CharField(max_length = 500, blank=True, null=True)
    status = models.CharField(max_length = 100)
    created = models.DateTimeField(auto_now_add = True)
    modified = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name