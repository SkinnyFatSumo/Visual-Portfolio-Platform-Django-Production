# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models

from django.db import models
from django.contrib.postgres.fields import ArrayField



class Design(models.Model):

    title = models.CharField(max_length=100)
    medium = models.CharField(max_length=50)
    description = models.TextField()
    contributors = models.CharField(max_length=200, blank=True, null=True)
    uploaded = models.DateTimeField(auto_now_add=True)
    design_source = models.URLField(max_length=300)
    thumbnail_source = models.URLField(max_length=300)
    thumbnail_height = models.SmallIntegerField()
    thumbnail_width = models.SmallIntegerField()
    #### photo = models.ImageField(upload_to='photos/%Y/%m/%d/')


