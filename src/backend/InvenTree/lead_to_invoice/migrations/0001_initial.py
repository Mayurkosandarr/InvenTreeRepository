# Generated by Django 5.1.4 on 2025-01-24 05:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Lead',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lead_number', models.CharField(blank=True, max_length=50, null=True, unique=True)),
                ('name', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=15)),
                ('address', models.TextField()),
                ('source', models.CharField(max_length=255)),
                ('status', models.CharField(choices=[('new', 'New'), ('contacted', 'Contacted'), ('qualified', 'Qualified'), ('converted', 'Converted'), ('lost', 'Lost')], default='new', max_length=50)),
                ('notes', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Lead',
                'verbose_name_plural': 'Leads',
                'ordering': ['-created_at'],
                'indexes': [models.Index(fields=['email'], name='lead_to_inv_email_0b0a4e_idx')],
                'unique_together': {('lead_number',)},
            },
        ),
        migrations.CreateModel(
            name='Invoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('invoice_number', models.CharField(blank=True, max_length=50, null=True, unique=True)),
                ('amount_due', models.DecimalField(decimal_places=2, max_digits=10)),
                ('paid_amount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('due_date', models.DateTimeField()),
                ('status', models.CharField(choices=[('unpaid', 'Unpaid'), ('paid', 'Paid'), ('partially_paid', 'Partially Paid')], max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('lead', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='lead_to_invoice.lead')),
            ],
            options={
                'verbose_name': 'Invoice',
                'verbose_name_plural': 'Invoices',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='NumberingSystemSettings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('Lead', 'Lead'), ('Quotation', 'Quotation'), ('Invoice', 'Invoice')], max_length=50, unique=True)),
                ('prefix', models.CharField(blank=True, max_length=10, null=True)),
                ('suffix', models.CharField(blank=True, max_length=10, null=True)),
                ('current_number', models.IntegerField(default=1)),
                ('increment_step', models.IntegerField(default=1)),
                ('reset_cycle', models.CharField(blank=True, choices=[('monthly', 'Monthly'), ('yearly', 'Yearly')], max_length=50, null=True)),
            ],
            options={
                'verbose_name': 'Numbering System Setting',
                'verbose_name_plural': 'Numbering System Settings',
                'indexes': [models.Index(fields=['type'], name='lead_to_inv_type_687a0b_idx')],
            },
        ),
        migrations.CreateModel(
            name='Quotation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quotation_number', models.CharField(blank=True, max_length=50, null=True, unique=True)),
                ('revision_count', models.PositiveIntegerField(default=0)),
                ('items', models.JSONField(default=list)),
                ('total_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('discount', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('tax', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('status', models.CharField(choices=[('draft', 'Draft'), ('sent', 'Sent'), ('accepted', 'Accepted'), ('rejected', 'Rejected')], max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('lead', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lead_to_invoice.lead')),
                ('original_quotation', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='revisions', to='lead_to_invoice.quotation')),
            ],
            options={
                'verbose_name': 'Quotation',
                'verbose_name_plural': 'Quotations',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('Email', 'Email'), ('SMS', 'SMS'), ('System', 'System')], max_length=50)),
                ('recipient', models.CharField(max_length=255)),
                ('message', models.TextField()),
                ('status', models.CharField(choices=[('Pending', 'Pending'), ('Sent', 'Sent'), ('Failed', 'Failed')], default='Pending', max_length=50)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('invoice', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notifications', to='lead_to_invoice.invoice')),
                ('lead', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notifications', to='lead_to_invoice.lead')),
                ('quotation', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notifications', to='lead_to_invoice.quotation')),
            ],
            options={
                'verbose_name': 'Notification',
                'verbose_name_plural': 'Notifications',
                'ordering': ['-timestamp'],
            },
        ),
        migrations.CreateModel(
            name='LeadToInvoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('created', 'Created'), ('converted', 'Converted')], default='created', max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('invoice', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='lead_to_invoice.invoice')),
                ('lead', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lead_to_invoice.lead')),
                ('quotation', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='lead_to_invoice.quotation')),
            ],
            options={
                'verbose_name': 'Lead to Invoice',
                'verbose_name_plural': 'Leads to Invoices',
                'ordering': ['-created_at'],
            },
        ),
        migrations.AddField(
            model_name='invoice',
            name='quotation',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lead_to_invoice.quotation'),
        ),
        migrations.AddIndex(
            model_name='quotation',
            index=models.Index(fields=['lead', 'status'], name='lead_to_inv_lead_id_5628e4_idx'),
        ),
        migrations.AlterUniqueTogether(
            name='quotation',
            unique_together={('quotation_number',)},
        ),
        migrations.AddIndex(
            model_name='notification',
            index=models.Index(fields=['status'], name='lead_to_inv_status_c63f3a_idx'),
        ),
        migrations.AddIndex(
            model_name='leadtoinvoice',
            index=models.Index(fields=['lead', 'status'], name='lead_to_inv_lead_id_502650_idx'),
        ),
        migrations.AddIndex(
            model_name='invoice',
            index=models.Index(fields=['lead', 'status'], name='lead_to_inv_lead_id_0f9be0_idx'),
        ),
        migrations.AlterUniqueTogether(
            name='invoice',
            unique_together={('invoice_number',)},
        ),
    ]
