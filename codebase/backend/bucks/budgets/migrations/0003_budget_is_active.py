# Generated by Django 5.1 on 2024-12-04 03:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('budgets', '0002_budget_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='budget',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
