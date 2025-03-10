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
  const [parts, setParts] = useState<{ id: number; name: string; price: number; quantity: number; total: number }[]>([]);
  const [selectedPart, setSelectedPart] = useState<{ value: number; label: string } | null>(null);
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
  }

  const [leads, setLeads] = useState<Lead[]>([]);
  const [availableParts, setAvailableParts] = useState<Part[]>([]);

  useEffect(() => {
    document.title = 'Quotation';
    fetchLeads();
    fetchAvailableParts();
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

  const fetchAvailableParts = async () => {
    try {
      const response = await fetch(ApiEndpoints.parts);
      const result = await response.json();
      if (response.ok) {
        setAvailableParts(result);
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



  // const handlePartChange = (selectedOptions: any) => {
  //   console.log("Selected Options:", selectedOptions);
  //   console.log("Available Parts:", availableParts);
  
  //   const newParts = selectedOptions.map((option: any) => {
  //     const partDetails = availableParts.find(part => part.name === option.label); 
  
  //     console.log("Matching Part Details:", partDetails);
  
  //     return { 
  //       id: option.value,  
  //       name: option.label, 
  //       price: partDetails ? partDetails.price : 0,  
  //       quantity: 1, 
  //       total: partDetails ? partDetails.price : 0  
  //     };
  //   });
  
  //   setParts(newParts);
  //   updateTotalAmount(newParts);
  // };


  // const handlePartChange = (selectedOption: any) => {
  //   // Return early if nothing is selected
  //   if (!selectedOption) return;
    
  //   // Find the part details for the selected option
  //   const partDetails = availableParts.find(part => part.id === selectedOption.value);
    
  //   // Create the new part object
  //   const newPart = {
  //     id: selectedOption.value,
  //     name: selectedOption.label,
  //     price: partDetails ? partDetails.price : 0,
  //     quantity: 1,
  //     total: partDetails ? partDetails.price : 0
  //   };
    
  //   // Add this new part to the existing parts array
  //   const updatedParts = [...parts, newPart];
    
  //   // Update state
  //   setParts(updatedParts);
  //   updateTotalAmount(updatedParts);
    
  //   // Reset the select input by setting its value to null
  //   // You'll need to track this in a separate state
  //   setSelectedPart(null);
  // };
  
  // const handlePartChange = (selectedOption: any) => {
  //   if (!selectedOption) return;
    
  //   const partDetails = availableParts.find(part => part.name === selectedOption.label);
    
  //   // Check if this part is already in the parts array using name
  //   const existingPartIndex = parts.findIndex(part => part.name === selectedOption.label);
    
  //   let updatedParts;
    
  //   if (existingPartIndex >= 0) {
  //     // Part already exists, increase its quantity by 1
  //     updatedParts = [...parts];
  //     updatedParts[existingPartIndex].quantity += 1;
  //     updatedParts[existingPartIndex].total = updatedParts[existingPartIndex].quantity * updatedParts[existingPartIndex].price;
  //   } else {
  //     // Part doesn't exist, add it with quantity 1
  //     const newPart = {
  //       id: selectedOption.value,
  //       name: selectedOption.label, // Using the name from the selection
  //       price: partDetails ? partDetails.price : 0,
  //       quantity: 1,
  //       total: partDetails ? partDetails.price : 0
  //     };
  //     updatedParts = [...parts, newPart];
  //   }
    
  //   setParts(updatedParts);
  //   updateTotalAmount(updatedParts);
  //   setSelectedPart(null);
  // };
  
  const handlePartChange = (selectedOption: any) => {
    if (!selectedOption) return;

    console.log("Selected Option:", selectedOption);
    console.log("Available Parts Before Filtering:", availableParts);

    // Find the selected part details
    const partDetails = availableParts.find(part => part.name === selectedOption.label);

    console.log("Matching Part Details:", partDetails);

    if (!partDetails) return;

    // Create the new part object
    const newPart = {
        id: selectedOption.value,
        name: selectedOption.label,
        price: partDetails.price,
        quantity: 1,
        total: partDetails.price
    };

    // Update the selected parts list
    setParts(prevParts => [...prevParts, newPart]);

    // // Filter out the selected part from the available parts list
    // const updatedAvailableParts = availableParts.filter(part => part.name !== selectedOption.label);
    // setAvailableParts(updatedAvailableParts);

    // Reset the search field (if needed)
    setSelectedPart(null); // Assuming you have state to control selected option

    updateTotalAmount([...parts, newPart]);
};



  // Update quantity control functions to use name instead of ID
  const increaseQuantity = (partName: string) => {
    const updatedParts = parts.map(part => {
      if (part.name === partName) {
        const newQuantity = part.quantity + 1;
        return {
          ...part,
          quantity: newQuantity,
          total: newQuantity * part.price
        };
      }
      return part;
    });
    
    setParts(updatedParts);
    updateTotalAmount(updatedParts);
  };
  
  const decreaseQuantity = (part_name: string) => {
    const updatedParts = parts.map(part => {
      if (part.name === part_name) {
        const newQuantity = Math.max(0, part.quantity - 1);
        return {
          ...part,
          quantity: newQuantity,
          total: newQuantity * part.price
        };
      }
      return part;
    });
    
    // Filter out parts with quantity 0
    const filteredParts = updatedParts.filter(part => part.quantity > 0);
    
    setParts(filteredParts);
    updateTotalAmount(filteredParts);
  };
  
  const removePart = (part_name: string) => {
    const updatedParts = parts.filter(part => part.name !== part_name);
    setParts(updatedParts);
    updateTotalAmount(updatedParts);
  };



  
  
  const handleQuantityChange = (index: number, quantity: number) => {
    const newParts = [...parts];
    newParts[index].quantity = quantity;
    newParts[index].total = newParts[index].price * quantity;
    setParts(newParts);
    updateTotalAmount();
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscount(e.target.value);
    updateTotalAmount();
  };

  const handleTaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTax(e.target.value);
    updateTotalAmount();
  };




  const updateTotalAmount = (updatedParts = parts) => {
    // const discountValue = Number.parseFloat(discount) / 100 || 0;
    // const taxValue = Number.parseFloat(tax) / 100 || 0;

    const discountValue = (Number.parseFloat(discount) || 0) / 100;
    const taxValue = (Number.parseFloat(tax) || 0) / 100;

    const newParts = updatedParts.map(part => {
      const total = part.price * part.quantity;
      const discountedTotal = discountValue ? total - (total * discountValue) : total;
      const taxedTotal = discountedTotal + (discountedTotal * taxValue);
      return { ...part, total: taxedTotal };
    });

    setParts(newParts);
  };

  useEffect(() => {
    updateTotalAmount(parts);
  }, [discount, tax]); // This runs whenever discount or tax changes
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      lead_id: leadId,
      parts: parts.map(part => ({ part_name: part.name, quantity: part.quantity, price: part.price, total: part.total })),
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
        setParts(result.parts); // Update parts with the response data
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

  const partOptions = availableParts.map((part) => ({
    value: part.id,
    label: part.name
  }));

  return (
    <div className="quotation-form-overlay">
      <div className="quotation-form-container">
        <button id='abc' type="button" className="close-form-button" onClick={onClose}>
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
{t`Parts`}:
<Select
  value={selectedPart}
  onChange={handlePartChange}
  options={partOptions}
  isClearable
  placeholder={t`Select Parts`}
/>
            </label>
          </div>

          <div className="form-group">
            <label>
              {t`Discount`}:
              <input
                type="number"
                value={discount}
                onChange={handleDiscountChange}
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
                onChange={handleTaxChange}
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
        <div className="table-wrapper">

          <table>
            <thead>
              <tr>
                <th>{t`Name`}</th>
                <th>{t`Price`}</th>
                <th>{t`Quantity`}</th>
                <th>{t`Total`}</th>
                <th>{t`Action`}</th>

              </tr>
            </thead>
            <tbody>
              {parts.map(part => (
                <tr key={part.id || part.name}>
                  <td>{part.name}</td>
                  <td>{part.price.toFixed(2)}</td>
                  <td>
                    <div className="quantity-control">
                    <button className="quantity-button" onClick={() => decreaseQuantity(part.name)}>-</button>
                    <span>{part.quantity}</span>
                    <button className="quantity-button" onClick={() => increaseQuantity(part.name)}>+</button>
                    </div>
                  </td>
                  <td>{part.total.toFixed(2)}</td>
                  <td>
                  <button className="delete-button" onClick={() => removePart(part.name)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
    );
  };

export default Quotation;
