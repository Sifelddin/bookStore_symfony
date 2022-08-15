import React, { useState, useEffect } from 'react';
import Spinner from '../src/components/Spinner';
import fetchData from '../src/hooks';
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

  //   billAddress: "26 rue Lamartine"
  //   billCity: "rose"
  //   billZipCode: "76000"

  //   book: {@id: '/api/books/1', @type: 'Book', title: 'Frontity'}
  //   quantity: 1
  //   unitPrice: "30.00"
  //   book: {@id: '/api/books/2', @type: 'Book', title: 'book2'}
  //   quantity: 1
  //   unitPrice: "12.21"
  //   id: 13
  //   shipAddress: "26 rue Lamartine"
  //   shipCity: "rose"
  //   shipZipCode: "76000"

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
              </tbody>
            </table>
          </div>
          <div className=' col-span-1'>
            <table className='pb-2 w-full p-1 shadow-sm'>
              <thead className='bg-orange-50'>
                <tr>
                  <th className='uppercase text-xs font-medium'>book title</th>
                  <th className='uppercase text-xs font-medium'>qty</th>
                  <th className='uppercase text-xs font-medium'>unit price</th>
                </tr>
              </thead>
              <tbody>
                {data?.bookOrders.map((book) => {
                  return (
                    <tr key={book.id}>
                      <td className='text-center text-sm'>{book.book.title}</td>
                      <td className='text-center text-sm'>{book.quantity}</td>
                      <td className='text-center text-sm'>{book.unitPrice}€</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailts;
