import React, {useEffect, useState} from 'react';
import Vendornav from '../Vendornavbar/Vendornav';
import {useSelector, useDispatch} from 'react-redux';
import axios from '../../../axios';

function Payments() {
    const {isAuthenticated, username, userId, role} = useSelector((state) => state.user);

    const [payments, setPayments] = useState([]);
    console.log(payments)
    const [markPaymentReceived, setMarkPaymentReceived] = useState(false);


    useEffect(() => {
        const fetchPaymentData = async () => {
            try {
                const response = await axios.get(`/payments/${userId}/`);
                setPayments(response.data);
            } catch (error) {
                console.error('Error fetching payment data', error);
            }
        };

        fetchPaymentData();
    }, [userId, markPaymentReceived]);

    const handleReceivedClick = async (paymentId) => {
        console.log(paymentId);
        const payment_id = paymentId
        try {
            const response = await axios.post(`/received/${payment_id}/`);
            console.log('Payment marked as received', response.data);
            setMarkPaymentReceived(true);

            // Optionally, you can update the UI to reflect that the payment is received.
        } catch (error) {
            console.error('Error marking payment as received', error);
        }
    };

    const handleFailClick = async (paymentId) => {
        console.log(paymentId);
        const payment_id = paymentId
        try {
            const response = await axios.post(`/fail/${payment_id}/`);
            console.log('Payment fails as received', response.data);
            setMarkPaymentReceived(true);

            // Optionally, you can update the UI to reflect that the payment is received.
        } catch (error) {
            console.error('Error marking payment as received', error);
        }
    };

    
    return (
        <div>
            <Vendornav/>
            <div className='md:p-8 p-2 bg-[#1F2A40] h-screen'>
                <div class="flex mb-4">
                    <div class="w-full bg-[#1F2A40]">
                        <p className='md:text-3xl text-2xl md:pl-8 mt-2 text-white '>Admin Pyamnet History</p>
                        <p className=' md:pl-8 mt-2 text-white '>If you get the payment on bank accound the click the recive button</p>


                    </div>
                </div>
                <div className="relative overflow-x-auto rounded-md">
                    <table className="w-full text-sm text-left text-white">
                        <thead className="text-xs text-white uppercase bg-[#141B2D]">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    SI No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Course Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Amount
                                </th>
                                {/* <th scope="col" className="px-6 py-3">
                  Date
                </th> */}
                                <th scope="col" className="px-6 py-3">
                                    Pay to Vendor
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Rise Issue
                                </th>
                            </tr>
                        </thead>
                        <tbody> {
                            payments.map((payment, index) => (
                                <tr className="bg-[#141B2D] border-b dark:bg-gray-800 dark:border-gray-700"
                                    key={
                                        payment.id
                                }>
                                    <td className="px-6 py-4">
                                        {
                                        index + 1
                                    }</td>
                                    <td className="px-6 py-4">
                                        {
                                        payment.course_name
                                    }</td>
                                    <td className="px-6 py-4">
                                        {
                                        payment.amount
                                    }</td>
                                    {/* <td className="px-6 py-4">{payment.purchase_date}</td> */}
                                    <td className="px-6 py-4">
                                        {
                                        payment.vendor_receive ? (
                                            <button className="bg-gray-500 text-white rounded px-4 py-2" disabled>
                                                Received
                                            </button>
                                        ) : (
                                            <button className="bg-blue-500 text-white rounded px-4 py-2"
                                                onClick={
                                                    () => handleReceivedClick(payment.checkout_session_id)
                                            }>
                                                Receive
                                            </button>
                                        )
                                    } </td>
                                    <td className="px-6 py-4">
                                    {
                                         payment.vendor_receive ? (
                                            <button className="bg-gray-500 text-white rounded px-4 py-2" disabled>
                                                Rise Isuue
                                            </button>
                                        ) : ( <button class="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"  onClick={
                                                    () => handleFailClick(payment.checkout_session_id)
                                            }>Rise Isuue
                                        </button>)
                                        
                                        

                                        
                                        }
                                    </td>


                                </tr>
                            ))
                        } </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Payments;
