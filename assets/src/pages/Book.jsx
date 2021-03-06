import React, { useState, useEffect } from 'react';
import MDate from 'mini-date-format';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import fetchData, { onAdd } from '../hooks';

const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState({ loading: true, data: null });
  const [cartList, setCartList] = useState(
    JSON.parse(localStorage.getItem('SHOPPING-CART')) || [],
  );

  useEffect(() => {
    fetchData(`/api/books/${id}`, setBook);
  }, []);

  useEffect(() => {
    localStorage.setItem('SHOPPING-CART', JSON.stringify(cartList));
    JSON.parse(localStorage.getItem('SHOPPING-CART')).length > 0 ||
      localStorage.removeItem('SHOPPING-CART');
  }, [cartList]);
  const { loading, data } = book;

  if (loading) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <Spinner />
      </div>
    );
  } else {
    return (
      <>
        <div className='flex items-center justify-center w-full h-screen bg-slate-900'>
          <div className='flex flex-col justify-center p-8 bg-white shadow-md sm:rounded-lg w-5/6 h-5/6  2xl:w-3/5 '>
            <div className='md:grid md:grid-cols-2 md:gap-2 flex flex-col items-center justify-center w-full overflow-hidden lg:overflow-auto'>
              <div className='md:col-span-1 md:self-center pb-8 md:p-0'>
                <img
                  className=' md:object-center md:w-60 w-52 shadow-md '
                  src={'/uploads/images/' + data.photo}
                />
                <div>
                  <p className='mt-5 text-gray-700'>Author : {data.author}</p>

                  <p className='text-left text-gray-700'>
                    Released :{' '}
                    {data.releaseDate
                      ? MDate(
                          'YYYY-MM-DD',
                          data.releaseDate.replace(/[a-zA-Z]/g, ' '),
                        )
                      : ''}
                  </p>

                  <p className='text-left text-gray-700'>
                    Price : {data.price}???
                  </p>
                </div>
              </div>
              <div className='mx-auto col-span-1 text-center overflow-y-scroll md:overflow-auto'>
                <div className='p-1 xl:p-2  border-none'>
                  <h2 className='text-center text-base xl:text-2xl font-semibold'>
                    {' '}
                    {data.title}{' '}
                  </h2>
                  <br />
                </div>
                <div className=''>
                  <p className='text-left text-sm xl:text-base '>
                    {data.description}
                  </p>
                </div>
              </div>
            </div>
            <div className='flex justify-around items-center mt-10'>
              <Link
                to={'/'}
                className='flex justify-center items-center px-4 py-2 mt-2 md:mt-4 bg-gray-700 border border-transparent rounded-md font-semibold text-xs md:text-sm text-white uppercase tracking-widest hover:bg-gray-900 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150'>
                back to list
              </Link>

              <button
                onClick={() => onAdd(data, setCartList, cartList)}
                className=' flex justify-center items-center px-4 py-2 mt-4 bg-green-400 border border-transparent rounded-md font-semibold text-xs md:text-sm text-white uppercase tracking-widest hover:bg-green-700 active:bg-green-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150'>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Book;
