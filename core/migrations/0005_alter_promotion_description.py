# Generated by Django 3.2.9 on 2021-11-19 02:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_auto_20211109_1647'),
    ]

    operations = [
        migrations.AlterField(
            model_name='promotion',
            name='description',
            field=models.TextField(blank=True, max_length=400, null=True),
        ),
    ]
