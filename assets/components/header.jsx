import React from 'react';
import { BsCart4 } from 'react-icons/bs';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Header = ({ show, cartList }) => {
  const localStorageOrder = localStorage.getItem('ORDER');
  const localStorageCart = localStorage.getItem('SHOPPING-CART');

  return (
    <>
      <div className='flex items-center justify-between'>
        <div>
          {localStorageCart && (
            <Link
              to={'/shipping'}
              className='underline text-gray-700 hover:text-black mx-2 p-1 uppercase'>
              {' '}
              shipping{'>>'}
            </Link>
          )}
          {localStorageOrder && (
            <Link
              to={'/placeorder'}
              className='underline text-gray-700 hover:text-black mx-2 p-1 uppercase'>
              {' '}
              placeorder{'>>'}
            </Link>
          )}
        </div>
        <div className='flex justify-end items-center p-4 m-2'>
          <div className='flex justify-center items-center'>
            <span className='bg-red-700 rounded-full text-white text-lg px-2'>
              {cartList && cartList.length > 0 ? cartList.length : null}
            </span>
            <BsCart4
              onClick={() => {
                show(true);
              }}
              className='text-lg  w-10 h-10 cursor-pointer'
            />
          </div>
          <BsSearch className='text-lg m-4  w-8 h-8' />
        </div>
      </div>
    </>
  );
};

export default Header;
