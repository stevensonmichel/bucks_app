# Generated by Django 5.1 on 2024-12-09 02:47

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
        ('expenses', '0005_alter_expense_bucket'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expense',
            name='account',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='accounts.account'),
        ),
    ]
