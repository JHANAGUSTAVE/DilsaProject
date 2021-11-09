# Generated by Django 3.2.9 on 2021-11-09 19:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField(max_length=400)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='products/photos/')),
                ('position', models.IntegerField(default=-1)),
            ],
            options={
                'db_table': 'products',
            },
        ),
        migrations.CreateModel(
            name='Promotion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField(max_length=400)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='promotions/photos/')),
                ('position', models.IntegerField(default=-1)),
            ],
            options={
                'db_table': 'promotions',
            },
        ),
    ]
