import { Stack } from '@mantine/core';
import { useMemo } from 'react';
import { t } from '@lingui/macro';
import { IconBuildingStore, IconTruckDelivery, IconTruckReturn, IconFileInvoice } from '@tabler/icons-react';

import PermissionDenied from '../../components/errors/PermissionDenied';
import { PageDetail } from '../../components/nav/PageDetail';
import { PanelGroup } from '../../components/panels/PanelGroup';
import { UserRoles } from '../../enums/Roles';
import { useUserState } from '../../states/UserState';
import { PaidInvoiceTable } from '../../tables/invoice/PaidInvoice';
import { PartialPaidInvoiceTable } from '../../tables/invoice/PartialPaid';
import { UnPaidInvoiceTable } from '../../tables/invoice/UnPaidInvoice';
import Invoice from './Invoice'; // Import the Invoice component as a default import

export default function InvoiceIndex() {
  const user = useUserState();

  // Define the panels
  const panels = useMemo(() => {
    return [
      {
        name: 'paidinvoice',
        label: t`Paid Invoices`,
        icon: <IconFileInvoice />,
        content: <PaidInvoiceTable />,
        hidden: !user.hasViewRole(UserRoles.sales_order),
      },
      {
        name: 'partiallypaidinvoice',
        label: t`Partially Paid Invoices`,
        icon: <IconFileInvoice />,
        content: <PartialPaidInvoiceTable />,
        
        hidden: !user.hasViewRole(UserRoles.return_order),
      },
      {
        name: 'unpaidinvoice',
        label: t`Unpaid Invoices`,
        icon: <IconFileInvoice />,
        content: <UnPaidInvoiceTable />,
      },
    //   {
    //     name: 'invoices',
    //     label: t`Invoices`,
    //     icon: <IconFileInvoice />,
    //     content: <Invoice />,  // Make sure this renders the Invoice component
    //     hidden: !user.hasViewRole(UserRoles.invoice),
    //   },
    ];
  }, [user]);

  // Ensure the user has permission to access this page
  if (!user.isLoggedIn() || !user.hasViewRole(UserRoles.sales_order)) {
    return <PermissionDenied />;
  }

  // Render the page with the panels
  return (
    <Stack>
      <PageDetail title={t`Invoice`} />
      <PanelGroup
        pageKey="sales-index"
        panels={panels}
        model={'sales'}
        id={null}
      />
    </Stack>
  );
}
