import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Spinner from '../components/Spinner';
import ErrorSpan from '../components/uis/ErrorSpan';
import Label from '../components/uis/Label';
import {
  useAuth,
  useBooksStorage,
  useOrderStorage,
} from '../contexts/OrderContext';
import { Link, useNavigate } from 'react-router-dom';
import LinkSpan from '../components/uis/LinkSpan';
import { inputDivClasses, inputfeildClasses } from '../hooks';

const Checkout = () => {
  const { loading, data } = useAuth();
  const books = useBooksStorage();
  const navigate = useNavigate();
  const order = useOrderStorage();
  useEffect(() => {
    if (!loading && order) {
      order.userClient !== data['@id'] && localStorage.removeItem('ORDER');
    }
    books || navigate('../', { replace: true });
  }, [order, books]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (OrderData) => {
    OrderData.isPrivate = data.private;
    OrderData.coef = data.Coef;
    OrderData.userClient = data['@id'];
    localStorage.setItem('ORDER', JSON.stringify(OrderData));
    location.assign('/placeorder');
  };

  // functions contain some validation rules
  const exactZipCode = (zipCode) => /^[0-9]{5}$/.test(zipCode);
  const validCity = (city) => !/\d+/g.test(city);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        <div className=' h-screen w-full flex flex-col justify-center items-center'>
          <div className='flex justify-start flex-start xl:w-3/5 md:w-4/5'>
            <Link to={'/'}>
              <LinkSpan> {'<<'}store</LinkSpan>
            </Link>
            {order && (
              <Link to={'/placeorder'}>
                <LinkSpan>summary{'>>'}</LinkSpan>
              </Link>
            )}
          </div>
          <div className=' sm:w-10/12 xl:w-3/5 md:w-4/5 p-3 bg-white rounded-md shadow-md'>
            <h2 className='text-lg sm:text-2xl uppercase my-3 border-b-gray-200 border-solid border-b-2'>
              {data.firstname + ' ' + data.lastname}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mx-auto sm:grid sm:grid-cols-2 sm:gap-10  items-center'>
                <div className='col-span-1 '>
                  <div className='w-full'>
                    <h2 className='uppercase text-base sm:text-xl text-center m-2 text-gray-600'>
                      Shipping Address
                    </h2>
                  </div>

                  <div className={inputDivClasses}>
                    <Label labelfeild={'shipAddress'}>
                      Address
                      <input
                        type='text'
                        id='shipAddress'
                        className={inputfeildClasses}
                        defaultValue={data.address}
                        {...register('shipAddress', {
                          required: true,
                          minLength: 5,
                          maxLength: 255,
                        })}
                      />
                      {errors.shipAddress?.type === 'required' && (
                        <ErrorSpan>Address is required</ErrorSpan>
                      )}
                      {errors.shipAddress?.type === 'minLength' && (
                        <ErrorSpan> Address at least 5 characters</ErrorSpan>
                      )}
                      {errors.shipAddress?.type === 'maxLength' && (
                        <ErrorSpan> Address maximum 255 characters</ErrorSpan>
                      )}
                    </Label>
                  </div>

                  <div className={inputDivClasses}>
                    <Label labelfeild={'shipCity'}>
                      City
                      <input
                        type='text'
                        id='shipCity'
                        className={inputfeildClasses}
                        defaultValue={data.city}
                        {...register('shipCity', {
                          required: true,
                          minLength: 3,
                          maxLength: 100,
                          validate: validCity,
                        })}
                      />
                      {errors.shipCity?.type === 'required' && (
                        <ErrorSpan> City is required</ErrorSpan>
                      )}
                      {errors.shipCity?.type === 'minLength' && (
                        <ErrorSpan>City at least 3 characters</ErrorSpan>
                      )}
                      {errors.shipCity?.type === 'maxLength' && (
                        <ErrorSpan>City maximum 100 characters</ErrorSpan>
                      )}
                      {errors.shipCity?.type === 'validate' && (
                        <ErrorSpan>City does't have numbers</ErrorSpan>
                      )}{' '}
                    </Label>
                  </div>

                  <div className={inputDivClasses}>
                    <Label labelfeild={'shipZipCode'}>
                      ZipCode
                      <input
                        type='text'
                        id='shipZipCode'
                        className={inputfeildClasses}
                        defaultValue={data.zipCode}
                        {...register('shipZipCode', {
                          required: true,
                          validate: exactZipCode,
                        })}
                      />
                      {errors.shipZipCode?.type === 'required' && (
                        <ErrorSpan> zipCode is required</ErrorSpan>
                      )}
                      {errors.shipZipCode?.type === 'validate' && (
                        <ErrorSpan>zipCode must be correct ex: 75380</ErrorSpan>
                      )}
                    </Label>
                  </div>
                </div>
                <div className='col-span-1 '>
                  <div className='w-full'>
                    <h2 className='text-base sm:text-xl text-center uppercase m-2 text-gray-600'>
                      Billing Address
                    </h2>
                  </div>
                  <div className={inputDivClasses}>
                    <Label labelfeild={'billAdress'}>
                      Address
                      <input
                        type='text'
                        id='shipAddress'
                        className={inputfeildClasses}
                        defaultValue={data.address}
                        {...register('billAddress', {
                          required: true,
                          minLength: 5,
                          maxLength: 255,
                        })}
                      />
                      {errors.billAddress?.type === 'required' && (
                        <ErrorSpan>Address is required</ErrorSpan>
                      )}
                      {errors.billAddress?.type === 'minLength' && (
                        <ErrorSpan>Address at least 5 characters</ErrorSpan>
                      )}
                      {errors.billAddress?.type === 'maxLength' && (
                        <ErrorSpan>Address maximum 255 characters</ErrorSpan>
                      )}
                    </Label>
                  </div>

                  <div className={inputDivClasses}>
                    <Label labelfeild={'billCity'}>
                      {' '}
                      City
                      <input
                        type='text'
                        id='shipCity'
                        className={inputfeildClasses}
                        defaultValue={data.city}
                        {...register('billCity', {
                          required: true,
                          minLength: 3,
                          maxLength: 100,
                          validate: validCity,
                        })}
                      />
                      {errors.billCity?.type === 'required' && (
                        <ErrorSpan>City is required</ErrorSpan>
                      )}
                      {errors.billCity?.type === 'minLength' && (
                        <ErrorSpan>City at least 3 characters</ErrorSpan>
                      )}
                      {errors.billCity?.type === 'maxLength' && (
                        <ErrorSpan>City maximum 100 characters</ErrorSpan>
                      )}
                      {errors.billCity?.type === 'validate' && (
                        <ErrorSpan>City does't have numbers</ErrorSpan>
                      )}
                    </Label>
                  </div>

                  <div className={inputDivClasses}>
                    <Label labelfeild={'billZipCode'}>
                      ZipCode
                      <input
                        type='text'
                        name='billZipCode'
                        id='billZipCode'
                        className={inputfeildClasses}
                        defaultValue={data.zipCode}
                        {...register('billZipCode', {
                          required: true,
                          validate: exactZipCode,
                        })}
                      />
                      {errors.billZipCode?.type === 'required' && (
                        <ErrorSpan>zipCode is required</ErrorSpan>
                      )}
                      {errors.billZipCode?.type === 'validate' && (
                        <ErrorSpan>zipCode must be correct ex: 75380</ErrorSpan>
                      )}
                    </Label>
                  </div>
                </div>
              </div>
              <div>
                {data.private || (
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
      </>
    );
  }
};

export default Checkout;
