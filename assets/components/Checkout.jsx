import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Checkout = () => {


  const [user, setUser] = useState(null);


  useEffect(() => {
    axios
      .get('api/me')
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));

  }, []);
console.log(user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) =>{
    localStorage.setItem('ORDER', JSON.stringify(data))
    location.assign('/placeorder')
  };

  // functions contain some validation rules
  const userClient = (userClient) => userClient == user.id;
  const userCoef = (coef) => coef == user.Coef;
  const exactZipCode = (zipCode) => {
    const regExp = /^[0-9]{5}$/;
    return regExp.test(zipCode);
  };
  const validCity = (city) => {
    const regExp = /\d+/g;
    return !regExp.test(city);
  };

  const inputClasses =
    'focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-7 sm:text-md border-gray-300 rounded-md';
  const labelClasses = 'block text-md font-medium text-gray-700';



  return (
    <>
      <Link to={'/'}> back </Link>

      {user && (
        <div className=' h-screen w-full flex justify-center items-center'>
          <div className=' xl:w-3/5 md:w-4/5 p-3 bg-white rounded-md shadow-md'>
            <h2 className='text-2xl uppercase my-3 border-b-gray-200 border-solid border-b-2'>
              {user.firstname + ' ' + user.lastname}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <input
                  type='hidden'
                  defaultValue={user.id}
                  {...register('userClient', {
                    required: true,
                    validate: userClient,
                  })}
                />
                {errors.userClient && errors.userClient.type === 'validate' && (
                  <span className='text-red-600 text-sm'>
                    please don't change the value of this feild{' '}
                  </span>
                )}
                {errors.userClient && errors.userClient.type === 'required' && (
                  <span className='text-red-600 text-sm'>
                    {' '}
                    this field is required
                  </span>
                )}
              </div>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <input
                  type='hidden'
                  defaultValue={user.Coef}
                  {...register('coef', { required: true, validate: userCoef })}
                />
                {errors.coef && errors.coef.type === 'validate' && (
                  <span className='text-red-600 text-sm'>
                    please don't change the value of this feild{' '}
                  </span>
                )}
                {errors.coef && errors.coef.type === 'required' && (
                  <span className='text-red-600 text-sm'>
                    {' '}
                    this field is required
                  </span>
                )}
              </div>
              <div className='mx-auto sm:grid sm:grid-cols-2 sm:gap-10  items-center'>
                <div className='col-span-1 '>
                  <div className='w-full'>
                    <h2 className='uppercase text-xl text-center m-2 text-gray-600'>
                      Shipping Address
                    </h2>
                  </div>
                  <label htmlFor='shipAddress' className={labelClasses}>
                    Address
                  </label>
                  <div className='mt-1 relative rounded-md shadow-sm'>
                    <input
                      type='text'
                      id='shipAddress'
                      className={inputClasses}
                      defaultValue={user.address}
                      {...register('shipAddress', {
                        required: true,
                        minLength: 5,
                        maxLength: 255,
                      })}
                    />
                    {errors.shipAddress &&
                      errors.shipAddress.type === 'required' && (
                        <span className='text-red-600 text-sm'>
                          Address is required
                        </span>
                      )}
                    {errors.shipAddress &&
                      errors.shipAddress.type === 'minLength' && (
                        <span className='text-red-600 text-sm'>
                          Address at least 5 characters
                        </span>
                      )}
                    {errors.shipAddress &&
                      errors.shipAddress.type === 'maxLength' && (
                        <span className='text-red-600 text-sm'>
                          Address maximum 255 characters
                        </span>
                      )}
                  </div>
                  <label htmlFor='shipCity' className={labelClasses}>
                    City
                  </label>
                  <div className='mt-1 relative rounded-md shadow-sm'>
                    <input
                      type='text'
                      id='shipCity'
                      className={inputClasses}
                      defaultValue={user.city}
                      {...register('shipCity', {
                        required: true,
                        minLength: 3,
                        maxLength: 100,
                        validate: validCity,
                      })}
                    />
                    {errors.shipCity && errors.shipCity.type === 'required' && (
                      <span className='text-red-600 text-sm'>
                        City is required
                      </span>
                    )}
                    {errors.shipCity &&
                      errors.shipCity.type === 'minLength' && (
                        <span className='text-red-600 text-sm'>
                          City at least 3 characters
                        </span>
                      )}
                    {errors.shipCity &&
                      errors.shipCity.type === 'maxLength' && (
                        <span className='text-red-600 text-sm'>
                          City maximum 100 characters
                        </span>
                      )}
                    {errors.shipCity && errors.shipCity.type === 'validate' && (
                      <span className='text-red-600 text-sm'>
                        City does't have numbers
                      </span>
                    )}
                  </div>
                  <label htmlFor='shipZipCode' className={labelClasses}>
                    ZipCode
                  </label>
                  <div className='mt-1 relative rounded-md shadow-sm'>
                    <input
                      type='text'
                      id='shipZipCode'
                      className={inputClasses}
                      defaultValue={user.zipCode}
                      {...register('shipZipCode', {
                        required: true,
                        validate: exactZipCode,
                      })}
                    />
                    {errors.shipZipCode &&
                      errors.shipZipCode.type === 'required' && (
                        <span className='text-red-600 text-sm'>
                          zipCode is required
                        </span>
                      )}
                    {errors.shipZipCode &&
                      errors.shipZipCode.type === 'validate' && (
                        <span className='text-red-600 text-sm'>
                          zipCode must be correct ex: 75380
                        </span>
                      )}
                  </div>
                </div>
                <div className='col-span-1 '>
                  <div className='w-full'>
                    <h2 className='text-xl text-center uppercase m-2 text-gray-600'>
                      Billing Address
                    </h2>
                  </div>
                  <label htmlFor='billAddress' className={labelClasses}>
                    Address
                  </label>
                  <div className='mt-1 relative rounded-md shadow-sm'>
                    <input
                      type='text'
                      id='shipAddress'
                      className={inputClasses}
                      defaultValue={user.address}
                      {...register('billAddress', {
                        required: true,
                        minLength: 5,
                        maxLength: 255,
                      })}
                    />
                    {errors.billAddress &&
                      errors.billAddress.type === 'required' && (
                        <span className='text-red-600 text-sm'>
                          Address is required
                        </span>
                      )}
                    {errors.billAddress &&
                      errors.billAddress.type === 'minLength' && (
                        <span className='text-red-600 text-sm'>
                          Address at least 5 characters
                        </span>
                      )}
                    {errors.billAddress &&
                      errors.billAddress.type === 'maxLength' && (
                        <span className='text-red-600 text-sm'>
                          Address maximum 255 characters
                        </span>
                      )}
                  </div>
                  <label htmlFor='billCity' className={labelClasses}>
                    City
                  </label>
                  <div className='mt-1 relative rounded-md shadow-sm'>
                    <input
                      type='text'
                      id='shipCity'
                      className={inputClasses}
                      defaultValue={user.city}
                      {...register('billCity', {
                        required: true,
                        minLength: 3,
                        maxLength: 100,
                        validate: validCity,
                      })}
                    />
                    {errors.billCity && errors.billCity.type === 'required' && (
                      <span className='text-red-600 text-sm'>
                        City is required
                      </span>
                    )}
                    {errors.billCity &&
                      errors.billCity.type === 'minLength' && (
                        <span className='text-red-600 text-sm'>
                          City at least 3 characters
                        </span>
                      )}
                    {errors.billCity &&
                      errors.billCity.type === 'maxLength' && (
                        <span className='text-red-600 text-sm'>
                          City maximum 100 characters
                        </span>
                      )}
                    {errors.billCity && errors.billCity.type === 'validate' && (
                      <span className='text-red-600 text-sm'>
                        City does't have numbers
                      </span>
                    )}
                  </div>
                  <label htmlFor='billZipCode' className={labelClasses}>
                    ZipCode
                  </label>
                  <div className='mt-1 relative rounded-md shadow-sm'>
                    <input
                      type='text'
                      name='billZipCode'
                      id='billZipCode'
                      className={inputClasses}
                      defaultValue={user.zipCode}
                      {...register('billZipCode', {
                        required: true,
                        validate: exactZipCode,
                      })}
                    />
                    {errors.billZipCode &&
                      errors.billZipCode.type === 'required' && (
                        <span className='text-red-600 text-sm'>
                          zipCode is required
                        </span>
                      )}
                    {errors.billZipCode &&
                      errors.billZipCode.type === 'validate' && (
                        <span className='text-red-600 text-sm'>
                          zipCode must be correct ex: 75380
                        </span>
                      )}
                  </div>
                </div>
              </div>
              <div>
                {user.private || (
                  <div className='mt-6'>
                    {' '}
                    <h2 className='text-xl text-center text-gray-600 uppercase mt-2'>
                      Payment Method
                    </h2>
                    <div className='w-full grid grid-cols-2 m-3' id='Method'>
                      <div className='col-span-1'>
                        <input
                          type='radio'
                          id='check'
                          {...register('payMethod')}
                          value='Bank Check'
                        />
                        <label htmlFor='check' className='m-1 text-gray-600'>
                          Bank Check
                        </label>
                      </div>
                      <div className='col-span-1'>
                        <input
                          type='radio'
                          id='Transfer'
                          {...register('payMethod')}
                          value='Bank Transfer'
                          defaultChecked
                        />
                        <label htmlFor='Transfer' className='m-1 text-gray-600'>
                          Bank Transfer
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className='w-full flex justify-center items-center p-2 mt-2'>
                <button
                  type='submit'
                  className='inline-block rounded-md bg-green-500 px-6 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-green-400'>
                  validate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
