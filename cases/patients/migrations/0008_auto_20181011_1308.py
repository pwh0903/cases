# Generated by Django 2.1.2 on 2018-10-11 05:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0007_auto_20181008_1033'),
    ]

    operations = [
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('detail', models.TextField(blank=True, null=True)),
                ('status', models.IntegerField(default=1, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('detail', models.TextField(blank=True, null=True)),
                ('status', models.IntegerField(default=1, null=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='doctor', to='patients.Department')),
            ],
        ),
        migrations.CreateModel(
            name='Hospital',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('address', models.CharField(blank=True, max_length=200, null=True)),
                ('detail', models.TextField(blank=True, null=True)),
                ('status', models.IntegerField(default=1, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='patient',
            name='status',
            field=models.IntegerField(default=1, null=True),
        ),
        migrations.AddField(
            model_name='picture',
            name='status',
            field=models.IntegerField(default=1, null=True),
        ),
        migrations.AddField(
            model_name='treatment',
            name='status',
            field=models.IntegerField(default=1, null=True),
        ),
        migrations.AddField(
            model_name='department',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='department', to='patients.Hospital'),
        ),
        migrations.AddField(
            model_name='patient',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='patient', to='patients.Doctor'),
        ),
    ]
