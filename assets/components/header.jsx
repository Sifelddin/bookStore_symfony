import React from 'react';
import { BsCart4 } from 'react-icons/bs';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Header = ({ show, cartList }) => {

  return (
    <>
        <div className='flex justify-end items-center'>
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
    </>
  );
};

export default Header;
