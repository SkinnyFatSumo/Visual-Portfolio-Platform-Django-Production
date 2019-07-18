# Generated by Django 2.2.3 on 2019-07-09 01:09

from django.db import migrations, models
import django_boto.s3.storage
import photos.models


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0002_auto_20190627_2030'),
    ]

    operations = [
        migrations.AddField(
            model_name='photo',
            name='photo',
            field=models.ImageField(blank=True, null=True, storage=django_boto.s3.storage.S3Storage(), upload_to=photos.models.upload_photo_to),
        ),
        migrations.AddField(
            model_name='photo',
            name='thumb',
            field=models.ImageField(blank=True, null=True, storage=django_boto.s3.storage.S3Storage(), upload_to=photos.models.upload_photo_to),
        ),
    ]