# Generated by Django 5.1.4 on 2025-01-24 12:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lead_to_invoice', '0003_alter_lead_lead_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lead',
            name='lead_id',
        ),
        migrations.AddField(
            model_name='invoice',
            name='total_amount',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
