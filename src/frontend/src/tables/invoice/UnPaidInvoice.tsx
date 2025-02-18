// import { useEffect, useState, useMemo, useCallback } from 'react';
// import { t } from '@lingui/macro';
// import { AddItemButton } from '../../components/buttons/AddItemButton';
// import { ApiEndpoints } from '../../enums/ApiEndpoints';
// import { ModelType } from '../../enums/ModelType';
// import { UserRoles } from '../../enums/Roles';
// import { useInvoiceFields } from '../../forms/InvoicesForms';
// import { useTable } from '../../hooks/UseTable';
// import { useCreateApiFormModal } from '../../hooks/UseForm';
// import { InvenTreeTable } from '../InvenTreeTable';
// import { useUserState } from '../../states/UserState';
// import InvoiceForm from '../../components/nav/Invoice'; // Import the InvoiceForm component from the correct path
// import '../../components/nav/Invoice.css';

// export function UnPaidInvoiceTable({
//   partId,
//   customerId
// }: Readonly<{
//   partId?: number;
//   customerId?: number;
// }>) {
//   const table = useTable(!!partId ? 'invoices-part' : 'invoices-index');
//   const user = useUserState();
//   const [invoices, setInvoices] = useState<any[]>([]);
//   const [leads, setLeads] = useState<Record<number, string>>({});
//   const [showInvoiceForm, setShowInvoiceForm] = useState(false); // State to control the visibility of the Invoice form

//   useEffect(() => {
//     fetchInvoices();
//     fetchLeads();
//   }, []);

//   const fetchLeads = async () => {
//     try {
//       const response = await fetch(ApiEndpoints.leads);
//       const result = await response.json();
//       if (response.ok) {
//         const leadMap: Record<number, string> = {};
//         result.forEach((lead: any) => {
//           leadMap[lead.id] = lead.name;
//         });
//         setLeads(leadMap);
//       } else {
//         console.error('Failed to fetch leads:', result.error);
//       }
//     } catch (error) {
//       console.error('Error fetching leads:', error);
//     }
//   };

//   const fetchInvoices = async () => {
//     try {
//       const response = await fetch(ApiEndpoints.invoices);
//       const result = await response.json();
//       if (response.ok) {
//         const unPaidInvoices = result.filter((invoice: any) => invoice.status === 'unpaid');
//         setInvoices(unPaidInvoices);
//       } else {
//         console.error('Failed to fetch invoices:', result.error);
//       }
//     } catch (error) {
//       console.error('Error fetching invoices:', error);
//     }
//   };
  

//   const newInvoice = useCreateApiFormModal({
//     url: ApiEndpoints.invoices,
//     title: t`Add Invoice`,
//     fields: useInvoiceFields(),
//     initialData: { customer: customerId },
//     follow: true,
//     modelType: ModelType.invoice
//   });

//   const tableActions = useMemo(() => {
//     return [
//       <AddItemButton
//         key='add-invoice'
//         tooltip={t`Add Invoice`}
//         onClick={() => setShowInvoiceForm(true)} // Open the Invoice form when the button is clicked
//         hidden={!user.hasAddRole(UserRoles.invoice)}
//       />,
      
//     ];
//   }, [user]);

//   const tableColumns = useMemo(() => {
//     return [
//       { accessor: 'quotation_number', title: t`Quotation Number` },
//       { accessor: 'invoice_number', title: t`Invoice Number` },
//       {
//         accessor: 'total_amount',
//         title: t`Total Amount`,
//         render: (record: any) => record.amount_due.toLocaleString()
//       },
//       {
//         accessor: 'paid_amount',
//         title: t`Paid Amount`,
//         render: (record: any) => record.paid_amount.toLocaleString()
//       },
//       {
//         accessor: 'amount_due',  // Add this line for Amount Due
//         title: t`Amount Due`,
//         render: (record: any) => record.amount_due.toLocaleString()
//       },
//       {
//         accessor: 'status',
//         title: t`Status`,
//         render: (record: any) => getStatusDisplay(record.status)
//       },
//       { accessor: 'created_at', title: t`Created Date` },
//       {
//         accessor: 'lead_name',
//         title: t`Lead Name`,
//         render: (record: any) => leads[record.lead] || 'N/A'
//       },
//       { accessor: 'due_date', title: t`Due Date` }
//     ];
//   }, [invoices, leads]);

//   return (
//     <>
//       {showInvoiceForm && (
//         <InvoiceForm onClose={() => setShowInvoiceForm(false)} /> // Render the InvoiceForm component conditionally
//       )}
//       {!showInvoiceForm && (
//         <>
//           {newInvoice.modal}
//           <InvenTreeTable
//             url="" // Remove the API URL since we're passing filtered data manually
//             tableState={table}
//             columns={tableColumns}
//             tableData={invoices}
//             props={{
//               params: { part: partId, customer: customerId },
//               tableActions: tableActions,
//               modelType: ModelType.invoice,
//               enableSelection: true,
//               enableDownload: true,
//               enableReports: true,
//               enableRefresh: true
//             }}
//           />
//         </>
//       )}
//     </>
//   );
// }

// function getStatusDisplay(status: string): string {
//   switch (status) {
//     case 'partially_paid':
//       return 'Partially Paid';
//     case 'paid':
//       return 'Paid';
//     case 'unpaid':
//       return 'Unpaid';
//     default:
//       return status;
//   }
// }

// import { useEffect, useState, useMemo, useCallback } from 'react';
// import { t } from '@lingui/macro';
// import { AddItemButton } from '../../components/buttons/AddItemButton';
// import { ApiEndpoints } from '../../enums/ApiEndpoints';
// import { ModelType } from '../../enums/ModelType';
// import { UserRoles } from '../../enums/Roles';
// import { useInvoiceFields } from '../../forms/InvoicesForms';
// import { useTable } from '../../hooks/UseTable';
// import { useCreateApiFormModal } from '../../hooks/UseForm';
// import { InvenTreeTable } from '../InvenTreeTable';
// import { useUserState } from '../../states/UserState';
// import InvoiceForm from '../../components/nav/Invoice';
// import '../../components/nav/Invoice.css';

// export function UnPaidInvoiceTable({
//   partId,
//   customerId
// }: Readonly<{
//   partId?: number;
//   customerId?: number;
// }>) {
//   const table = useTable(!!partId ? 'invoices-part' : 'invoices-index');
//   const user = useUserState();
//   const [invoices, setInvoices] = useState<any[]>([]);
//   const [leads, setLeads] = useState<Record<number, string>>({});
//   const [showInvoiceForm, setShowInvoiceForm] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [originalInvoices, setOriginalInvoices] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
  

//   const fetchLeads = useCallback(async () => {
//     try {
//       const response = await fetch(ApiEndpoints.leads);
//       const result = await response.json();
//       if (response.ok) {
//         const leadMap: Record<number, string> = {};
//         result.forEach((lead: any) => {
//           leadMap[lead.id] = lead.name;
//         });
//         setLeads(leadMap);
//       }
//     } catch (error) {
//       console.error('Error fetching leads:', error);
//     }
//   }, []); // No dependencies needed

//   const fetchInvoices = useCallback(async () => {
//     try {
//       const response = await fetch(ApiEndpoints.invoices);
//       const result = await response.json();
//       if (response.ok) {
//         const unPaidInvoices = result.filter((invoice: any) => invoice.status === 'unpaid');
//         setInvoices(unPaidInvoices);
//       }
//     } catch (error) {
//       console.error('Error fetching invoices:', error);
//     }
//   }, []); // No dependencies needed

//   const handleRefresh = useCallback(async () => {
//     if (!table || isLoading) return;
    
//     try {
//       setIsLoading(true);
//       table.setIsLoading(true);
//       await Promise.all([
//         fetchInvoices(),
//         fetchLeads()
//       ]);
//       table.clearSelectedRecords();
//     } catch (error) {
//       console.error('Error refreshing data:', error);
//     } finally {
//       setIsLoading(false);
//       table.setIsLoading(false);
//     }
//   }, [table, isLoading, fetchInvoices, fetchLeads]);

//   // Initial data load - runs only once
//   useEffect(() => {
//     const loadInitialData = async () => {
//       setIsLoading(true);
//       try {
//         await Promise.all([
//           fetchInvoices(),
//           fetchLeads()
//         ]);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     loadInitialData();
//   }, []); // Empty dependency array ensures it runs only once

//   // Connect refresh handler to table
//   useEffect(() => {
//     if (table) {
//       const originalRefresh = table.refreshTable;
//       table.refreshTable = handleRefresh;
//       return () => {
//         table.refreshTable = originalRefresh;
//       };
//     }
//   }, [table, handleRefresh]);

//   const newInvoice = useCreateApiFormModal({
//     url: ApiEndpoints.invoices,
//     title: t`Add Invoice`,
//     fields: useInvoiceFields(),
//     initialData: { customer: customerId },
//     follow: true,
//     modelType: ModelType.invoice,
//     onFormSuccess: handleRefresh
//   });

//   const tableActions = useMemo(() => {
//     return [
//       <AddItemButton
//         key='add-invoice'
//         tooltip={t`Add Invoice`}
//         onClick={() => setShowInvoiceForm(true)}
//         hidden={!user.hasAddRole(UserRoles.invoice)}
//       />
//     ];
//   }, [user]);

//   const tableColumns = useMemo(() => {
//     return [
//       { accessor: 'quotation_number', title: t`Quotation Number` },
//       { accessor: 'invoice_number', title: t`Invoice Number` },
//       {
//         accessor: 'total_amount',
//         title: t`Total Amount`,
//         render: (record: any) => record.total_amount.toLocaleString()
//       },
//       {
//         accessor: 'paid_amount',
//         title: t`Paid Amount`,
//         render: (record: any) => record.paid_amount.toLocaleString()
//       },
//       {
//         accessor: 'amount_due',
//         title: t`Amount Due`,
//         render: (record: any) => record.amount_due.toLocaleString()
//       },
//       {
//         accessor: 'status',
//         title: t`Status`,
//         render: (record: any) => getStatusDisplay(record.status)
//       },
//       { accessor: 'created_at', title: t`Created Date` },
//       {
//         accessor: 'lead_name',
//         title: t`Lead Name`,
//         render: (record: any) => leads[record.lead] || 'N/A'
//       },
//       { accessor: 'due_date', title: t`Due Date` }
//     ];
//   }, [leads]);

//   return (
//     <>
//       {showInvoiceForm && (
//         <InvoiceForm 
//           onClose={() => setShowInvoiceForm(false)} 
//         />
//       )}
//       {!showInvoiceForm && (
//         <>
//           {newInvoice.modal}
//           {isLoading && (
//             <div className="loader-container">
//               <div className="loader" />
//             </div>
//           )}
//           <InvenTreeTable
//             url=""
//             tableState={table}
//             columns={tableColumns}
//             tableData={invoices}
//             props={{
//               params: { part: partId, customer: customerId },
//               tableActions: tableActions,
//               modelType: ModelType.invoice,
//               enableSelection: true,
//               enableDownload: true,
//               enableReports: true,
//               enableRefresh: true,
//               enableSearch: true, // Enable search
    
//             }}
//           />
//         </>
//       )}
//     </>
//   );
// }


// function getStatusDisplay(status: string): string {
//   switch (status) {
//     case 'partially_paid':
//       return 'Partially Paid';
//     case 'paid':
//       return 'Paid';
//     case 'unpaid':
//       return 'Unpaid';
//     default:
//       return status;
//   }
// }

// export default UnPaidInvoiceTable;




import { useEffect, useState, useMemo, useCallback } from 'react';
import { t } from '@lingui/macro';
import { AddItemButton } from '../../components/buttons/AddItemButton';
import { ApiEndpoints } from '../../enums/ApiEndpoints';
import { ModelType } from '../../enums/ModelType';
import { UserRoles } from '../../enums/Roles';
import { useInvoiceFields } from '../../forms/InvoicesForms';
import { useTable } from '../../hooks/UseTable';
import { useCreateApiFormModal } from '../../hooks/UseForm';
import { InvenTreeTable } from '../InvenTreeTable';
import { useUserState } from '../../states/UserState';
import InvoiceForm from '../../components/nav/Invoice';
import '../../components/nav/Invoice.css';

export function UnPaidInvoiceTable({
  partId,
  customerId
}: Readonly<{
  partId?: number;
  customerId?: number;
}>) {
  const table = useTable(!!partId ? 'invoices-part' : 'invoices-index');
  const user = useUserState();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [originalInvoices, setOriginalInvoices] = useState<any[]>([]);
  const [leads, setLeads] = useState<Record<number, string>>({});
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback((term: string) => {
    if (!term.trim()) {
      setInvoices(originalInvoices);
      return;
    }

    const searchLower = term.toLowerCase();
    const filtered = originalInvoices.filter((invoice: any) => {
      return (
        invoice.quotation_number?.toLowerCase().includes(searchLower) ||
        invoice.invoice_number?.toLowerCase().includes(searchLower) ||
        invoice.total_amount?.toString().includes(searchLower) ||
        invoice.paid_amount?.toString().includes(searchLower) ||
        invoice.amount_due?.toString().includes(searchLower) ||
        invoice.status?.toLowerCase().includes(searchLower) ||
        leads[invoice.lead]?.toLowerCase().includes(searchLower) ||
        invoice.created_at?.toLowerCase().includes(searchLower) ||
        invoice.due_date?.toLowerCase().includes(searchLower)
      );
    });

    setInvoices(filtered);
  }, [originalInvoices, leads]);

  const fetchLeads = useCallback(async () => {
    try {
      const response = await fetch(ApiEndpoints.leads);
      const result = await response.json();
      if (response.ok) {
        const leadMap: Record<number, string> = {};
        result.forEach((lead: any) => {
          leadMap[lead.id] = lead.name;
        });
        setLeads(leadMap);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  }, []);

  const fetchInvoices = useCallback(async () => {
    try {
      const response = await fetch(ApiEndpoints.invoices);
      const result = await response.json();
      if (response.ok) {
        const unPaidInvoices = result.filter((invoice: any) => invoice.status === 'unpaid');
        setOriginalInvoices(unPaidInvoices); // Store original data
        setInvoices(unPaidInvoices);
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    if (!table || isLoading) return;
    
    try {
      setIsLoading(true);
      table.setIsLoading(true);
      await Promise.all([
        fetchInvoices(),
        fetchLeads()
      ]);
      table.clearSelectedRecords();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsLoading(false);
      table.setIsLoading(false);
    }
  }, [table, isLoading, fetchInvoices, fetchLeads]);

  // Initial data load
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          fetchInvoices(),
          fetchLeads()
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, []);

  // Handle search term changes
  useEffect(() => {
    if (table.searchTerm !== undefined) {
      handleSearch(table.searchTerm);
    }
  }, [table.searchTerm, handleSearch]);

  // Connect refresh handler to table
  useEffect(() => {
    if (table) {
      const originalRefresh = table.refreshTable;
      table.refreshTable = handleRefresh;
      return () => {
        table.refreshTable = originalRefresh;
      };
    }
  }, [table, handleRefresh]);

  const newInvoice = useCreateApiFormModal({
    url: ApiEndpoints.invoices,
    title: t`Add Invoice`,
    fields: useInvoiceFields(),
    initialData: { customer: customerId },
    follow: true,
    modelType: ModelType.invoice,
    onFormSuccess: handleRefresh
  });

  const tableActions = useMemo(() => {
    return [
      <AddItemButton
        key='add-invoice'
        tooltip={t`Add Invoice`}
        onClick={() => setShowInvoiceForm(true)}
        hidden={!user.hasAddRole(UserRoles.invoice)}
      />
    ];
  }, [user]);

  const tableColumns = useMemo(() => {
    return [
      { accessor: 'quotation_number', title: t`Quotation Number` },
      { accessor: 'invoice_number', title: t`Invoice Number` },
      {
        accessor: 'total_amount',
        title: t`Total Amount`,
        render: (record: any) => record.total_amount.toLocaleString()
      },
      {
        accessor: 'paid_amount',
        title: t`Paid Amount`,
        render: (record: any) => record.paid_amount.toLocaleString()
      },
      {
        accessor: 'amount_due',
        title: t`Amount Due`,
        render: (record: any) => record.amount_due.toLocaleString()
      },
      {
        accessor: 'status',
        title: t`Status`,
        render: (record: any) => getStatusDisplay(record.status)
      },
      { accessor: 'created_at', title: t`Created Date` },
      {
        accessor: 'lead_name',
        title: t`Lead Name`,
        render: (record: any) => leads[record.lead] || 'N/A'
      },
      { accessor: 'due_date', title: t`Due Date` }
    ];
  }, [leads]);

  return (
    <>
      {showInvoiceForm && (
        <InvoiceForm 
          onClose={() => setShowInvoiceForm(false)} 
        />
      )}
      {!showInvoiceForm && (
        <>
          {newInvoice.modal}
          {isLoading && (
            <div className="loader-container">
              <div className="loader" />
            </div>
          )}
          <InvenTreeTable
            url=""
            tableState={table}
            columns={tableColumns}
            tableData={invoices}
            props={{
              params: { part: partId, customer: customerId },
              tableActions: tableActions,
              modelType: ModelType.invoice,
              enableSelection: true,
              enableDownload: true,
              enableReports: true,
              enableRefresh: true,
              enableSearch: true,
              onSearch: handleSearch
            }}
          />
        </>
      )}
    </>
  );
}

function getStatusDisplay(status: string): string {
  switch (status) {
    case 'partially_paid':
      return 'Partially Paid';
    case 'paid':
      return 'Paid';
    case 'unpaid':
      return 'Unpaid';
    default:
      return status;
  }
}

export default UnPaidInvoiceTable;