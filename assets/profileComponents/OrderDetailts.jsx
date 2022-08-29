import React, { useState, useEffect } from 'react';
import Spinner from '../src/components/Spinner';
import fetchData, { Total, TotalHT, TotalTVA } from '../src/hooks';
import Tr from './UI/Tr';

const OrderDetailts = ({ orderId }) => {
  const [orderDetailes, setOrderDetailes] = useState({
    loading: true,
    data: null,
  });

  useEffect(() => {
    if (orderId) {
      fetchData(orderId, setOrderDetailes);
    }
  }, [orderId]);

  const { loading, data } = orderDetailes;

  if (loading) {
    return <Spinner />;
  }


  console.log(data);

  return (
    <div className=' w-4/5 bg-white mt-6 shadow-md'>
      {data && (
        <div className='grid grid-cols-2 justify-between p-2 gap-2'>
          <div className=' col-span-1'>
            <table className='divide-y divide-gray-200'>
              <tbody>
                <Tr th={'Number :'} td={data.id} />
                <Tr th={'Date :'} td={data.orderDate} />
                {data.payMethod && (
                  <Tr th={'payment method :'} td={data.payMethod} />
                )}
                <Tr th={'shipAddress :'} td={data.shipAddress} />
                <Tr th={'shipCity :'} td={data.shipCity} />
                <Tr th={'shipZipCode :'} td={data.shipZipCode} />
                <Tr th={'billAddress :'} td={data.billAddress} />
                <Tr th={'billCity :'} td={data.billCity} />
                <Tr th={'billZipCode :'} td={data.billZipCode} />
                <Tr th={'PaymentDate :'} td={data.paymentDate ? data.paymentDate : "To be Payed"} />
              </tbody>
            </table>
          </div>
          <div className=' col-span-1'>
            <table className='pb-2 w-full p-1 shadow-sm'>
              <thead className='bg-orange-50'>
                <tr>
                  <th className='uppercase text-xs font-medium'>Ref</th>
                  <th className='uppercase text-xs font-medium'>book title</th>
                  <th className='uppercase text-xs font-medium'>qty</th>
                  <th className='uppercase text-xs font-medium'>unit price</th>
                  <th className='uppercase text-xs font-medium'>TVA</th>
                </tr>
              </thead>
              <tbody>
                {data?.bookOrders.map((book , i) => {
                  return (
                    <tr key={i}>
                      <td className='text-center text-sm'>{book.book.id}</td>
                      <td className='text-center text-sm'>{book.book.title}</td>
                      <td className='text-center text-sm'>{book.quantity}</td>
                      <td className='text-center text-sm'>{book.unitPrice}€</td>
                      <td className='text-center text-sm'>{ 10/100 * book.unitPrice}€</td>
                    </tr>
                  );
                })}
                  <tr className='border-t-2'>
                  <th className='text-right text-sm' colSpan={3} ></th>
                  
                  <td className='text-center text-sm p-1'>{TotalHT(data?.bookOrders).toFixed(2)}€</td>
                  <td className='text-center text-sm'>{TotalTVA(data?.bookOrders).toFixed(2)}€</td>
                </tr>
                <tr className='border-t-2'>
                  <th className='text-left p-1'  colSpan={4} >Total : </th>
                  <td className="text-center" >{Total(data?.bookOrders).toFixed(2)}€</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailts;
