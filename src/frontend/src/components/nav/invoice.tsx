
import { useState, useEffect } from 'react';
import { FiX } from "react-icons/fi"; // X for cancel
import { t } from '@lingui/macro';
import './Invoice.css'; // Import the CSS file
import { ApiEndpoints } from '../../enums/ApiEndpoints';

const Invoice = ({ onClose }: { onClose: () => void }) => {
  const [quotationId, setQuotationId] = useState('');
  const [quotationNumber, setQuotationNumber] = useState(''); // Add state for quotation number
  const [leadId, setLeadId] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);

  interface Quotation {
    id: number;
    quotation_number: string;
    name: string;
    lead: number;
  }

  const [quotations, setQuotations] = useState<Quotation[]>([]);

  useEffect(() => {
    document.title = 'Invoice';
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    try {
      const response = await fetch(ApiEndpoints.quotations);
      const result = await response.json();
      if (response.ok) {
        setQuotations(result);
        console.log(result);
      } else {
        console.error('Failed to fetch quotations:', result.error);
      }
    } catch (error) {
      console.error('Error fetching quotations:', error);
    }
  };

  const handleQuotationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedQuotationNumber = e.target.value;
    setQuotationNumber(selectedQuotationNumber); // Update the quotation number state
    const selectedQuotation = quotations.find((q) => q.quotation_number === selectedQuotationNumber);
    setQuotationId(selectedQuotation ? String(selectedQuotation.id) : '');
    setLeadId(selectedQuotation ? String(selectedQuotation.lead) : '');
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    console.log("date",date);
    setDueDate(date);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const [year, month, day] = dueDate.split('-');
    const formattedDueDate = `${day}-${month}-${year}`; // Format the due date to dd-mm-yyyy for backend

    const data = {
      quotation_id: quotationId,
      lead_id: leadId,
      paid_amount: paidAmount,
      due_date: formattedDueDate, // Send due_date in dd-mm-yyyy format
    };
console.log("formatted data",data.due_date);
    try {
      setLoading(true);
      const response = await fetch(ApiEndpoints.invoices, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setResponseMessage(result.message || 'Invoice created successfully!');
        onClose(); // Close the form after submission
      } else {
        setResponseMessage(result.error || 'An error occurred.');
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
      setResponseMessage('Please Enter Valid Data !');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="invoice-form-overlay">
      <div className="invoice-form-container">
        <button type="button" className="close-form-button" onClick={onClose}>
          <FiX />
        </button>
        <h2>{t`Create Invoice`}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              {t`Quotation Number`}:
              <select value={quotationNumber} onChange={handleQuotationChange} required>
                <option value="">{t`Select a Quotation`}</option>
                {quotations.map((quotation) => (
                  <option key={quotation.id} value={quotation.quotation_number}>
                    {quotation.quotation_number}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-group">
            <label>
              {t`Lead ID`}:
              <input type="number" value={leadId} readOnly required />
            </label>
          </div>
          <div className="form-group">
            <label>
              {t`Paid Amount`}:
              <input
                type="number"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              {t`Due Date`}:
              <input
                type="date"
                value={dueDate}
                onChange={handleDueDateChange}
                required
              />
            </label>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? t`Submitting...` : t`Create Invoice`}
          </button>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
      </div>
    </div>
  );
};

export default Invoice;