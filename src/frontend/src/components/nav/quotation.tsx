// import { useState, useEffect } from 'react';
// import { FiX } from "react-icons/fi"; // X for cancel
// import { t } from '@lingui/macro';
// import Select from 'react-select';
// import './Quotation.css'; // Import the CSS file
// import { ApiEndpoints } from '../../enums/ApiEndpoints';

// const Quotation = ({ onClose }: { onClose: () => void }) => {
//   const [leadId, setLeadId] = useState('');
//   const [itemId, setItemId] = useState('');
//   const [discount, setDiscount] = useState('');
//   const [tax, setTax] = useState('');
//   const [status, setStatus] = useState('draft');
//   const [responseMessage, setResponseMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   interface Lead {
//     id: number;
//     name: string;
//   }

//   interface Part {
//     id: number;
//     name: string;
//   }

//   const [leads, setLeads] = useState<Lead[]>([]);
//   const [parts, setParts] = useState<Part[]>([]);

//   useEffect(() => {
//     document.title = 'Quotation';
//     fetchLeads();
//     fetchParts();
//   }, []);

//   const fetchLeads = async () => {
//     try {
//       const response = await fetch(ApiEndpoints.leads);
//       const result = await response.json();
//       if (response.ok) {
//         setLeads(result);
//       } else {
//         console.error('Failed to fetch leads:', result.error);
//       }
//     } catch (error) {
//       console.error('Error fetching leads:', error);
//     }
//   };

//   const fetchParts = async () => {
//     try {
//       const response = await fetch(ApiEndpoints.parts);
//       const result = await response.json();
//       if (response.ok) {
//         setParts(result);
//       } else {
//         console.error('Failed to fetch parts:', result.error);
//       }
//     } catch (error) {
//       console.error('Error fetching parts:', error);
//     }
//   };

//   const handleLeadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setLeadId(e.target.value);
//   };

//   const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setItemId(e.target.value);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const data = {
//       lead_id: leadId,
//       item_id: itemId,
//       discount,
//       tax,
//       status,
//     };

//     try {
//       setLoading(true);
//       const response = await fetch(ApiEndpoints.quotations, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       const result = await response.json();
//       if (response.ok) {
//         setResponseMessage(result.message || 'Quotation created successfully!');
//         onClose(); // Close the form after submission
//       } else {
//         setResponseMessage(result.error || 'An error occurred.');
//       }
//     } catch (error) {
//       console.error('Error creating quotation:', error);
//       setResponseMessage('Please Enter Valid Data !');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="quotation-form-overlay">
//       <div className="quotation-form-container">
//         <button type="button" className="close-form-button" onClick={onClose}>
//           <FiX />
//         </button>
//         <h2>{t`Create Quotation`}</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>
//               {t`Lead`}:
//               <select value={leadId} onChange={handleLeadChange} required>
//                 <option value="">{t`Select a Lead`}</option>
//                 {leads.map((lead) => (
//                   <option key={lead.id} value={String(lead.id)}>
//                     {lead.id}
//                   </option>
//                 ))}
//               </select>
//             </label>
//           </div>
//           <div className="form-group">
//             <label>
//               {t`Item`}:
//               <select value={itemId} onChange={handleItemChange} required>
//                 <option value="">{t`Select an Item`}</option>
//                 {parts.map((part) => (
//                   <option key={part.id} value={String(part.id)}>
//                     {part.name}
//                   </option>
//                 ))}
//               </select>
//             </label>
//           </div>
//           <div className="form-group">
//             <label>
//               {t`Discount`}:
//               <input
//                 type="number"
//                 value={discount}
//                 onChange={(e) => setDiscount(e.target.value)}
//                 required
//               />
//             </label>
//           </div>
//           <div className="form-group">
//             <label>
//               {t`Tax`}:
//               <input
//                 type="number"
//                 value={tax}
//                 onChange={(e) => setTax(e.target.value)}
//                 required
//               />
//             </label>
//           </div>
//           <div className="form-group">
//             <label>
//               {t`Status`}:
//               <select value={status} onChange={(e) => setStatus(e.target.value)} required>
//                 <option value="draft">{t`Draft`}</option>
//                 <option value="sent">{t`Sent`}</option>
//                 <option value="accepted">{t`Accepted`}</option>
//                 <option value="rejected">{t`Rejected`}</option>
//               </select>
//             </label>
//           </div>
//           <button type="submit" disabled={loading}>
//             {loading ? t`Submitting...` : t`Create Quotation`}
//           </button>
//         </form>
//         {responseMessage && <p>{responseMessage}</p>}
//       </div>
//     </div>
//   );
// };

// export default Quotation;


// import { useState, useEffect } from 'react';
// import { FiX } from "react-icons/fi"; // X for cancel
// import { t } from '@lingui/macro';
// import Select from 'react-select';
// import './Quotation.css'; // Import the CSS file
// import { ApiEndpoints } from '../../enums/ApiEndpoints';

// const Quotation = ({ onClose }: { onClose: () => void }) => {
//   const [leadId, setLeadId] = useState('');
//   const [items, setItems] = useState<{ id: number; name: string; price: number; tax: number }[]>([]);
//   const [discount, setDiscount] = useState('');
//   const [tax, setTax] = useState('');
//   const [status, setStatus] = useState('draft');
//   const [responseMessage, setResponseMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   interface Lead {
//     id: number;
//     name: string;
//   }

//   interface Part {
//     id: number;
//     name: string;
//     price: number;
//     tax: number;
//   }

//   const [leads, setLeads] = useState<Lead[]>([]);
//   const [parts, setParts] = useState<Part[]>([]);

//   useEffect(() => {
//     document.title = 'Quotation';
//     fetchLeads();
//     fetchParts();
//   }, []);

//   const fetchLeads = async () => {
//     try {
//       const response = await fetch(ApiEndpoints.leads);
//       const result = await response.json();
//       if (response.ok) {
//         setLeads(result);
//       } else {
//         console.error('Failed to fetch leads:', result.error);
//       }
//     } catch (error) {
//       console.error('Error fetching leads:', error);
//     }
//   };

//   const fetchParts = async () => {
//     try {
//       const response = await fetch(ApiEndpoints.parts);
//       const result = await response.json();
//       if (response.ok) {
//         setParts(result);
//       } else {
//         console.error('Failed to fetch parts:', result.error);
//       }
//     } catch (error) {
//       console.error('Error fetching parts:', error);
//     }
//   };

//   const handleLeadChange = (selectedOption: any) => {
//     setLeadId(selectedOption ? selectedOption.value : '');
//   };

//   const handleItemChange = (selectedOptions: any) => {
//     setItems(selectedOptions ? selectedOptions.map((option: any) => {
//       const part = parts.find(p => p.id === option.value);
//       return { id: option.value, name: option.label, price: part?.price || 0, tax: part?.tax || 0 };
//     }) : []);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const data = {
//       lead_id: leadId,
//       items: items.map(item => ({ part_id: item.id, item_name: item.name, price: item.price, tax: item.tax })),
//       discount,
//       tax,
//       status,
//     };

//     try {
//       setLoading(true);
//       const response = await fetch(ApiEndpoints.quotations, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       const result = await response.json();
//       if (response.ok) {
//         setResponseMessage(result.message || 'Quotation created successfully!');
//         onClose(); // Close the form after submission
//       } else {
//         setResponseMessage(result.error || 'An error occurred.');
//       }
//     } catch (error) {
//       console.error('Error creating quotation:', error);
//       setResponseMessage('Please Enter Valid Data !');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const leadOptions = leads.map((lead) => ({
//     value: lead.id,
//     label: `${lead.id} - ${lead.name}`
//   }));

//   const partOptions = parts.map((part) => ({
//     value: part.id,
//     label: part.name
//   }));

//   return (
//     <div className="quotation-form-overlay">
//       <div className="quotation-form-container">
//         <button type="button" className="close-form-button" onClick={onClose}>
//           <FiX />
//         </button>
//         <h2>{t`Create Quotation`}</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
// <label>
//               {t`Lead`}:
//               <Select
//                 value={leadOptions.find(option => option.value === Number(leadId))}
//                 onChange={handleLeadChange}
//                 options={leadOptions}
//                 isClearable
//                 placeholder={t`Select a Lead`}
//               />
//             </label>
//           </div>
//           <div className="form-group">
//             {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
// <label>
//               {t`Items`}:
//               <Select
//                 isMulti
//                 value={items.map(item => ({ value: item.id, label: item.name }))}
//                 onChange={handleItemChange}
//                 options={partOptions}
//                 isClearable
//                 placeholder={t`Select Items`}
//               />
//             </label>
//           </div>
//           <div className="form-group">
//             <label>
//               {t`Discount`}:
//               <input
//                 type="number"
//                 value={discount}
//                 onChange={(e) => setDiscount(e.target.value)}
//                 required
//               />
//             </label>
//           </div>
//           <div className="form-group">
//             <label>
//               {t`Tax`}:
//               <input
//                 type="number"
//                 value={tax}
//                 onChange={(e) => setTax(e.target.value)}
//                 required
//               />
//             </label>
//           </div>
//           <div className="form-group">
//             <label>
//               {t`Status`}:
//               <select value={status} onChange={(e) => setStatus(e.target.value)} required>
//                 <option value="draft">{t`Draft`}</option>
//                 <option value="sent">{t`Sent`}</option>
//                 <option value="accepted">{t`Accepted`}</option>
//                 <option value="rejected">{t`Rejected`}</option>
//               </select>
//             </label>
//           </div>
//           <button type="submit" disabled={loading}>
//             {loading ? t`Submitting...` : t`Create Quotation`}
//           </button>
//         </form>
//         {responseMessage && <p>{responseMessage}</p>}
//         <div className="table-container">
//           <table>
//             <thead>
//               <tr>
//                 <th>{t`Part ID`}</th>
//                 <th>{t`Name`}</th>
//                 <th>{t`Price`}</th>
//                 <th>{t`Tax`}</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map(item => (
//                 <tr key={item.id}>
//                   <td>{item.id}</td>
//                   <td>{item.name}</td>
//                   <td>{item.price}</td>
//                   <td>{item.tax}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Quotation;



import { useState, useEffect } from 'react';
import { FiX } from "react-icons/fi"; // X for cancel
import { t } from '@lingui/macro';
import Select from 'react-select';
import './Quotation.css'; // Import the CSS file
import { ApiEndpoints } from '../../enums/ApiEndpoints';

const Quotation = ({ onClose }: { onClose: () => void }) => {
  const [leadId, setLeadId] = useState('');
  const [items, setItems] = useState<{ id: number; name: string; price: number; tax: number; quantity: number }[]>([]);
  const [discount, setDiscount] = useState('');
  const [tax, setTax] = useState('');
  const [status, setStatus] = useState('draft');
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);

  interface Lead {
    id: number;
    name: string;
  }

  interface Part {
    id: number;
    name: string;
    price: number;
    tax: number;
  }

  const [leads, setLeads] = useState<Lead[]>([]);
  const [parts, setParts] = useState<Part[]>([]);

  useEffect(() => {
    document.title = 'Quotation';
    fetchLeads();
    fetchParts();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch(ApiEndpoints.leads);
      const result = await response.json();
      if (response.ok) {
        setLeads(result);
      } else {
        console.error('Failed to fetch leads:', result.error);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  const fetchParts = async () => {
    try {
      const response = await fetch(ApiEndpoints.parts);
      const result = await response.json();
      if (response.ok) {
        setParts(result);
      } else {
        console.error('Failed to fetch parts:', result.error);
      }
    } catch (error) {
      console.error('Error fetching parts:', error);
    }
  };

  const handleLeadChange = (selectedOption: any) => {
    setLeadId(selectedOption ? selectedOption.value : '');
  };

  const handleItemChange = (selectedOptions: any) => {
    setItems(selectedOptions ? selectedOptions.map((option: any) => {
      const part = parts.find(p => p.id === option.value);
      return { id: option.value, name: option.label, price: part?.price || 0, tax: part?.tax || 0, quantity: 1 };
    }) : []);
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const newItems = [...items];
    newItems[index].quantity = quantity;
    setItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      lead_id: leadId,
      items: items.map(item => ({ item_name: item.name, price: item.price, tax: item.tax, quantity: item.quantity })),
      discount,
      tax,
      status,
    };

    try {
      setLoading(true);
      const response = await fetch(ApiEndpoints.quotations, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setResponseMessage(result.message || 'Quotation created successfully!');
        onClose(); // Close the form after submission
      } else {
        setResponseMessage(result.error || 'An error occurred.');
      }
    } catch (error) {
      console.error('Error creating quotation:', error);
      setResponseMessage('Please Enter Valid Data !');
    } finally {
      setLoading(false);
    }
  };

  const leadOptions = leads.map((lead) => ({
    value: lead.id,
    label: `${lead.id} - ${lead.name}`
  }));

  const partOptions = parts.map((part) => ({
    value: part.id,
    label: part.name
  }));

  return (
    <div className="quotation-form-overlay">
      <div className="quotation-form-container">
        <button type="button" className="close-form-button" onClick={onClose}>
          <FiX />
        </button>
        <h2>{t`Create Quotation`}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
<label>
              {t`Lead`}:
              <Select
                value={leadOptions.find(option => option.value === Number(leadId))}
                onChange={handleLeadChange}
                options={leadOptions}
                isClearable
                placeholder={t`Select a Lead`}
              />
            </label>
          </div>
          <div className="form-group">
            {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
<label>
              {t`Items`}:
              <Select
                isMulti
                value={items.map(item => ({ value: item.id, label: item.name }))}
                onChange={handleItemChange}
                options={partOptions}
                isClearable
                placeholder={t`Select Items`}
              />
            </label>
          </div>
          {items.map((item, index) => (
            <div key={item.id} className="form-group">
              <label>
                {t`Quantity`}:
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                  required
                />
              </label>
            </div>
          ))}
          <div className="form-group">
            <label>
              {t`Discount`}:
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              {t`Tax`}:
              <input
                type="number"
                value={tax}
                onChange={(e) => setTax(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              {t`Status`}:
              <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                <option value="draft">{t`Draft`}</option>
                <option value="sent">{t`Sent`}</option>
                <option value="accepted">{t`Accepted`}</option>
                <option value="rejected">{t`Rejected`}</option>
              </select>
            </label>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? t`Submitting...` : t`Create Quotation`}
          </button>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>{t`Name`}</th>
                <th>{t`Price`}</th>
                <th>{t`Tax`}</th>
                <th>{t`Quantity`}</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.tax}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Quotation;