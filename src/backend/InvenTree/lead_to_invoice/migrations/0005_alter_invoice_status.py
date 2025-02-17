# Generated by Django 5.1.4 on 2025-02-17 05:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lead_to_invoice', '0004_remove_lead_notes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoice',
            name='status',
            field=models.CharField(choices=[('unpaid', 'Unpaid'), ('paid', 'Paid'), ('partially_paid', 'Partially Paid')], default='unpaid', max_length=50),
        ),
    ]
