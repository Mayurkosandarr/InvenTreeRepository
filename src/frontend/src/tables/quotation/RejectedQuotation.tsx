import { useEffect, useState, useMemo } from 'react';
import { t } from '@lingui/macro';
import { AddItemButton } from '../../components/buttons/AddItemButton';
import { ApiEndpoints } from '../../enums/ApiEndpoints';
import { ModelType } from '../../enums/ModelType';
import { UserRoles } from '../../enums/Roles';
import { useQuotationFields } from '../../forms/QuotationsForms';
import { useTable } from '../../hooks/UseTable';
import { useCreateApiFormModal } from '../../hooks/UseForm';
import { InvenTreeTable } from '../InvenTreeTable';
import { useUserState } from '../../states/UserState';
import Quotation from '../../components/nav/Quotation'; // Import the Quotation component

export default function RejectedQuotationTable({
  partId,
  customerId
}: Readonly<{
  partId?: number;
  customerId?: number;
}>) {
  const table = useTable(!!partId ? 'quotations-part' : 'quotations-index');
  const user = useUserState();
  const [quotations, setQuotations] = useState<any[]>([]);
  const [leads, setLeads] = useState<Record<number, string>>({});
  const [showQuotationForm, setShowQuotationForm] = useState(false); // State to control the visibility of the Quotation form

  useEffect(() => {
    fetchQuotations();
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch(ApiEndpoints.leads);
      const result = await response.json();
      if (response.ok) {
        const leadMap: Record<number, string> = {};
        result.forEach((lead: any) => {
          leadMap[lead.id] = lead.name;
        });
        setLeads(leadMap);
      } else {
        console.error('Failed to fetch leads:', result.error);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  const fetchQuotations = async () => {
    try {
      const response = await fetch(ApiEndpoints.quotations);
      const result = await response.json();
      if (response.ok) {
        const rejectedQuotations = result.filter((quotation: any) => quotation.status === 'rejected');
        setQuotations(rejectedQuotations);
      } else {
        console.error('Failed to fetch quotations:', result.error);
      }
    } catch (error) {
      console.error('Error fetching quotations:', error);
    }
  };

  const newQuotation = useCreateApiFormModal({
    url: ApiEndpoints.quotations,
    title: t`Add Quotation`,
    fields: useQuotationFields(),
    initialData: { customer: customerId },
    follow: true,
    modelType: ModelType.quotation
  });

  const tableActions = useMemo(() => {
    return [
      <AddItemButton
        key='add-quotation'
        tooltip={t`Add Quotation`}
        onClick={() => setShowQuotationForm(true)} // Open the Quotation form when the button is clicked
        hidden={!user.hasAddRole(UserRoles.quotation)}
      />
    ];
  }, [user]);

  const tableColumns = useMemo(() => {
    return [
      { accessor: 'quotation_number', title: t`Quotation Number` },
      { accessor: 'total_amount', title: t`Total Amount`, render: (record: any) => record.total_amount.toLocaleString() },
      { accessor: 'status', title: t`Status`, render: (record: any) => getStatusDisplay(record.status) },
      { accessor: 'created_at', title: t`Created Date` },
      { accessor: 'lead_name', title: t`Lead Name`, render: (record: any) => leads[record.lead] || 'N/A' }
    ];
  }, [quotations, leads]);

  return (
    <>
      {showQuotationForm && (
        <Quotation onClose={() => setShowQuotationForm(false)} /> // Render the Quotation component conditionally
      )}
      {!showQuotationForm && (
        <>
          {newQuotation.modal}
          <InvenTreeTable
            url="" // Remove the API URL since we're passing filtered data manually
            tableState={table}
            columns={tableColumns}
            tableData={quotations}
            props={{
              params: { part: partId, customer: customerId },
              tableActions: tableActions,
              modelType: ModelType.quotation,
              enableSelection: true,
              enableDownload: true,
              enableReports: true
            }}
          />
        </>
      )}
    </>
  );
}

function getStatusDisplay(status: string): string {
  switch (status) {
    case 'sent':
      return 'Sent';
    case 'accepted':
      return 'Accepted';
    case 'rejected':
      return 'Rejected';
    case 'draft':
      return 'Draft';
    default:
      return status;
  }
}