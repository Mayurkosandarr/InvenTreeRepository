import { t } from '@lingui/macro';
import { useMemo } from 'react';

import { AddItemButton } from '../../components/buttons/AddItemButton';
import { formatCurrency } from '../../defaults/formatters';
import { ApiEndpoints } from '../../enums/ApiEndpoints';
import { ModelType } from '../../enums/ModelType';
import { UserRoles } from '../../enums/Roles';
import { useQuotationFields } from '../../forms/QuotationsForms';
import {
  useOwnerFilters,
  useProjectCodeFilters,
  useUserFilters
} from '../../hooks/UseFilter';
import { useCreateApiFormModal } from '../../hooks/UseForm';
import { useTable } from '../../hooks/UseTable';
import { apiUrl } from '../../states/ApiState';
import { useUserState } from '../../states/UserState';

import {
  AssignedToMeFilter,
  CreatedAfterFilter,
  CreatedBeforeFilter,
  CreatedByFilter,
  HasProjectCodeFilter,
  MaxDateFilter,
  MinDateFilter,
  ProjectCodeFilter,
  ResponsibleFilter,
  type TableFilter,
  QuotationStatusFilter
} from '../Filter';
import { InvenTreeTable } from '../InvenTreeTable';

export function QuotationTable({
  partId,
  customerId
}: Readonly<{
  partId?: number;
  customerId?: number;
}>) {
  const table = useTable(!!partId ? 'quotations-part' : 'quotations-index');
  const user = useUserState();

  const projectCodeFilters = useProjectCodeFilters();
  const responsibleFilters = useOwnerFilters();
  const createdByFilters = useUserFilters();

  const tableFilters: TableFilter[] = useMemo(() => {
    const filters: TableFilter[] = [
      QuotationStatusFilter(),
      AssignedToMeFilter(),
      MinDateFilter(),
      MaxDateFilter(),
      CreatedBeforeFilter(),
      CreatedAfterFilter(),
      HasProjectCodeFilter(),
      ProjectCodeFilter({ choices: projectCodeFilters.choices }),
      ResponsibleFilter({ choices: responsibleFilters.choices }),
      CreatedByFilter({ choices: createdByFilters.choices })
    ];

    if (!!partId) {
      filters.push({
        name: 'include_variants',
        type: 'boolean',
        label: t`Include Variants`,
        description: t`Include quotations for part variants`
      });
    }

    return filters;
  }, [
    partId,
    projectCodeFilters.choices,
    responsibleFilters.choices,
    createdByFilters.choices
  ]);

  const quotationFields = useQuotationFields();

  const newQuotation = useCreateApiFormModal({
    url: ApiEndpoints.quotations,
    title: t`Add Quotation`,
    fields: quotationFields,
    initialData: {
      customer: customerId
    },
    follow: true,
    modelType: ModelType.quotation
  });

  const tableActions = useMemo(() => {
    return [
      <AddItemButton
        key='add-quotation'
        tooltip={t`Add Quotation`}
        onClick={() => newQuotation.open()}
        hidden={!user.hasAddRole(UserRoles.quotation)}
      />
    ];
  }, [user]);

  const tableColumns = useMemo(() => {
    return [
      {
        accessor: 'quotation_number',
        title: t`Quotation Number`
      },
      {
        accessor: 'lead',
        title: t`Lead`,
        render: (record: any) => getLeadNameById(record.lead)
      },
      {
        accessor: 'total_amount',
        title: t`Total Amount`,
        render: (record: any) => formatCurrency(record.total_amount)
      },
      {
        accessor: 'status',
        title: t`Status`,
        render: (record: any) => getStatusDisplay(record.status)
      },
      {
        accessor: 'created_at',
        title: t`Created Date`
      }
    ];
  }, []);

  return (
    <>
      {newQuotation.modal}
      <InvenTreeTable
        url={apiUrl(ApiEndpoints.quotations)}
        tableState={table}
        columns={tableColumns}
        props={{
          params: {
            part: partId,
            customer: customerId,
            customer_detail: true
          },
          tableFilters: tableFilters,
          tableActions: tableActions,
          modelType: ModelType.quotation,
          enableSelection: true,
          enableDownload: true,
          enableReports: true
        }}
      />
    </>
  );
}

function getStatusDisplay(status: string): string {
  switch (status) {
    case 'sent':
        return t`Sent`;
    case 'accepted':
      return t`Accepted`;
    case 'rejected':
      return t`Rejected`;
    case 'draft':
      return t`Draft`;
    default:
      return status;
  }
}

function getLeadNameById(lead_id: number): string {
  // Implement lead name lookup logic here
  // This should fetch the lead name from your leads data
  return `Lead ${lead_id}`;
}

export default QuotationTable;