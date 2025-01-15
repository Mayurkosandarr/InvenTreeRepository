# Generated by Django 3.2.4 on 2021-07-01 05:09

import InvenTree.fields
from django.db import migrations
import djmoney.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0004_inventreesetting'),
        ('company', '0038_manufacturerpartparameter'),
    ]

    operations = [
        migrations.AlterField(
            model_name='supplierpricebreak',
            name='price',
            field=InvenTree.fields.InvenTreeModelMoneyField(currency_choices=[], decimal_places=4, default_currency='', help_text='Unit price at specified quantity', max_digits=19, null=True, verbose_name='Price'),
        ),
        migrations.AlterField(
            model_name='supplierpricebreak',
            name='price_currency',
            field=djmoney.models.fields.CurrencyField(choices=[], default='', editable=False, max_length=3),
        ),
    ]
