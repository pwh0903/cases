# Generated by Django 2.1.2 on 2018-10-11 06:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0008_auto_20181011_1308'),
    ]

    operations = [
        migrations.AddField(
            model_name='doctor',
            name='password',
            field=models.CharField(default='1234abcd', max_length=50),
        ),
    ]