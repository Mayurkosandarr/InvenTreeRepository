

// // import React from 'react';
// // import { t } from '@lingui/macro';
// // import { useMemo } from 'react';

// // import { AddItemButton } from '../../components/buttons/AddItemButton';
// // import { Thumbnail } from '../../components/images/Thumbnail';
// // import { formatCurrency } from '../../defaults/formatters';
// // import { ApiEndpoints } from '../../enums/ApiEndpoints';
// // import { ModelType } from '../../enums/ModelType';
// // import { UserRoles } from '../../enums/Roles';
// // import { useInvoiceFields } from '../../forms/InvoicesForms';
// // import {
// //   useOwnerFilters,
// //   useProjectCodeFilters,
// //   useUserFilters
// // } from '../../hooks/UseFilter';
// // import { useCreateApiFormModal } from '../../hooks/UseForm';
// // import { useTable } from '../../hooks/UseTable';
// // import { apiUrl } from '../../states/ApiState';
// // import { useUserState } from '../../states/UserState';
// // import {
// //   CreatedByColumn,
// //   CreationDateColumn,
// //   DescriptionColumn,
// //   ProjectCodeColumn,
// //   ReferenceColumn,
// //   ResponsibleColumn,
// //   StatusColumn,
// //   TargetDateColumn
// // } from '../ColumnRenderers';
// // import {
// //   AssignedToMeFilter,
// //   CompletedAfterFilter,
// //   CompletedBeforeFilter,
// //   CreatedAfterFilter,
// //   CreatedBeforeFilter,
// //   CreatedByFilter,
// //   HasProjectCodeFilter,
// //   MaxDateFilter,
// //   MinDateFilter,
// //   OrderStatusFilter,
// //   OutstandingFilter,
// //   OverdueFilter,
// //   ProjectCodeFilter,
// //   ResponsibleFilter,
// //   type TableFilter,
// //   TargetDateAfterFilter,
// //   TargetDateBeforeFilter,
// //   PaidStatusFilter // Import the new filter
// // } from '../Filter';
// // import { InvenTreeTable } from '../InvenTreeTable';

// // export function PaidInvoiceTable({
// //   partId,
// //   customerId
// // }: Readonly<{
// //   partId?: number;
// //   customerId?: number;
// // }>) {
// //   const table = useTable(!!partId ? 'invoices-part' : 'invoices-index');
// //   const user = useUserState();

// //   const projectCodeFilters = useProjectCodeFilters();
// //   const responsibleFilters = useOwnerFilters();
// //   const createdByFilters = useUserFilters();

// //   const tableFilters: TableFilter[] = useMemo(() => {
// //     const filters: TableFilter[] = [
// //       OrderStatusFilter({ model: ModelType.invoice }),
// //       OutstandingFilter(),
// //       OverdueFilter(),
// //       AssignedToMeFilter(),
// //       MinDateFilter(),
// //       MaxDateFilter(),
// //       CreatedBeforeFilter(),
// //       CreatedAfterFilter(),
// //       TargetDateBeforeFilter(),
// //       TargetDateAfterFilter(),
// //       CompletedBeforeFilter(),
// //       CompletedAfterFilter(),
// //       HasProjectCodeFilter(),
// //       ProjectCodeFilter({ choices: projectCodeFilters.choices }),
// //       ResponsibleFilter({ choices: responsibleFilters.choices }),
// //       CreatedByFilter({ choices: createdByFilters.choices }),
// //       PaidStatusFilter() // Add the new filter here
// //     ];

// //     if (!!partId) {
// //       filters.push({
// //         name: 'include_variants',
// //         type: 'boolean',
// //         label: t`Include Variants`,
// //         description: t`Include orders for part variants`
// //       });
// //     }

// //     return filters;
// //   }, [
// //     partId,
// //     projectCodeFilters.choices,
// //     responsibleFilters.choices,
// //     createdByFilters.choices
// //   ]);

// //   const invoiceFields = useInvoiceFields();

// //   const newInvoice = useCreateApiFormModal({
// //     url: ApiEndpoints.invoice_list,
// //     title: t`Add Invoice`,
// //     fields: invoiceFields,
// //     initialData: {
// //       customer: customerId
// //     },
// //     follow: true,
// //     modelType: ModelType.invoice
// //   });

// //   const tableActions = useMemo(() => {
// //     return [
// //       <AddItemButton
// //         key='add-invoice'
// //         tooltip={t`Add Invoice`}
// //         onClick={() => newInvoice.open()}
// //         hidden={!user.hasAddRole(UserRoles.invoice)}
// //       />
// //     ];
// //   }, [user]);

// //   const tableColumns = useMemo(() => {
// //     return [
// //       ReferenceColumn({}),
// //       {
// //         accessor: 'quotation_number',
// //         title: t`Quotation Number`
// //       },
// //       {
// //         accessor: 'invoice_number',
// //         title: t`Invoice Number`
// //       },
// //       {
// //         accessor: 'total_amount',
// //         title: t`Total Amount`,
// //         render: (record: any) => formatCurrency(record.total_amount)
// //       },
// //       {
// //         accessor: 'paid_amount',
// //         title: t`Paid Amount`,
// //         render: (record: any) => formatCurrency(record.paid_amount)
// //       },
// //       {
// //         accessor: 'amount_due',
// //         title: t`Amount Due`,
// //         render: (record: any) => formatCurrency(record.amount_due)
// //       },
// //       {
// //         accessor: 'status',
// //         title: t`Status`,
// //         render: (record: any) => getStatusDisplay(record.status)
// //       },
// //       {
// //         accessor: 'created_at',
// //         title: t`Created Date`
// //       },
// //       {
// //         accessor: 'lead_id',
// //         title: t`Lead`,
// //         render: (record: any) => getLeadNameById(record.lead_id)
// //       },
// //       {
// //         accessor: 'due_date',
// //         title: t`Due Date`
// //       }
// //     ];
// //   }, []);

// //   return (
// //     <>
// //       {newInvoice.modal}
// //       <InvenTreeTable
// //         url={apiUrl(ApiEndpoints.invoice_list)}
// //         tableState={table}
// //         columns={tableColumns}
// //         props={{
// //           params: {
// //             part: partId,
// //             customer: customerId,
// //             customer_detail: true
// //           },
// //           tableFilters: tableFilters,
// //           tableActions: tableActions,
// //           modelType: ModelType.invoice,
// //           enableSelection: true,
// //           enableDownload: true,
// //           enableReports: true
// //         }}
// //       />
// //     </>
// //   );
// // }



// import React, { useEffect, useState } from 'react';
// import { t } from '@lingui/macro';
// import { useMemo } from 'react';

// import { AddItemButton } from '../../components/buttons/AddItemButton';
// import { formatCurrency } from '../../defaults/formatters';
// import { ApiEndpoints } from '../../enums/ApiEndpoints';
// import { ModelType } from '../../enums/ModelType';
// import { UserRoles } from '../../enums/Roles';
// import { useInvoiceFields } from '../../forms/InvoicesForms';
// import {
//   useOwnerFilters,
//   useProjectCodeFilters,
//   useUserFilters
// } from '../../hooks/UseFilter';
// import { useCreateApiFormModal } from '../../hooks/UseForm';
// import { useTable } from '../../hooks/UseTable';
// import { apiUrl } from '../../states/ApiState';
// import { useUserState } from '../../states/UserState';
// import {
//   ReferenceColumn,
//   CreatedByColumn,
//   CreationDateColumn,
//   DescriptionColumn,
//   ProjectCodeColumn,
//   ResponsibleColumn,
//   StatusColumn,
//   TargetDateColumn
// } from '../ColumnRenderers';
// import {
//   AssignedToMeFilter,
//   CompletedAfterFilter,
//   CompletedBeforeFilter,
//   CreatedAfterFilter,
//   CreatedBeforeFilter,
//   CreatedByFilter,
//   HasProjectCodeFilter,
//   MaxDateFilter,
//   MinDateFilter,
//   OrderStatusFilter,
//   OutstandingFilter,
//   OverdueFilter,
//   ProjectCodeFilter,
//   ResponsibleFilter,
//   type TableFilter,
//   TargetDateAfterFilter,
//   TargetDateBeforeFilter,
//   PaidStatusFilter // Import the new filter
// } from '../Filter';
// import { InvenTreeTable } from '../InvenTreeTable';

// export function PaidInvoiceTable({
//   partId,
//   customerId
// }: Readonly<{
//   partId?: number;
//   customerId?: number;
// }>) {
//   const table = useTable(!!partId ? 'invoices-part' : 'invoices-index');
//   const user = useUserState();
//   const [invoices, setInvoices] = useState<any[]>([]);

//   useEffect(() => {
//     fetchInvoices();
//   }, []);

//   useEffect(() => {
//     fetchInvoices();
//   }, []);
  
//   const fetchInvoices = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/lead-to-invoice/invoices/');
//       const result = await response.json();
//       if (response.ok) {
//         // Filter invoices to only include those with status "paid"
//         const paidInvoices = result.filter((invoice: any) => invoice.status === 'paid');
//         setInvoices(paidInvoices);
//       } else {
//         console.error('Failed to fetch invoices:', result.error);
//       }
//     } catch (error) {
//       console.error('Error fetching invoices:', error);
//     }
//   };
  
//   const projectCodeFilters = useProjectCodeFilters();
//   const responsibleFilters = useOwnerFilters();
//   const createdByFilters = useUserFilters();

//   const tableFilters: TableFilter[] = useMemo(() => {
//     const filters: TableFilter[] = [
//       OrderStatusFilter({ model: ModelType.invoice }),
//       OutstandingFilter(),
//       OverdueFilter(),
//       AssignedToMeFilter(),
//       MinDateFilter(),
//       MaxDateFilter(),
//       CreatedBeforeFilter(),
//       CreatedAfterFilter(),
//       TargetDateBeforeFilter(),
//       TargetDateAfterFilter(),
//       CompletedBeforeFilter(),
//       CompletedAfterFilter(),
//       HasProjectCodeFilter(),
//       ProjectCodeFilter({ choices: projectCodeFilters.choices }),
//       ResponsibleFilter({ choices: responsibleFilters.choices }),
//       CreatedByFilter({ choices: createdByFilters.choices }),
//       PaidStatusFilter({ status: 'paid' }) // Filter for paid invoices
//     ];

//     if (!!partId) {
//       filters.push({
//         name: 'include_variants',
//         type: 'boolean',
//         label: t`Include Variants`,
//         description: t`Include orders for part variants`
//       });
//     }

//     return filters;
//   }, [
//     partId,
//     projectCodeFilters.choices,
//     responsibleFilters.choices,
//     createdByFilters.choices
//   ]);

//   const invoiceFields = useInvoiceFields();

//   const newInvoice = useCreateApiFormModal({
//     url: ApiEndpoints.invoice_list,
//     title: t`Add Invoice`,
//     fields: invoiceFields,
//     initialData: {
//       customer: customerId
//     },
//     follow: true,
//     modelType: ModelType.invoice
//   });

//   const tableActions = useMemo(() => {
//     return [
//       <AddItemButton
//         key='add-invoice'
//         tooltip={t`Add Invoice`}
//         onClick={() => newInvoice.open()}
//         hidden={!user.hasAddRole(UserRoles.invoice)}
//       />
//     ];
//   }, [user]);

//   const tableColumns = useMemo(() => {
//     return [
//     //   ReferenceColumn({}),
//       {
//         accessor: 'quotation_number',
//         title: t`Quotation Number`
//       },
//       {
//         accessor: 'invoice_number',
//         title: t`Invoice Number`
//       },
//       {
//         accessor: 'total_amount',
//         title: t`Total Amount`,
//         render: (record: any) => formatCurrency(record.total_amount)
//       },
//       {
//         accessor: 'paid_amount',
//         title: t`Paid Amount`,
//         render: (record: any) => formatCurrency(record.paid_amount)
//       },
//     //   {
//     //     accessor: 'amount_due',
//     //     title: t`Amount Due`,
//     //     render: (record: any) => formatCurrency(record.amount_due)
//     //   },
//       {
//         accessor: 'status',
//         title: t`Status`,
//         render: (record: any) => getStatusDisplay(record.status)
//       },
//       {
//         accessor: 'created_at',
//         title: t`Created Date`
//       },
//       {
//         accessor: 'lead_id',
//         title: t`Lead ID`,
//         render: (record: any) => record.lead_id
//       },
//       {
//         accessor: 'due_date',
//         title: t`Due Date`
//       }
//     ];
//   }, [invoices]);

//   return (
//     <>
//       {newInvoice.modal}
//       <InvenTreeTable
//         url="" // Remove the API URL since we're passing filtered data manually
//         tableState={table}
//         columns={tableColumns}
//         tableData={invoices} // Pass only paid invoices here
//         props={{
//           params: {
//             part: partId,
//             customer: customerId
//           },
//           tableFilters: tableFilters,
//           tableActions: tableActions,
//           modelType: ModelType.invoice,
//           enableSelection: true,
//           enableDownload: true,
//           enableReports: true
//         }}
//       />
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


import React, { useEffect, useState, useMemo } from 'react';
import { t } from '@lingui/macro';
import { AddItemButton } from '../../components/buttons/AddItemButton';
import { formatCurrency } from '../../defaults/formatters';
import { ApiEndpoints } from '../../enums/ApiEndpoints';
import { ModelType } from '../../enums/ModelType';
import { UserRoles } from '../../enums/Roles';
import { useInvoiceFields } from '../../forms/InvoicesForms';
import { useTable } from '../../hooks/UseTable';
import { useCreateApiFormModal } from '../../hooks/UseForm';
import { InvenTreeTable } from '../InvenTreeTable';
import { useUserState } from '../../states/UserState';

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
  const [leads, setLeads] = useState<Record<number, string>>({});

  useEffect(() => {
    fetchInvoices();
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/lead_to_invoice/leads/');
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

  const fetchInvoices = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/lead_to_invoice/invoices/');
      const result = await response.json();
      if (response.ok) {
        const unPaidInvoices = result.filter((invoice: any) => invoice.status === 'unpaid');
        setInvoices(unPaidInvoices);
      } else {
        console.error('Failed to fetch invoices:', result.error);
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const newInvoice = useCreateApiFormModal({
    url: ApiEndpoints.invoice_list,
    title: t`Add Invoice`,
    fields: useInvoiceFields(),
    initialData: { customer: customerId },
    follow: true,
    modelType: ModelType.invoice
  });

  const tableActions = useMemo(() => {
    return [
      <AddItemButton
        key='add-invoice'
        tooltip={t`Add Invoice`}
        onClick={() => newInvoice.open()}
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
        render: (record: any) => formatCurrency(record.total_amount)
      },
      {
        accessor: 'paid_amount',
        title: t`Paid Amount`,
        render: (record: any) => formatCurrency(record.paid_amount)
      },
      {
        accessor: 'amount_due',  // Add this line for Amount Due
        title: t`Amount Due`,
        render: (record: any) => formatCurrency(record.amount_due) // Assuming amount_due is a field in your response
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
        render: (record: any) => leads[record.lead_id] || 'N/A'
      },
      { accessor: 'due_date', title: t`Due Date` }
    ];
  }, [invoices, leads]);

  return (
    <>
      {newInvoice.modal}
      <InvenTreeTable
        url="" // Remove the API URL since we're passing filtered data manually
        tableState={table}
        columns={tableColumns}
        tableData={invoices}
        props={{
          params: { part: partId, customer: customerId },
          tableActions: tableActions,
          modelType: ModelType.invoice,
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
