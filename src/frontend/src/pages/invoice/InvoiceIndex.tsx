import { Suspense, lazy } from 'react';
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