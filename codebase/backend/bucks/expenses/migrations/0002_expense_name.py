# Generated by Django 5.1 on 2024-11-13 23:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expenses', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='expense',
            name='name',
            field=models.CharField(default=None, max_length=255),
            preserve_default=False,
        ),
    ]
