

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


import React, { useEffect, useState, useMemo,useCallback } from 'react';
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
import {useCreateInvoiceFormModal} from '../../hooks/UseForm'
import {
  ReferenceColumn,
  CreatedByColumn,
  CreationDateColumn,
  DescriptionColumn,
  ProjectCodeColumn,
  ResponsibleColumn,
  StatusColumn,
  TargetDateColumn
} from '../ColumnRenderers';
import {
  AssignedToMeFilter,
  CompletedAfterFilter,
  CompletedBeforeFilter,
  CreatedAfterFilter,
  CreatedBeforeFilter,
  CreatedByFilter,
  HasProjectCodeFilter,
  MaxDateFilter,
  MinDateFilter,
  OrderStatusFilter,
  OutstandingFilter,
  OverdueFilter,
  ProjectCodeFilter,
  ResponsibleFilter,
  type TableFilter,
  TargetDateAfterFilter,
  TargetDateBeforeFilter,
  PaidStatusFilter // Import the new filter
} from '../Filter';
import { useOwnerFilters, useProjectCodeFilters, useUserFilters } from '../../hooks/UseFilter';

export function PaidInvoiceTable({
  partId,
  customerId
}: Readonly<{
  partId?: number;
  customerId?: number;
}>) {
  const table = useTable(!!partId ? 'invoices-part' : 'invoices-index');
  const user = useUserState();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/lead_to_invoice/invoices/');
      const result = await response.json();
      if (response.ok) {
        // Filter invoices to only include those with status "paid"
        const paidInvoices = result.filter((invoice: any) => invoice.status === 'paid');
        setInvoices(paidInvoices);
      } else {
        console.error('Failed to fetch invoices:', result.error);
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  const projectCodeFilters = useProjectCodeFilters();
  const responsibleFilters = useOwnerFilters();
  const createdByFilters = useUserFilters();

  const tableFilters: TableFilter[] = useMemo(() => {
    const filters: TableFilter[] = [
      OrderStatusFilter({ model: ModelType.invoice }),
      OutstandingFilter(),
      OverdueFilter(),
      AssignedToMeFilter(),
      MinDateFilter(),
      MaxDateFilter(),
      CreatedBeforeFilter(),
      CreatedAfterFilter(),
      TargetDateBeforeFilter(),
      TargetDateAfterFilter(),
      CompletedBeforeFilter(),
      CompletedAfterFilter(),
      HasProjectCodeFilter(),
      ProjectCodeFilter({ choices: projectCodeFilters.choices }),
      ResponsibleFilter({ choices: responsibleFilters.choices }),
      CreatedByFilter({ choices: createdByFilters.choices }),
      PaidStatusFilter({ status: 'paid' }) // Filter for paid invoices
    ];

    if (!!partId) {
      filters.push({
        name: 'include_variants',
        type: 'boolean',
        label: t`Include Variants`,
        description: t`Include orders for part variants`
      });
    }

    return filters;
  }, [
    partId,
    projectCodeFilters.choices,
    responsibleFilters.choices,
    createdByFilters.choices
  ]);



  // const newInvoice = useCreateInvoiceFormModal({
  //   url: ApiEndpoints.invoice_list,
  //   title: t`Add Invoice`,
  //   fields: invoiceFields,
  //   initialData: {
  //     customer: customerId
  //   },
  //   follow: true,
  //   modelType: ModelType.invoice
  // });
  const invoiceFields = useInvoiceFields();

const newInvoice = useCreateInvoiceFormModal({
  url: ApiEndpoints.invoice_list,
  title: t`Add Invoice`,
  fields: invoiceFields,
  initialData: {
    customer: customerId
  },
  follow: true,
  modelType: ModelType.invoice
});


  console.log("Modal Opened: ", newInvoice.open);


  // const tableActions = useMemo(() => {
  //   return [
  //     <AddItemButton
  //       key='add-invoice'
  //       tooltip={t`Add Invoice`}
  //       onClick={() => newInvoice.open()}
  //       hidden={!user.hasAddRole(UserRoles.invoice)}
  //     />
  //   ];
  // }, [user, newInvoice]);
  const openInvoiceModal = useCallback(() => {
    newInvoice.open();
  }, [newInvoice]);
  
  const tableActions = useMemo(() => {
    return [
      <AddItemButton
        key='add-invoice'
        tooltip={t`Add Invoice`}
        onClick={openInvoiceModal}
        hidden={!user.hasAddRole(UserRoles.invoice)}
      />
    ];
  }, [user, openInvoiceModal]);
  

  const tableColumns = useMemo(() => {
    return [
      ReferenceColumn({}),
      {
        accessor: 'quotation_number',
        title: t`Quotation Number`
      },
      {
        accessor: 'invoice_number',
        title: t`Invoice Number`
      },
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
        accessor: 'amount_due',
        title: t`Amount Due`,
        render: (record: any) => formatCurrency(record.amount_due)
      },
      {
        accessor: 'status',
        title: t`Status`,
        render: (record: any) => getStatusDisplay(record.status)
      },
      {
        accessor: 'created_at',
        title: t`Created Date`
      },
      {
        accessor: 'lead_id',
        title: t`Lead`,
        render: (record: any) => getLeadNameById(record.lead_id)
      },
      {
        accessor: 'due_date',
        title: t`Due Date`
      }
    ];
  }, [invoices]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {newInvoice.modal}
      <InvenTreeTable
        url="" // Remove the API URL since we're passing filtered data manually
        tableState={table}
        columns={tableColumns}
        tableData={invoices} // Pass only paid invoices here
        props={{
          params: {
            part: partId,
            customer: customerId
          },
          tableFilters: tableFilters,
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

function getLeadNameById(leadId: number | string): string {
  // Implement the logic to get the lead name by ID
  // This is a placeholder implementation
  return `Lead ${leadId}`;
}