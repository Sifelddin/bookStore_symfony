import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Label from '../components/uis/Label';
import ErrorSpan from '../components/uis/ErrorSpan';
import fetchData, { inputDivClasses, inputfeildClasses } from '../hooks';
import Spinner from '../components/Spinner';
import MessageModal from './UI/MessageModal';
import ConfirmModal from '../components/ConfirmModal';

const Form = () => {
  const [user, setUser] = useState({ loading: true, data: undefined });
  const [showModal, setShowModel] = useState(false);
  const [showResult, setShowResult] = useState(null);

  const serverErr = (field, message) => {
    setError(field, { type: `errors server`, message });
  };

  useEffect(() => {
    fetchData('/api/me', setUser);
  }, []);
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm();
  console.log(user.data);
  const onSubmit = async (data) => {
    try {
      const res = await axios({
        method: 'PATCH',
        headers: { 'Content-Type': 'application/merge-patch+json' },
        data,
        url: `/api/users/${user.data.id}`
      });
      if (res) {
        setShowResult('your profile has been updated succesfully .');
      }
    } catch (e) {
      if (e.response.data?.violations) {
        e.response.data?.violations?.map((violation) => {
          return serverErr(violation.propertyPath, violation.message);
        });
      } else {
        setShowResult('server error : something went wrong!');
      }
    }
  };
  const { loading, data } = user;

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
                  {errors.address?.type === 'required' && <ErrorSpan>Address is required</ErrorSpan>}
                  {errors.address?.type === 'minLength' && <ErrorSpan> Address at least 5 characters</ErrorSpan>}
                  {errors.address?.type === 'maxLength' && <ErrorSpan> Address maximum 255 characters</ErrorSpan>}
                  {errors.address?.type === 'errors server' && <ErrorSpan>{errors.address?.message}</ErrorSpan>}
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
                  {errors.city?.type === 'pattern' && <ErrorSpan>only letter please !</ErrorSpan>}
                  {errors.city?.type === 'errors server' && <ErrorSpan>{errors.city?.message}</ErrorSpan>}
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
                  {errors.zipCode?.type === 'errors server' && <ErrorSpan>{errors.zipCode?.message}</ErrorSpan>}
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
                  {errors.firstname?.type === 'errors server' && <ErrorSpan>{errors.firstname?.message}</ErrorSpan>}
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
                  {errors.lastname?.type === 'errors server' && <ErrorSpan>{errors.lastname?.message}</ErrorSpan>}
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
                  {errors.phone?.type === 'errors server' && <ErrorSpan>{errors.phone?.message}</ErrorSpan>}
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
                {errors.email?.type === 'errors server' && <ErrorSpan>{errors.email?.message}</ErrorSpan>}
              </Label>
            </div>
          </div>
          <div className="w-full flex justify-center items-center p-2 mt-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (Object.entries(errors).length === 0) {
                  setShowModel(true);
                }
              }}
              type="submit"
              className="inline-block rounded-md bg-green-500 px-6 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-green-400"
            >
              Edit
            </button>
          </div>
          <ConfirmModal
            showModal={showModal}
            setShowModel={setShowModel}
            message="do you confim your modifications ?"
          />
        </form>
      </div>
      <MessageModal showResult={showResult} setShowResult={setShowResult} />
    </div>
  );
};

export default Form;
