import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Cleave from 'cleave.js/react';
import { Link, useNavigate } from 'react-router-dom';
import { postOrder } from '../hooks';
import ErrorSpan from '../components/uis/ErrorSpan';
import Label from '../components/uis/Label';
import LinkSpan from '../components/uis/LinkSpan';
import ConfirmModal from '../components/ConfirmModal';
import ResultModal from '../components/ResultModal';

const Payment = () => {
  const [showModal, setShowModel] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [showResult, setShowResult] = useState(undefined);
  const books = JSON.parse(localStorage.getItem('SHOPPING-CART'));
  const order = JSON.parse(localStorage.getItem('ORDER'));
  const navigate = useNavigate();
  useEffect(() => {
    if (order?.isPrivate !== false) {
      navigate('../placeorder');
    }
    if (books === null || order === null) {
      navigate('../');
    }
  }, [order, books]);

  useEffect(() => {
    if (confirm) {
      postOrder('/api/orders', order, books)
        .then(() => setShowResult('your order has been registered succesfully .'))
        .catch(() => setShowResult('server error : something went wrong!'));
    }
  }, [confirm]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    if (data) {
      setShowModel(true);
    }
  };

  const inputClasses =
    'focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-7 sm:text-md border-gray-300 rounded-md';
  const feildClasses = 'mt-1 relative rounded-md shadow-sm';

  return (
    <div className=" h-screen flex flex-col justify-center items-center">
      <div className="p-1 mb-1  flex justify-start">
        <Link to="/">
          <LinkSpan>{'<<'}store</LinkSpan>
        </Link>
        <Link to="/ordering">
          <LinkSpan>{'<<'}ordering</LinkSpan>
        </Link>
        <Link to="/placeorder">
          <LinkSpan> {'<<'}summary</LinkSpan>
        </Link>
      </div>
      <div className="bg-white p-6 shadow-md rounded-md ">
        <h1 className="text-xl text-center">Confirm Purchase</h1>
        <div className="m-2 p-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={feildClasses}>
              <Label labelfeild="fullName">
                {' '}
                FullName*
                <input
                  type="text"
                  id="fullName"
                  className={inputClasses}
                  {...register('fullName', {
                    required: true,
                    pattern: /^[a-zA-Z]+$/gi
                  })}
                />
                {errors.fullName?.type === 'required' && <ErrorSpan> Name on card is required</ErrorSpan>}
                {errors.fullName?.type === 'pattern' && <ErrorSpan>fullname includes only letters</ErrorSpan>}
              </Label>
            </div>

            <div className={feildClasses}>
              <Label labelfeild="cc-number">
                {' '}
                Card number*
                <Controller
                  control={control}
                  name="cc-number"
                  type="text"
                  rules={{ required: true, min: 16, max: 19, pattern: /^(\d{4})\s(\d{4,6})\s(\d{4,6})\s?(\d{4})?$/ }}
                  render={({ field: { onChange, onBlur, value, name, ref } }) => (
                    <Cleave
                      placeholder="Ex: 5465 1313 2132 1321"
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
                {errors['cc-number']?.type === 'required' && <ErrorSpan> expiry date is required</ErrorSpan>}
                {errors['cc-number']?.type === 'pattern' && (
                  <ErrorSpan> please insert a valid number Ex: 5465 1313 2132 1321</ErrorSpan>
                )}
              </Label>
            </div>
            <div className={feildClasses}>
              <Label labelfeild="cc-exp">
                {' '}
                Expiry date*
                <Controller
                  control={control}
                  name="cc-exp"
                  type="tel"
                  rules={{ required: true, pattern: /\d{2}\/\d{2}/ }}
                  render={({ field: { onChange, onBlur, value, name, ref } }) => (
                    <Cleave
                      placeholder="mm/yy"
                      options={{
                        date: true,
                        datePattern: ['m', 'y'],
                        delimiter: '/'
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
                {errors['cc-exp']?.type === 'required' && <ErrorSpan> expiry date is required</ErrorSpan>}
                {errors['cc-exp']?.type === 'pattern' && (
                  <ErrorSpan>please insert a valid expiry date ex: 02/24</ErrorSpan>
                )}
              </Label>
            </div>

            <div className={feildClasses}>
              <Label labelfeild="cc-csc">
                {' '}
                Security Code*
                <input
                  type="text"
                  id="cc-csc"
                  placeholder="CVV"
                  className={inputClasses}
                  {...register('cc-csc', {
                    required: true,
                    pattern: /^[0-9]{3,4}$/
                  })}
                />
                {errors['cc-csc']?.type === 'required' && <ErrorSpan> Name on card is required</ErrorSpan>}
                {errors['cc-csc']?.type === 'pattern' && (
                  <ErrorSpan> scc is in correct format ex : 123 or 4513</ErrorSpan>
                )}
              </Label>
            </div>

            <div className="w-full mt-2 pt-2 flex justify-center items-center">
              <button
                type="submit"
                className=" rounded-md bg-green-500 px-6 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-green-400 mx-auto"
              >
                validate
              </button>
            </div>
          </form>
        </div>
      </div>
      <ConfirmModal showModal={showModal} setShowModel={setShowModel} setConfirm={setConfirm} />
      <ResultModal showResult={showResult} setShowResult={setShowResult} />
    </div>
  );
};

export default Payment;
