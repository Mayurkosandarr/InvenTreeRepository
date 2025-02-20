import { t } from '@lingui/macro';
import { useMemo } from 'react';
import type { ApiFormFieldSet } from '../components/forms/ApiForm';

export function useQuotationFields(): ApiFormFieldSet {
  return useMemo<ApiFormFieldSet>(
    () => ({
      quotation_number: {
        type: 'string',
        label: t`Quotation Number`,
        required: true
      },
      lead: {
        type: 'related',
        label: t`Lead`,
        model: 'lead',
        required: true
      },
      total_amount: {
        type: 'decimal',
        label: t`Total Amount`,
        required: true,
        min: 0,
        decimal_places: 2
      },
      status: {
        type: 'select',
        label: t`Status`,
        choices: [
          
          { value: 'sent', label: t`Sent` },
          { value: 'draft', label: t`Draft` },
          { value: 'accepted', label: t`Accepted` },
          { value: 'rejected', label: t`Rejected` }
        ],
        required: true
      },
      created_at: {
        type: 'datetime',
        label: t`Created Date`,
        required: true,
        read_only: true
      }
    }),
    []
  );
}