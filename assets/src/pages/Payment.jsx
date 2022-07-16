import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Cleave from 'cleave.js/react';
import { Link, useNavigate } from 'react-router-dom';
import { postData } from '../hooks';
import ErrorSpan from '../components/uis/ErrorSpan';
import Label from '../components/uis/Label';
import LinkSpan from '../components/uis/LinkSpan';
const Payment = () => {
  const books = JSON.parse(localStorage.getItem('SHOPPING-CART'));
  const order = JSON.parse(localStorage.getItem('ORDER'));
  const navigate = useNavigate();

  const [messageErr, setMessageErr] = useState(null);
  const [send, setSend] = useState(false);
  useEffect(() => {
    order.isPrivate || navigate('../placeorder');
    if (books === null || order === null) {
      navigate('../');
    }
  }, [order, books]);

  useEffect(() => {
    if (send) {
      postData('/api/orders', '/api/book_orders', order, books);
    }
  }, [send]);

  const {
    control,
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let cartNums = [16, 15, 14];
    let ccNumber = data['cc-number']?.replace(/\s/g, '').length;
    let cvv = data['cc-exp']?.replace(/\//g, '').length;

    if (cartNums.includes(ccNumber) && cvv === 4) {
      setMessageErr(null);
      setSend(confirm('you confirm you registration ?'));
    } else {
      setMessageErr(
        ' your cart number and expiry date should be full filled !',
      );
    }
  };

  const exactCVV = (cvv) => /^[0-9]{3,4}$/.test(cvv);
  const fullName = (nameStr) => /^[a-zA-Z]+$/gi.test(nameStr);

  const inputClasses =
    'focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-7 sm:text-md border-gray-300 rounded-md';
  const feildClasses = 'mt-1 relative rounded-md shadow-sm';

  return (
    <div className=' h-screen flex flex-col justify-center items-center'>
      <div className='p-1 mb-1  flex justify-start'>
        <Link to='/'>
          <LinkSpan>{'<<'}store</LinkSpan>
        </Link>
        <Link to='/ordering'>
          <LinkSpan>{'<<'}ordering</LinkSpan>
        </Link>
        <Link to='/placeorder'>
          <LinkSpan> {'<<'}summary</LinkSpan>
        </Link>
      </div>
      <div className='bg-white p-6 shadow-md rounded-md '>
        <h1 className='text-xl text-center'>Confirm Purchase</h1>
        <div className='m-2 p-2'>
          <form onSubmit={handleSubmit(onSubmit)}>
            {messageErr && <ErrorSpan>{messageErr}</ErrorSpan>}
            <div className={feildClasses}>
              <Label labelfeild={'fullName'}>
                {' '}
                FullName*
                <input
                  type='text'
                  id='fullName'
                  className={inputClasses}
                  {...register('fullName', {
                    required: true,
                    validate: fullName,
                  })}
                />
                {errors['fullName']?.type === 'required' && (
                  <ErrorSpan> Name on card is required</ErrorSpan>
                )}
                {errors['fullName']?.type === 'validate' && (
                  <ErrorSpan>fullname includes only letters</ErrorSpan>
                )}
              </Label>
            </div>

            <div className={feildClasses}>
              <Label labelfeild={'cc-number'}>
                {' '}
                Card number*
                <Controller
                  control={control}
                  name='cc-number'
                  type='text'
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Cleave
                      placeholder='Ex: 5465 1313 2132 1321'
                      options={{ creditCard: true }}
                      onChange={onChange}
                      className={inputClasses}
                      name={name}
                      value={value}
                      ref={ref}
                      onBlur={onBlur}
                    />
                  )}
                />
              </Label>
            </div>
            <div className={feildClasses}>
              <Label labelfeild={'cc-exp'}>
                {' '}
                Expiry date*
                <Controller
                  control={control}
                  name='cc-exp'
                  type='tel'
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Cleave
                      placeholder='mm/yy'
                      options={{
                        date: true,
                        datePattern: ['m', 'y'],
                        delimiter: '/',
                      }}
                      onChange={onChange}
                      className={inputClasses}
                      name={name}
                      value={value}
                      ref={ref}
                      onBlur={onBlur}
                    />
                  )}
                />
              </Label>
            </div>

            <div className={feildClasses}>
              <Label labelfeild={'cc-csc'}>
                {' '}
                Security Code*
                <input
                  type='text'
                  id='cc-csc'
                  className={inputClasses}
                  {...register('cc-csc', {
                    required: true,
                    validate: exactCVV,
                  })}
                />
                {errors['cc-csc']?.type === 'required' && (
                  <ErrorSpan> Name on card is required</ErrorSpan>
                )}
                {errors['cc-csc']?.type === 'validate' && (
                  <ErrorSpan> scc is in correct format</ErrorSpan>
                )}
              </Label>
            </div>

            <div className='w-full mt-2 pt-2 flex justify-center items-center'>
              <button
                type='submit'
                className=' rounded-md bg-green-500 px-6 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-green-400 mx-auto'>
                validate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
