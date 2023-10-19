import React, { useEffect, useState } from 'react';
import Adminnavbar from '../Adminnav/Adminnavbar';
import axios from '../../../axios';

function Transaction() {
  const [Transaction, setTransaction] = useState([]);
  const [refreshData, setRefreshData] = useState(false); // State to trigger data refresh

  console.log(Transaction);
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/payments');
        setTransaction(response.data.paymentlist);
        console.log(setTransaction)
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };
    fetchUserData();
  }, [refreshData]);


  const handlePayClick = (amount, vendorId,course_id,checkout_session_id) => {
    const paymentData = {
      amount: Math.round(amount * 0.9), // Send 90% of the amount
      vendorId,
      course_id,
      checkout_session_id // Send the vendor ID
    };
    
    console.log(paymentData)

    // Send paymentData to your backend using Axios
    axios.post('/paymentvendor', paymentData)
      .then(response => {
        // Handle the response from the backend if needed
        console.log('Payment successful', response);
        setRefreshData(true);

      })
      .catch(error => {
        // Handle any errors from the backend
        console.error('Error making payment', error);
      });
  };





  return (
    <div className='bg-[#1F2A40] h-screen'>
      <Adminnavbar />

      <div className='md:p-8 p-2'>
        <div className="relative overflow-x-auto rounded-md">
          <table className="w-full text-sm text-left text-white">
            <thead className="text-xs text-white uppercase bg-[#141B2D]">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SI No test
                </th>
                <th scope="col" className="px-6 py-3">
                  Pyment id
                </th>
              
                <th scope="col" className="px-6 py-3">
                  User Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Vendor Name
                </th>
                <th scope="col" className="px-6 py-3">
                  (v) Acount Number 
                </th>
                <th scope="col" className="px-6 py-3">
                  IFSC
                </th>
                <th scope="col" className="px-6 py-3">
                  Course Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Pay to Vendor
                </th>
              </tr>
            </thead>
            <tbody>
              {Transaction.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className="bg-[#141B2D] border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    {transaction.checkout_session_id}
                  </td>
                 
                  <td className="px-6 py-4">
                    {transaction.user}
                  </td>
                  <td className="px-6 py-4">
                    {transaction.vendor}
                  </td>
                  <td className="px-6 py-4">
                    {transaction.vendorbank
}
                  </td>
                  <td className="px-6 py-4">
                    {transaction.ifsc
}
                  </td>
                  <td className="px-6 py-4">
                    {transaction.course}
                  </td>
                  <td className="px-6 py-4">
                    {transaction.amount}
                  </td>
                  <td className="px-6 py-4">
                    {`${new Date(transaction.purchase_date).toLocaleDateString()}`}
                  </td>
                  <td className="px-6 py-4">
  {transaction.vendor_receive ? (
    // Show a green "Received" button if transaction.vendor_receive is true
    <button
      className="border border-red-700 text-white rounded px-4 py-2"
    >
      Received
    </button>
  ) : transaction.vendor_pay ? (
    // Show a green "Paid" button if transaction.vendor_pay is true
    <button
      className="bg-green-500 text-white rounded px-4 py-2"
    >
      Paid
    </button>
  ) : transaction.vendor_fail
  ? (
    // Show a green "Paid" button if transaction.vendor_pay is true
    <button
      className="bg-red-500 text-white rounded px-4 py-2"
      onClick={() => handlePayClick(transaction.amount, transaction.vendor_id, transaction.course_id, transaction.checkout_session_id)}
      >
      failed
    </button>
  ):
  
  
  
  
  (
    // Show the blue "Pay" button if both vendor_pay and vendor_receive are false
    <button
      className="bg-blue-500 text-white rounded px-4 py-2"
      onClick={() => handlePayClick(transaction.amount, transaction.vendor_id, transaction.course_id, transaction.checkout_session_id)}
    >
      Pay {Math.round(transaction.amount * 0.9)} {/* Display rounded amount */}
    </button>
  )}
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
