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

// // export function InvoiceTable({
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
// //     fields: Object.fromEntries(invoiceFields.map(field => [field.name, field])),
// //     initialData: {
// //       customer: customerId
// //     },
// //     follow: true,
// //     modelType: ModelType.invoice
// //   });
// // console.log("invoice table rendered...")
// //   const tableActions = useMemo(() => {
// //     return [
// //       <AddItemButton
// //         key='add-invoice'
// //         tooltip={t`Add Invoice`}
// //         onClick={() => {
// //           console.log("Add Invoice Order button clicked...");
// //           newInvoice.open();
// //         }}
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

// // function getStatusDisplay(status: any): any {
// //     throw new Error('Function not implemented.');
// // }
// // function getLeadNameById(lead_id: any): any {
// //     throw new Error('Function not implemented.');
// // }






// import { t } from '@lingui/macro';
// import { useMemo } from 'react';

// import { AddItemButton } from '../../components/buttons/AddItemButton';
// import { Thumbnail } from '../../components/images/Thumbnail';
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
//   CreatedByColumn,
//   CreationDateColumn,
//   DescriptionColumn,
//   ProjectCodeColumn,
//   ReferenceColumn,
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

// export function InvoiceTable({
//   partId,
//   customerId
// }: Readonly<{
//   partId?: number;
//   customerId?: number;
// }>) {
//   const table = useTable(!!partId ? 'invoices-part' : 'invoices-index');
//   const user = useUserState();

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
//       PaidStatusFilter() // Add the new filter here
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
//   console.log("Invoice Table Rendered from InvenTree\src\frontend\src\tables\invoice\InvoicesTable.tsx")
//   const newInvoice = useCreateApiFormModal({
//     url: ApiEndpoints.invoice_list,
//     title: t`Add Invoice`,
//     fields: Object.fromEntries(invoiceFields.map(field => [field.name, field])),
//     initialData: {
//       customer: customerId
//     },
//     follow: true,
//     modelType: ModelType.invoice
//   });
// console.log("invoice table rendered...")
//   const tableActions = useMemo(() => {
//     return [
//       <AddItemButton
//         key='add-invoice'
//         tooltip={t`Add Invoice`}
//         onClick={() => {
//           console.log("Add Invoice Order button clicked...");
//           newInvoice.open();
//         }}
//         hidden={!user.hasAddRole(UserRoles.invoice)}
//       />
//     ];
//   }, [user]);



//   const tableColumns = useMemo(() => {
//     return [
//       ReferenceColumn({}),
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
//       {
//         accessor: 'amount_due',
//         title: t`Amount Due`,
//         render: (record: any) => formatCurrency(record.amount_due)
//       },
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
//         title: t`Lead`,
//         render: (record: any) => getLeadNameById(record.lead_id)
//       },
//       {
//         accessor: 'due_date',
//         title: t`Due Date`
//       }
//     ];
//   }, []);

//   return (
//     <>
//       {newInvoice.modal}
//       <InvenTreeTable
//         url={apiUrl(ApiEndpoints.invoice_list)}
//         tableState={table}
//         columns={tableColumns}
//         props={{
//           params: {
//             part: partId,
//             customer: customerId,
//             customer_detail: true
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

// function getStatusDisplay(status: any): any {
//     throw new Error('Function not implemented.');
// }
// function getLeadNameById(lead_id: any): any {
//     throw new Error('Function not implemented.');
// }


import { t } from '@lingui/macro';
import { useMemo } from 'react';
import { AddItemButton } from '../../components/buttons/AddItemButton';
import { formatCurrency } from '../../defaults/formatters';
import { ApiEndpoints } from '../../enums/ApiEndpoints';
import { ModelType } from '../../enums/ModelType';
import { UserRoles } from '../../enums/Roles';
import { useInvoiceFields } from '../../forms/InvoicesForms';
import { useOwnerFilters, useProjectCodeFilters, useUserFilters } from '../../hooks/UseFilter';
import { useCreateApiFormModal } from '../../hooks/UseForm';
import { useTable } from '../../hooks/UseTable';
import { apiUrl } from '../../states/ApiState';
import { useUserState } from '../../states/UserState';
import { ReferenceColumn } from '../ColumnRenderers';
import { InvenTreeTable } from '../InvenTreeTable';
import { getTableFilters } from './filters';

// Add interface for Invoice
interface Invoice {
    id: number;
    quotation_number: string;
    invoice_number: string;
    total_amount: number;
    paid_amount: number;
    amount_due: number;
    status: 'paid' | 'partially_paid' | 'unpaid';
    created_at: string;
    lead_id: number;
    due_date: string;
}

// Add utility functions
function getStatusDisplay(status: string): string {
    switch (status) {
        case 'partially_paid':
            return t`Partially Paid`;
        case 'paid':
            return t`Paid`;
        case 'unpaid':
            return t`Unpaid`;
        default:
            return status;
    }
}

function getLeadNameById(leadId: number): string {
    return `Lead ${leadId}`;
}

export function InvoiceTable({
    partId,
    customerId
}: Readonly<{
    partId?: number;
    customerId?: number;
}>) {
    const table = useTable(!!partId ? 'invoices-part' : 'invoices-index');
    const user = useUserState();
    const invoiceFields = useInvoiceFields();

    const projectCodeFilters = useProjectCodeFilters();
    const responsibleFilters = useOwnerFilters();
    const createdByFilters = useUserFilters();

    // Table filters
    const tableFilters = useMemo(() => {
        const filters = [
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
            PaidStatusFilter()
        ].map((filter, index) => ({ ...filter, key: `invoice-filter-${index}` }));

        if (!!partId) {
            filters.push({
                name: 'include_variants',
                type: 'boolean',
                label: t`Include Variants`,
                description: t`Include orders for part variants`,
                key: 'include-variants'
            });
        }

        return filters;
    }, [partId, projectCodeFilters.choices, responsibleFilters.choices, createdByFilters.choices]);

    // Modal handling
    const newInvoice = useCreateApiFormModal({
        url: ApiEndpoints.invoice_list,
        title: t`Add Invoice`,
        fields: Object.fromEntries(invoiceFields.map(field => [field.name, field])),
        initialData: { customer: customerId },
        follow: true,
        modelType: ModelType.invoice
    });

    // Table actions
    const tableActions = useMemo(() => [
        <AddItemButton
            key="add-invoice-button"
            tooltip={t`Add Invoice`}
            onClick={() => {
                console.log("Add Invoice Order button clicked...");
                newInvoice.open();
            }}
            hidden={!user.hasAddRole(UserRoles.invoice)}
        />
    ], [user, newInvoice]);

    // Table columns
    const tableColumns = useMemo(() => [
        {
            ...ReferenceColumn({}),
            key: 'reference'
        },
        {
            accessor: 'quotation_number',
            title: t`Quotation Number`,
            key: 'quotation_number'
        },
        {
            accessor: 'invoice_number',
            title: t`Invoice Number`,
            key: 'invoice_number'
        },
        {
            accessor: 'total_amount',
            title: t`Total Amount`,
            render: (record: Invoice) => formatCurrency(record.total_amount),
            key: 'total_amount'
        },
        {
            accessor: 'paid_amount',
            title: t`Paid Amount`,
            render: (record: Invoice) => formatCurrency(record.paid_amount),
            key: 'paid_amount'
        },
        {
            accessor: 'amount_due',
            title: t`Amount Due`,
            render: (record: Invoice) => formatCurrency(record.amount_due),
            key: 'amount_due'
        },
        {
            accessor: 'status',
            title: t`Status`,
            render: (record: Invoice) => getStatusDisplay(record.status),
            key: 'status'
        },
        {
            accessor: 'created_at',
            title: t`Created Date`,
            key: 'created_at'
        },
        {
            accessor: 'lead_id',
            title: t`Lead`,
            render: (record: Invoice) => getLeadNameById(record.lead_id),
            key: 'lead_id'
        },
        {
            accessor: 'due_date',
            title: t`Due Date`,
            key: 'due_date'
        }
    ], []);

    return (
        <>
            {newInvoice.modal}
            <InvenTreeTable
                url={apiUrl(ApiEndpoints.invoice_list)}
                tableState={table}
                columns={tableColumns}
                props={{
                    params: {
                        part: partId,
                        customer: customerId,
                        customer_detail: true
                    },
                    tableFilters,
                    tableActions,
                    modelType: ModelType.invoice,
                    enableSelection: true,
                    enableDownload: true,
                    enableReports: true
                }}
            />
        </>
    );
}