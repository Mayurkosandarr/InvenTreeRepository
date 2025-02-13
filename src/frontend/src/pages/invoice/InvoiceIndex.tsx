



// import { t } from '@lingui/macro';
// import { Stack } from '@mantine/core';
// import {
//   IconBuildingStore,
//   IconTruckDelivery,
//   IconTruckReturn
// } from '@tabler/icons-react';
// import { useMemo } from 'react';

// import PermissionDenied from '../../components/errors/PermissionDenied';
// import { PageDetail } from '../../components/nav/PageDetail';
// import { PanelGroup } from '../../components/panels/PanelGroup';
// import { UserRoles } from '../../enums/Roles';
// import { useUserState } from '../../states/UserState';
// import { CompanyTable } from '../../tables/company/CompanyTable';
// import { ReturnOrderTable } from '../../tables/sales/ReturnOrderTable';
// import { SalesOrderTable } from '../../tables/sales/SalesOrderTable';

// export default function SalesIndex() {
//   const user = useUserState();

//   const panels = useMemo(() => {
//     return [
  
//       {
//         name: 'invoices',
//         label: t`Invoices`,
//         icon: <IconTruckDelivery />,
//         content: <SalesOrderTable />,
//         hidden: !user.hasViewRole(UserRoles.sales_order)
//       },
//           {
//         name: 'returnorders',
//         label: t`Return Orders`,
//         icon: <IconTruckReturn />,
//         content: <ReturnOrderTable />,
//         hidden: !user.hasViewRole(UserRoles.return_order)
//       },
//       {
//         name: 'suppliers',
//         label: t`Customers`,
//         icon: <IconBuildingStore />,
//         content: (
//           <CompanyTable path='sales/customer' params={{ is_customer: true }} />
//         )
//       }
//     ];
//   }, [user]);

//   if (!user.isLoggedIn() || (!user.hasViewRole(UserRoles.sales_order) && !user.hasViewRole(UserRoles.return_order))) {
//     return <PermissionDenied />;
//   }

//   return (
//     <Stack>
//       <PageDetail title={t`Sales`} />
//       <PanelGroup
//         pageKey='sales-index'
//         panels={panels}
//         model={'sales'}
//         id={null}
        
//       />
//     </Stack>
//   );
// }

import React, { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

const PaidInvoiceTable = lazy(() => import('../../tables/invoice/PaidInvoice').then(module => ({ default: module.PaidInvoiceTable })));
const PartialPaidInvoiceTable = lazy(() => import('../../tables/invoice/PartialPaid').then(module => ({ default: module.PartialPaidInvoiceTable })));
const UnPaidInvoiceTable = lazy(() => import('../../tables/invoice/UnPaidInvoice').then(module => ({ default: module.UnPaidInvoiceTable })));

const InvoiceDetail = () => {
  const { id } = useParams();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaidInvoiceTable partId={id} />
      <PartialPaidInvoiceTable partId={id} />
      <UnPaidInvoiceTable partId={id} />
    </Suspense>
  );
};

export default InvoiceDetail;