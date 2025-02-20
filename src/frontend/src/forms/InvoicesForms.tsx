
import { t } from '@lingui/macro';
import { useMemo } from 'react';
import type { ApiFormFieldSet } from '../components/forms/ApiForm';

export function useInvoiceFields(): ApiFormFieldSet {
  return useMemo<ApiFormFieldSet>(
    () => ({
      invoice_number: {
        type: 'string',
        label: t`Invoice Number`,
        required: true
      },
     
      date_issued: {
        type: 'date',
        label: t`Date Issued`,
        required: true
      },
      due_date: {
        type: 'date',
        label: t`Due Date`,
        required: true
      },
      total_amount: {
        type: 'number',
        label: t`Total Amount`,
        required: true
      },
      status: {
        type: 'select',
        label: t`Status`,
        choices: [
          { value: 'draft', label: t`Draft` },
          { value: 'pending', label: t`Pending` },
          { value: 'paid', label: t`Paid` }
        ],
        required: true
      }
    }),
    []
  );
}


