# Generated by Django 5.1 on 2024-12-02 04:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expenses', '0003_alter_expense_account'),
    ]

    operations = [
        migrations.AddField(
            model_name='expense',
            name='plaid_transaction_id',
            field=models.CharField(default=None, max_length=100),
            preserve_default=False,
        ),
    ]
