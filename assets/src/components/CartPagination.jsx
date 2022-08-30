import React from 'react';

const CartPagination = ({ currentPage, cartList, indexOfFirstBook, indexOfLastBook, setCurrentPage }) => {
  return (
    <div className="flex justify-around ">
      {cartList[indexOfFirstBook - 1] && (
        <button
          className="bg-blue-500 text-white rounded-md py-1 px-2 text-xs sm:text-sm"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          {' '}
          {'<<'} previous{' '}
        </button>
      )}
      {cartList[indexOfLastBook] && (
        <button
          className="bg-blue-500 text-white rounded-md py-1 px-2 text-xs sm:text-sm"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next {'>>'}
        </button>
      )}
    </div>
  );
};

export default CartPagination;
