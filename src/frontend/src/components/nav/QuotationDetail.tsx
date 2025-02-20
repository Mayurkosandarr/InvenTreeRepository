import { Stack } from '@mantine/core';
import { useMemo } from 'react';
import { t } from '@lingui/macro';
import { IconFileInvoice } from '@tabler/icons-react';

import PermissionDenied from '../../components/errors/PermissionDenied';
import { PageDetail } from '../../components/nav/PageDetail';
import { PanelGroup } from '../../components/panels/PanelGroup';
import { UserRoles } from '../../enums/Roles';
import { useUserState } from '../../states/UserState';
import  AcceptedQuotationTable  from '../../tables/quotation/AcceptedQuotation';
import  RejectedQuotationTable  from '../../tables/quotation/RejectedQuotation';
import  DraftQuotationTable  from '../../tables/quotation/DraftQuotation';
import  SentQuotationTable  from '../../tables/quotation/SentQuotation';

export default function QuotationIndex() {
  const user = useUserState();
  console.log("Quotation Index..... from QuotationDetail.tsx");

  // Define the panels
  const panels = useMemo(() => {
    return [
      {
        name: 'accepted-quotation',
        label: t`Accepted Quotations`,
        icon: <IconFileInvoice />,
        content: <AcceptedQuotationTable />,
        hidden: !user.hasViewRole(UserRoles.sales_order),
      },
      {
        name: 'rejected-quotation',
        label: t`Rejected Quotations`,
        icon: <IconFileInvoice />,
        content: <RejectedQuotationTable />,
        hidden: !user.hasViewRole(UserRoles.sales_order),
      },
      {
        name: 'draft-quotation',
        label: t`Draft Quotations`,
        icon: <IconFileInvoice />,
        content: <DraftQuotationTable />,
        hidden: !user.hasViewRole(UserRoles.sales_order),
      },

      {
        name: 'sent-quotation',
        label: t`Sent-Quotations`,
        icon: <IconFileInvoice />,
        content: <SentQuotationTable />,
        hidden: !user.hasViewRole(UserRoles.sales_order),
      }
    ];
  }, [user]);

  // Ensure the user has permission to access this page
  if (!user.isLoggedIn() || !user.hasViewRole(UserRoles.sales_order)) {
    return <PermissionDenied />;
  }

  // Render the page with the panels
  return (
    <Stack>
      <PageDetail title={t`Quotations`} />
      <PanelGroup
        pageKey="quotation-index"
        panels={panels}
        model={'quotation'}
        id={null}
      />
    </Stack>
  );
}