import React, { useState } from 'react';

import { TiDeleteOutline } from 'react-icons/ti';

export const Cart = ({ cartList, showCart, onAdd, onRemove, deleteBook ,setShowCart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(5);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentList = cartList.slice(indexOfFirstBook, indexOfLastBook);

  console.log(indexOfLastBook , 'indexOfLastBook');
  console.log(indexOfFirstBook , 'indexOfFirstBook');;

  const globalTotal = cartList.reduce(
    (a, c) => a + c.qty * c.price * (1 + 10 / 100),
    0,
  );
  const bookTotal = (book) => book.qty * book.price * (1 + 10 / 100);
  const taxTotal = (book) => (book.qty * book.price * 10) / 100;

  let bg = 'fixed top-0 right-0 left-0 bottom-0 h-screen w-screen bg-gray-700/75 transition-all ease-in-out duration-300'
  let cartClasses = 'bg-white sm:rounded-lg p-6 z-50 w-5/6 lg:w-4/6 transtion-all duration-500 mx-auto';
    console.log(showCart);
  showCart ? (bg += " z-20" ,cartClasses += ' translate-y-20') : (bg += " -z-20" , cartClasses += ' transtale-y-0')
  


  return (
    <div onClick={(e) => { setShowCart(false) ; e.stopPropagation() }} className={bg}>
        <div onClick={(e) => { e.stopPropagation()}} className={cartClasses}>
          <div className='flex flex-col'>
                <div className=' sm:rounded-lg z-50'>
                  {cartList.length == 0 && (
                    <h1 className='text-center text-xl'>
                      {' '}
                      shopping cart is empty{' '}
                    </h1>
                  )}
                  {cartList.length > 0 && ( <>
                    <table className='w-full divide-y divide-gray-200 opacity-100 z-50'>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th
                            scope='col'
                            className='px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Book
                          </th>
                          <th
                            scope='col'
                            className='px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Title
                          </th>
                          <th
                            scope='col'
                            className='px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Price
                          </th>
                          <th
                            scope='col'
                            className='px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Quantity
                          </th>
                          <th
                            scope='col'
                            className='px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Total
                          </th>
                          <th
                            scope='col'
                            className='px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Tax Price
                          </th>
                          <th
                            scope='col'
                            className='px-2 pyonRemove-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentList.map((book) => {
                          return (
                            <tr key={book.id}>
                              <td className='px-4 py-4 whitespace-nowrap inline-block h-28 w-28  rounded-full ring-2 ring-white '>
                                <img
                                  className=' border-white h-full object-cover'
                                  src={'uploads/images/' + book.photo}
                                />
                              </td>
                              <td className='px-2 py-2'>{book.title}</td>
                              <td className='px-2 py-2'>{book.price}€</td>
                              <td className='px-2 py-2'>{book.qty}</td>
                              <td className='px-2 py-2'>
                                {bookTotal(book).toFixed(2)}€
                              </td>
                              <td className='px-2 py-2'>
                                {taxTotal(book).toFixed(2)}€
                              </td>
                              <td className='px-2 py-2 flex justify-around items-center'>
                                <button
                                  onClick={() => onAdd(book)}
                                  className='px-3 py-1  bg-green-700 border border-transparent rounded-md font-semibold text-white uppercase tracking-widest hover:bg-green-900 active:bg-green-900 focus:outline-none focus:border-gray-900 focus:ring ring-green-300 disabled:opacity-25 transition ease-in-out duration-150 text-lg'>
                                  +
                                </button>{' '}
                                <button
                                  onClick={() => onRemove(book)}
                                  className=' px-3 py-1 bg-red-700 border border-transparent rounded-md font-semibold text-white uppercase tracking-widest hover:bg-red-900 active:bg-red-900 focus:outline-none focus:border-red-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 text-lg'>
                                  -
                                </button>
                                <span
                                  onClick={() => deleteBook(book.id, cartList)}
                                  className='text-3xl cursor-pointer text-red-500 hover:text-red-700 mx-4'>
                                  <TiDeleteOutline></TiDeleteOutline>
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <div className='mt-4 px-5 border-t-2 border-gray-200 flex justify-between items-center' >
                    
                          <span scope='row' className='uppercase text-lg w-full'>
                            Total :
                          </span>
                          <span className=' py-2 my-2 text-xl'>
                            {globalTotal.toFixed(2)}€
                          </span>
                      
                      </div>
                      </>
                  )}
                  <div className='flex justify-around '>
                    {cartList[indexOfFirstBook - 1] && (
                      <button
                        className='bg-blue-500 text-white rounded-md p-2'
                        onClick={() => setCurrentPage(currentPage - 1)}>
                        {' '}
                        {'<<'} previous{' '}
                      </button>
                    )}
                    {cartList[indexOfLastBook] && (
                      <button
                        className='bg-blue-500 text-white rounded-md p-2'
                        onClick={() => setCurrentPage(currentPage + 1)}>
                        Next {'>>'}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className='p-4 flex justify-around items-center border-gray-200'>
                {cartList.length > 0 && (
                  <button className='flex  justify-center items-center px-2 py-2 bg-blue-700 border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:border-gray-100 focus:ring ring-gray-100 disabled:opacity-25 transition ease-in-out duration-150 w-onRemovefit'>
                    <a href='/shipping'> Shipping</a>{' '}
                  </button>
                )}
                <button
                  onClick={(e) =>{ e.stopPropagation(); setShowCart(false)}}
                  className='flex justify-center items-center px-4 py-2 mt-4 bg-gray-700 border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-gray-900 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150'>
                  back to list
                </button>
              </div>
            </div>
    </div>
  );
};
