# Generated by Django 2.1.1 on 2018-09-28 05:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0002_auto_20180928_0847'),
    ]

    operations = [
        migrations.CreateModel(
            name='Treatment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('start_time', models.DateField()),
                ('end_time', models.DateField()),
                ('detail', models.TextField()),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='treatment', to='patients.Patient')),
            ],
        ),
        migrations.AlterField(
            model_name='picture',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='picture', to='patients.Treatment'),
        ),
    ]
