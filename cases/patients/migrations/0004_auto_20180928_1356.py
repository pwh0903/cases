# Generated by Django 2.1.1 on 2018-09-28 05:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0003_auto_20180928_1346'),
    ]

    operations = [
        migrations.AlterField(
            model_name='treatment',
            name='detail',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='treatment',
            name='end_time',
            field=models.DateField(default=None),
        ),
        migrations.AlterField(
            model_name='treatment',
            name='start_time',
            field=models.DateField(default=None),
        ),
    ]
