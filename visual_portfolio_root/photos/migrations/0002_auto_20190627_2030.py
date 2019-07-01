# Generated by Django 2.2.2 on 2019-06-27 20:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('photos', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tag',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tags', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='photowithtag',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='relations', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='photowithtag',
            name='photo',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='related_photos', to='photos.Photo'),
        ),
        migrations.AddField(
            model_name='photowithtag',
            name='tag',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='related_tags', to='photos.Tag'),
        ),
        migrations.AddField(
            model_name='photo',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='photos', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterUniqueTogether(
            name='tag',
            unique_together={('owner', 'tagname')},
        ),
        migrations.AlterUniqueTogether(
            name='photo',
            unique_together={('owner', 'title')},
        ),
    ]