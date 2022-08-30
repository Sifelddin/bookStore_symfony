import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import ErrorSpan from '../components/uis/ErrorSpan';
import Label from '../components/uis/Label';
import { useAuth } from '../contexts/OrderContext';
import LinkSpan from '../components/uis/LinkSpan';
import { applyCoefPriceLocalStorage, inputDivClasses, inputfeildClasses } from '../hooks';

const Checkout = () => {
  const { loading, data: userData } = useAuth();
  const books = JSON.parse(localStorage.getItem('SHOPPING-CART'));
  const order = JSON.parse(localStorage.getItem('ORDER'));
  const navigate = useNavigate();
  // check user data
  useEffect(() => {
    if (books === null) {
      navigate('../', { replace: true });
    }
    if (!loading) {
      if (order && order.userClient !== userData['@id']) {
        // delete localStorage order if the login user is not the same as the previous one
        localStorage.removeItem('ORDER');
      }
      applyCoefPriceLocalStorage(books, userData.Coef);
    }
  }, [books, order]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (OrderData) => {
    OrderData.isPrivate = userData.private;
    OrderData.coef = userData.Coef;
    OrderData.userClient = userData['@id'];
    // save order submited data to the localStorage
    localStorage.setItem('ORDER', JSON.stringify(OrderData));
    navigate('/placeorder');
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className=" h-screen w-full flex flex-col justify-center items-center">
      <div className="flex justify-start flex-start xl:w-3/5 md:w-4/5">
        <Link to="/">
          <LinkSpan> {'<<'}store</LinkSpan>
        </Link>
        {order && (
          <Link to="/placeorder">
            <LinkSpan>summary{'>>'}</LinkSpan>
          </Link>
        )}
      </div>
      <div className=" sm:w-10/12 xl:w-3/5 md:w-4/5 p-3 bg-white rounded-md shadow-md">
        <h2 className="text-lg sm:text-2xl uppercase my-3 border-b-gray-200 border-solid border-b-2">
          {`${userData.firstname} ${userData.lastname}`}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-auto sm:grid sm:grid-cols-2 sm:gap-10  items-center">
            <div className="col-span-1 ">
              <div className="w-full">
                <h2 className="uppercase text-base sm:text-xl text-center m-2 text-gray-600">Shipping Address</h2>
              </div>

              <div className={inputDivClasses}>
                <Label labelfeild="shipAddress">
                  Address
                  <input
                    type="text"
                    id="shipAddress"
                    className={inputfeildClasses}
                    defaultValue={userData.address}
                    {...register('shipAddress', {
                      required: true,
                      minLength: 5,
                      maxLength: 255
                    })}
                  />
                  {errors.shipAddress?.type === 'required' && <ErrorSpan>Address is required</ErrorSpan>}
                  {errors.shipAddress?.type === 'minLength' && <ErrorSpan> Address at least 5 characters</ErrorSpan>}
                  {errors.shipAddress?.type === 'maxLength' && <ErrorSpan> Address maximum 255 characters</ErrorSpan>}
                </Label>
              </div>

              <div className={inputDivClasses}>
                <Label labelfeild="shipCity">
                  City
                  <input
                    type="text"
                    id="shipCity"
                    className={inputfeildClasses}
                    defaultValue={userData.city}
                    {...register('shipCity', {
                      required: true,
                      minLength: 3,
                      maxLength: 100,
                      pattern: /^[a-zA-Z]+(\s[a-zA-Z]+)?$/gi
                    })}
                  />
                  {errors.shipCity?.type === 'required' && <ErrorSpan> City is required</ErrorSpan>}
                  {errors.shipCity?.type === 'minLength' && <ErrorSpan>City at least 3 characters</ErrorSpan>}
                  {errors.shipCity?.type === 'maxLength' && <ErrorSpan>City maximum 100 characters</ErrorSpan>}
                  {errors.shipCity?.type === 'pattern' && <ErrorSpan>only letters please</ErrorSpan>}
                </Label>
              </div>

              <div className={inputDivClasses}>
                <Label labelfeild="shipZipCode">
                  ZipCode
                  <input
                    type="text"
                    id="shipZipCode"
                    className={inputfeildClasses}
                    defaultValue={userData.zipCode}
                    {...register('shipZipCode', {
                      required: true,
                      pattern: /^[0-9]{5}$/
                    })}
                  />
                  {errors.shipZipCode?.type === 'required' && <ErrorSpan> zipCode is required</ErrorSpan>}
                  {errors.shipZipCode?.type === 'pattern' && <ErrorSpan>zipCode must be correct ex: 75380</ErrorSpan>}
                </Label>
              </div>
            </div>
            <div className="col-span-1 ">
              <div className="w-full">
                <h2 className="text-base sm:text-xl text-center uppercase m-2 text-gray-600">Billing Address</h2>
              </div>
              <div className={inputDivClasses}>
                <Label labelfeild="billAdress">
                  Address
                  <input
                    type="text"
                    id="shipAddress"
                    className={inputfeildClasses}
                    defaultValue={userData.address}
                    {...register('billAddress', {
                      required: true,
                      minLength: 5,
                      maxLength: 255
                    })}
                  />
                  {errors.billAddress?.type === 'required' && <ErrorSpan>Address is required</ErrorSpan>}
                  {errors.billAddress?.type === 'minLength' && <ErrorSpan>Address at least 5 characters</ErrorSpan>}
                  {errors.billAddress?.type === 'maxLength' && <ErrorSpan>Address maximum 255 characters</ErrorSpan>}
                </Label>
              </div>

              <div className={inputDivClasses}>
                <Label labelfeild="billCity">
                  {' '}
                  City
                  <input
                    type="text"
                    id="shipCity"
                    className={inputfeildClasses}
                    defaultValue={userData.city}
                    {...register('billCity', {
                      required: true,
                      minLength: 3,
                      maxLength: 100,
                      pattern: /^[a-zA-Z]+(\s[a-zA-Z]+)?$/gi
                    })}
                  />
                  {errors.billCity?.type === 'required' && <ErrorSpan>City is required</ErrorSpan>}
                  {errors.billCity?.type === 'minLength' && <ErrorSpan>City at least 3 characters</ErrorSpan>}
                  {errors.billCity?.type === 'maxLength' && <ErrorSpan>City maximum 100 characters</ErrorSpan>}
                  {errors.billCity?.type === 'pattern' && <ErrorSpan>only letters please</ErrorSpan>}
                </Label>
              </div>

              <div className={inputDivClasses}>
                <Label labelfeild="billZipCode">
                  ZipCode
                  <input
                    type="text"
                    name="billZipCode"
                    id="billZipCode"
                    className={inputfeildClasses}
                    defaultValue={userData.zipCode}
                    {...register('billZipCode', {
                      required: true,
                      pattern: /^[0-9]{5}$/
                    })}
                  />
                  {errors.billZipCode?.type === 'required' && <ErrorSpan>zipCode is required</ErrorSpan>}
                  {errors.billZipCode?.type === 'pattern' && <ErrorSpan>zipCode must be correct ex: 75380</ErrorSpan>}
                </Label>
              </div>
            </div>
          </div>
          <div>
            {userData.private || (
              <div className="mt-6">
                <h2 className="text-xl text-center text-gray-600 uppercase mt-2">Payment Method</h2>
                <div className="w-full grid grid-cols-2 m-3" id="Method">
                  <div className="col-span-1">
                    <label htmlFor="check" className="m-1 text-gray-600">
                      Bank Check
                      <input type="radio" id="check" {...register('payMethod')} value="Bank Check" />
                    </label>
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="Transfer" className="m-1 text-gray-600">
                      Bank Transfer
                      <input
                        type="radio"
                        id="Transfer"
                        {...register('payMethod')}
                        value="Bank Transfer"
                        defaultChecked
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-full flex justify-center items-center p-2 mt-2">
            <button
              type="submit"
              className="inline-block rounded-md bg-green-500 px-6 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-green-400"
            >
              validate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
