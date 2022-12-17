import React, { useState } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';
import { onAdd, onRemove, deleteBook, globalTotal, taxTotal, bookTotal } from '../hooks';
import CartPagination from '../components/CartPagination';
import { Td, Th } from '../components/uis/Table';
import { buttonClasses } from './helpers';

const Cart = ({ cartList, showCart, setShowCart, setCartList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentList = cartList.slice(indexOfFirstBook, indexOfLastBook);

  let bg =
    'fixed top-0 right-0 left-0 bottom-0 w-screen bg-gray-700/75 transition-all ease-in-out duration-300 min-h-screen';
  let cartClasses =
    'bg-white rounded-md sm:rounded-lg p-1 md:p-4 z-50 w-11/12 md:w-5/6 lg:w-4/6 transtion-all duration-500 mx-auto ';

  if (showCart) {
    bg += ' z-20';
    cartClasses += ' translate-y-6';
  } else {
    bg += ' -z-20';
    cartClasses += ' transtale-y-0';
  }

  return (
    <div onClick={() => setShowCart(false)} className={bg} role="presentation">
      <div onClick={(e) => e.stopPropagation()} className={cartClasses} role="presentation">
        <div className="flex flex-col">
          <div className=" sm:rounded-lg z-50">
            {cartList.length === 0 && <h1 className="text-center text-xl"> shopping cart is empty </h1>}
            {cartList.length > 0 && (
              <>
                <table className="w-full divide-y divide-gray-200 opacity-100 z-50 tra">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className=" hidden md:table-cell px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Book
                      </th>
                      <Th>Title</Th>
                      <Th>Price</Th>
                      <Th>Qty</Th>
                      <Th>Total</Th>
                      <Th>Tax</Th>
                      <th
                        scope="col"
                        className="p-1 sm:px-2 sm:py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                      >
                        actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentList.map((book) => {
                      return (
                        <tr key={book.id}>
                          <td className="hidden p-2 whitespace-nowrap md:table-cell h-20 w-20  rounded-full ring-2 ring-white ">
                            <img
                              className=" border-white h-full object-cover"
                              src={`images/books/${book.photo}`}
                              alt={book.title}
                            />
                          </td>
                          <Td>{book.title}</Td>
                          <Td>{Number(book.price).toFixed(2)}€</Td>
                          <Td>{book.qty}</Td>
                          <Td>{bookTotal(book).toFixed(2)}€</Td>
                          <Td>{taxTotal(book).toFixed(2)}€</Td>
                          <td className="p-1 sm:p-2 table-cell">
                            <div className="flex items-center justify-between ">
                              <button
                                onClick={() => onAdd(book, setCartList, cartList)}
                                className="px-2 sm:px-3 py-1  bg-green-700 border border-transparent rounded-md font-semibold text-white hover:bg-green-900 active:bg-green-900 focus:outline-none focus:border-gray-900 focus:ring ring-green-300 disabled:opacity-25 transition ease-in-out duration-150 text-xs sm:text-sm"
                              >
                                +
                              </button>
                              <button
                                onClick={() => onRemove(book, setCartList, cartList)}
                                className="px-2 sm:px-3 py-1 bg-orange-700 border border-transparent rounded-md font-semibold text-white uppercase tracking-widest hover:bg-orange-900 active:bg-orange-900 focus:outline-none focus:border-orange-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 text-xs sm:text-sm"
                              >
                                -
                              </button>
                              <button
                                onClick={() => deleteBook(book.id, setCartList, cartList)}
                                className="text-3xl cursor-pointer text-red-500 hover:text-red-700 mx-1 "
                              >
                                <TiDeleteOutline />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="mt-2 px-10 border-t-2 border-gray-200 flex w-full justify-between items-center">
                  <span className="uppercase text-sm sm:text-lg font-semibold">Total :</span>
                  <span className="text-sm sm:text-lg font-semibold">{globalTotal(cartList).toFixed(2)}€</span>
                </div>
              </>
            )}
            <CartPagination
              currentPage={currentPage}
              cartList={cartList}
              indexOfFirstBook={indexOfFirstBook}
              indexOfLastBook={indexOfLastBook}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
        <div className="p-2 flex justify-around items-center border-gray-200 ">
          {cartList.length > 0 && (
            <a href="/ordering" className={buttonClasses('green')}>
              ordering
            </a>
          )}
          <button onClick={() => setShowCart(false)} className={buttonClasses('gray')}>
            back to list
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
