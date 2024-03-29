import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useAuth } from '../contexts/OrderContext';
import fetchData, { onAdd } from '../hooks';
import { buttonClasses } from '../layouts/helpers';

const Book = () => {
  const { data: userData } = useAuth();
  const { id } = useParams();
  const [book, setBook] = useState({ loading: true, data: null });
  const [cartList, setCartList] = useState(JSON.parse(localStorage.getItem('SHOPPING-CART')) || []);

  useEffect(() => {
    fetchData(`/api/books/${id}`, setBook).then((res) => {
      // implement user Coefficient
      if (userData) {
        res.data.price = Number(res.data.price) * userData.Coef;
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('SHOPPING-CART', JSON.stringify(cartList));
    if (!JSON.parse(localStorage.getItem('SHOPPING-CART')).length) {
      localStorage.removeItem('SHOPPING-CART');
    }
  }, [cartList]);
  const { loading, data } = book;

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full  bg-slate-200 py-3 min-h-screen">
      <div className="flex flex-col justify-center p-8 bg-white shadow-md sm:rounded-lg w-5/6 h-5/6  2xl:w-3/5 ">
        <div className="md:grid md:grid-cols-2 md:gap-2 flex flex-col items-center justify-center w-full overflow-hidden lg:overflow-auto">
          <div className="md:col-span-1 md:self-center pb-8 md:p-0">
            <img
              className=" md:object-center md:w-60 w-52 shadow-md "
              src={`/images/books/${data.photo}`}
              alt={data.title}
            />
            <div className="mt-5 space-y-1 text-lg">
              <p className="text-gray-900 font-semibold ">
                Author : <span className="text-gray-600 capitalize">{data.author}</span>
              </p>

              <p className="text-gray-900 font-semibold ">
                Released : <span className="text-green-500 capitalize">{data.releaseDate}</span>
              </p>

              <p className="text-gray-900 font-semibold">
                Price : <span className="text-red-400">{data.price}€</span>{' '}
              </p>
            </div>
          </div>
          <div className="mx-auto col-span-1 text-center overflow-y-scroll md:overflow-auto">
            <div className="p-1 xl:p-2  border-none">
              <h2 className="text-center text-base xl:text-2xl font-semibold">{data.title}</h2>
              <br />
            </div>
            <div className="">
              <p className="text-left text-sm xl:text-base ">{data.description}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-4 sm:space-x-10 mt-10 p-4">
          <Link to="/" className={buttonClasses('gray')}>
            back to list
          </Link>

          <button
            onClick={() => onAdd(data, setCartList, cartList)}
            className=" flex justify-center items-center px-2 py-1 md:px-4 md:py-2 bg-green-400 border border-transparent rounded-md font-semibold text-xs md:text-sm text-white uppercase tracking-widest hover:bg-green-700 active:bg-green-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 sm:text-sm "
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;
