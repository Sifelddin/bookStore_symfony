import React from 'react';
import { BsCart4, BsSearch } from 'react-icons/bs';

const Header = ({ showCart, cartList, setShowSearchBar }) => {
  return (
    <div className="flex justify-end items-center py-4">
      <div className="flex justify-center items-center">
        <span className="bg-red-700 rounded-full text-white text-lg px-2 relative left-1">
          {cartList && cartList.length > 0 ? cartList.length : null}
        </span>
        <BsCart4
          onClick={() => {
            showCart(true);
          }}
          className="text-lg w-10 h-10 cursor-pointer hover:text-gray-600 hover:-translate-y-1 duration-200"
        />
      </div>
      <BsSearch
        onClick={() => setShowSearchBar(true)}
        className="text-lg m-4  w-8 h-8 cursor-pointer hover:text-gray-600 hover:-translate-y-1 duration-200 "
      />
    </div>
  );
};

export default Header;
