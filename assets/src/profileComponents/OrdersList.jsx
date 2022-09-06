import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import { useAuth } from '../contexts/OrderContext';
import fetchData from '../hooks';
import OrderDetailts from './OrderDetailts';

const OrdersList = () => {
  const { data: userData } = useAuth();

  const [orders, setOrders] = useState({ loading: true, data: undefined });
  const [pageUrl, setPageUrl] = useState('');
  const [orderId, setOrderId] = useState(null);

  const { loading, data } = orders;

  useEffect(() => {
    if (userData) {
      if (pageUrl) {
        fetchData(pageUrl, setOrders);
      } else {
        fetchData(`/api/orders?userClient=${userData?.id}`, setOrders);
      }
    }
  }, [pageUrl, userData]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="h-screen flex flex-col justify-start items-center ">
      <div className="mx-auto w-4/5 bg-white mt-6">
        <table className="pb-2 w-full p-3 shadow-md">
          <thead className="bg-orange-50 shadow-sm">
            <tr>
              <th
                scope="col"
                className="hidden sm:table-cell px-2 self-center py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                order number
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Order Date
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Payement date
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                actions
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {data?.['hydra:member']?.map((order) => {
              return (
                <tr key={order.id} className="w-full">
                  <td className="p-1">{order.id}</td>
                  <td className="p-1">{order.orderDate}</td>
                  <td className={order.paymentDate ? 'text-green-400 p-1' : 'text-red-500 p-1'}>
                    {order.paymentDate ? order.paymentDate : 'Not Paid'}
                  </td>
                  <td
                    onClick={() => setOrderId(order['@id'])}
                    role="presentation"
                    className="text-blue-500 cursor-pointer p-1 flex justify-around"
                  >
                    Details
                    <a
                      className="text-orange-600 hover:text-orange-800 cursor-pointer"
                      href={`/files/orders/${order.id}/pdf`}
                    >
                      {' '}
                      PDF
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination data={data} setPageUrl={setPageUrl} />
      </div>
      {orderId && <OrderDetailts orderId={orderId} />}
    </div>
  );
};

export default OrdersList;
