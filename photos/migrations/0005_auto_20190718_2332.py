# Generated by Django 2.2.3 on 2019-07-18 23:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0004_auto_20190718_2330'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photo',
            name='thumbnail_height',
            field=models.SmallIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='photo',
            name='thumbnail_width',
            field=models.SmallIntegerField(blank=True, null=True),
        ),
    ]