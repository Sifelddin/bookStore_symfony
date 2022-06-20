import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Checkout = () => {
  const [user, setUser] = useState(null);
  const [order, setOrder] = useState({
    ShipAddress: '',
    shipCity: '',
    shipZipCode: '',
    billAddress: '',
    billCity: '',
    billZipCode: '',
  });
  useEffect(() => {
    axios
      .get('api/me')
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  const inputClasses =
    'focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-7 sm:text-md border-gray-300 rounded-md';
  const labelClasses = 'block text-md font-medium text-gray-700';

  console.log(user);

  console.log({ ...order });

  return (
    <div className=' h-screen w-full flex justify-center items-center'>
      <div className=' w-3/5 p-3 bg-white rounded-md shadow-md'>
        <div className='mt-1 relative rounded-md shadow-sm'>
          <input
            type='text'
            name='customer'
            id='price'
            className={inputClasses + ' mb-2'}
            value={user && user.firstname + ' ' + user.lastname}
            readOnly
          />
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className='mx-auto grid grid-cols-2 gap-3  items-center'>
            <div className='col-span-1 '>
              <div className='w-full'>
                <h2 className=' text-2xl text-center m-2 '>Shipping Address</h2>
              </div>
              <label htmlFor='shipAddress' className={labelClasses}>
                Address
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <input
                  type='text'
                  name='shipAddress'
                  id='shipAddress'
                  className={inputClasses}
                  onChange={(e) =>
                    setOrder({ ...order, ShipAddress: e.target.value })
                  }
                  value={order.ShipAddress}
                />
              </div>
              <label htmlFor='shipCity' className={labelClasses}>
                City
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <input
                  type='text'
                  name='shipCity'
                  id='shipCity'
                  className={inputClasses}
                  onChange={(e) =>
                    setOrder({ ...order, shipCity: e.target.value })
                  }
                  value={order.shipCity}
                />
              </div>
              <label htmlFor='shipZipCode' className={labelClasses}>
                ZipCode
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <input
                  type='text'
                  name='shipZipCode'
                  id='shipZipCode'
                  className={inputClasses}
                  onChange={(e) =>
                    setOrder({ ...order, shipZipCode: e.target.value })
                  }
                  value={order.shipZipCode}
                />
              </div>
            </div>
            <div className='col-span-1 '>
              <div className='w-full'>
                <h2 className='text-2xl text-center  m-2'>Billing Address</h2>
              </div>
              <label htmlFor='billAddress' className={labelClasses}>
                Address
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <input
                  type='text'
                  name='billAddress'
                  id='shipAddress'
                  className={inputClasses}
                  onChange={(e) =>
                    setOrder({ ...order, billAddress: e.target.value })
                  }
                  value={order.billAddress}
                />
              </div>
              <label htmlFor='billCity' className={labelClasses}>
                City
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <input
                  type='text'
                  name='billCity'
                  id='shipCity'
                  className={inputClasses}
                  onChange={(e) =>
                    setOrder({ ...order, billCity: e.target.value })
                  }
                  value={order.billCity}
                />
              </div>
              <label htmlFor='billZipCode' className={labelClasses}>
                ZipCode
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <input
                  type='text'
                  name='billZipCode'
                  id='shipZipCode'
                  className={inputClasses}
                  onChange={(e) =>
                    setOrder({ ...order, billZipCode: e.target.value })
                  }
                  value={order.billZipCode}
                />
              </div>
            </div>
          </div>
          <div className='w-full flex justify-center items-center p-2 mt-2'>
            <button className='inline-block rounded-md bg-green-500 px-6 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-green-400'>
              validate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
