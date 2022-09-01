import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Label from '../src/components/uis/Label';
import ErrorSpan from '../src/components/uis/ErrorSpan';
import fetchData, { inputDivClasses, inputfeildClasses } from '../src/hooks';
import Spinner from '../src/components/Spinner';

const Form = () => {
  const [user, setUser] = useState({ loading: true, data: undefined });
  useEffect(() => {
    fetchData('/api/me', setUser);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios({
        method: 'PATCH',
        headers: { 'Content-Type': 'application/merge-patch+json' },
        data,
        url: user.data['@id']
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  const { loading, data } = user;
  console.log(loading);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className=" h-screen w-full flex flex-col justify-center items-center">
      <div className=" sm:w-10/12 xl:w-3/5 md:w-4/5 p-3 bg-white rounded-md shadow-md">
        <h2 className="text-lg sm:text-2xl uppercase my-3 border-b-gray-200 border-solid border-b-2">
          {`${data?.firstname} ${data?.lastname}`}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-auto sm:grid sm:grid-cols-2 sm:gap-x-2 items-center">
            <div className="col-span-1 ">
              <div className={inputDivClasses}>
                <Label labelfeild="Address">
                  Address
                  <input
                    type="text"
                    id="Address"
                    className={inputfeildClasses}
                    defaultValue={data?.address}
                    {...register('address', {
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
                <Label labelfeild="City">
                  City
                  <input
                    type="text"
                    id="City"
                    className={inputfeildClasses}
                    defaultValue={data?.city}
                    {...register('city', {
                      required: true,
                      minLength: 3,
                      maxLength: 100,
                      pattern: /^[a-zA-Z]+(\s[a-zA-Z]+)?$/gi
                    })}
                  />
                  {errors.city?.type === 'required' && <ErrorSpan> City is required !</ErrorSpan>}
                  {errors.city?.type === 'minLength' && <ErrorSpan>City at least 3 characters !</ErrorSpan>}
                  {errors.city?.type === 'maxLength' && <ErrorSpan>City maximum 100 characters !</ErrorSpan>}
                  {errors.city?.type === 'pattern' && <ErrorSpan>only letter please !</ErrorSpan>}{' '}
                </Label>
              </div>

              <div className={inputDivClasses}>
                <Label labelfeild="zipCode">
                  ZipCode
                  <input
                    type="text"
                    id="zipCode"
                    className={inputfeildClasses}
                    defaultValue={data?.zipCode}
                    {...register('zipCode', {
                      required: true,
                      pattern: /^[0-9]{5}$/
                    })}
                  />
                  {errors.zipCode?.type === 'required' && <ErrorSpan> zipCode is required</ErrorSpan>}
                  {errors.zipCode?.type === 'pattern' && <ErrorSpan>zipCode must be correct ex: 75380</ErrorSpan>}
                </Label>
              </div>
            </div>
            <div className="col-span-1 ">
              <div className={inputDivClasses}>
                <Label labelfeild="firstName">
                  {' '}
                  firstName
                  <input
                    type="text"
                    id="shipCity"
                    className={inputfeildClasses}
                    defaultValue={data?.firstname}
                    {...register('firstname', {
                      required: true,
                      minLength: 3,
                      maxLength: 100
                    })}
                  />
                  {errors.firstname?.type === 'required' && <ErrorSpan>City is required</ErrorSpan>}
                  {errors.firstname?.type === 'minLength' && <ErrorSpan>City at least 3 characters</ErrorSpan>}
                  {errors.firstname?.type === 'maxLength' && <ErrorSpan>City maximum 100 characters</ErrorSpan>}
                </Label>
              </div>

              <div className={inputDivClasses}>
                <Label labelfeild="lastName">
                  LastName
                  <input
                    type="text"
                    name="billZipCode"
                    id="lastName"
                    className={inputfeildClasses}
                    defaultValue={data?.lastname}
                    {...register('lastname', {
                      required: true,
                      minLength: 3,
                      maxLength: 100
                    })}
                  />
                  {errors.lastname?.type === 'required' && <ErrorSpan>zipCode is required</ErrorSpan>}
                  {errors.lastname?.type === 'minLength' && <ErrorSpan>City at least 3 characters</ErrorSpan>}
                  {errors.lastname?.type === 'maxLength' && <ErrorSpan>City maximum 100 characters</ErrorSpan>}
                </Label>
              </div>
              <div className={inputDivClasses}>
                <Label labelfeild="phone">
                  Phone Number
                  <input
                    type="text"
                    id="phone"
                    className={inputfeildClasses}
                    defaultValue={data?.phone}
                    {...register('phone', {
                      required: true
                    })}
                  />
                  {errors.phone?.type === 'required' && <ErrorSpan>Address is required</ErrorSpan>}
                </Label>
              </div>
            </div>
            <div className="w-full col-span-2">
              <Label labelfeild="Email">
                Email
                <input
                  type="text"
                  id="Email"
                  className={inputfeildClasses}
                  defaultValue={data?.email}
                  {...register('email', {
                    required: true
                  })}
                />
                {errors.phone?.type === 'required' && <ErrorSpan>Address is required</ErrorSpan>}
              </Label>
            </div>
          </div>
          <div className="w-full flex justify-center items-center p-2 mt-2">
            <button
              type="submit"
              className="inline-block rounded-md bg-green-500 px-6 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-green-400"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
