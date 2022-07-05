import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import fetchData from './hooks';

const Summary = () => {


  const books = JSON.parse(localStorage.getItem('SHOPPING-CART'));
  const order = JSON.parse(localStorage.getItem('ORDER'));


  const [send, setSend] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(5);
  const [user, setUser] = useState({ loading: true, data });
  const {loading, data} = user


  useEffect(() => {
    fetchData('api/me', setUser);
  }, []);
  useEffect(() =>{
  if(!loading && order){
    order.userClient !== data['@id'] && (localStorage.removeItem('ORDER'))
}
  (books === null || localStorage.getItem('ORDER') === null) && location.assign('/');
},[order,user])

  const register = () => {
    if(order.isPrivate){
      location.assign('/payment')
    }else{
      setSend(confirm('you confirm you registration ?'))
    }
  };
  useEffect(() => {
    if (send) {

      axios
        .post('https://localhost:8000/api/orders', order)
        .then((res) => {
          books.map((book) => {
            axios
              .post('https://localhost:8000/api/book_orders', {
                quantity: book.qty,
                unitPrice: book.price,
                book: book['@id'],
                order: res.data['@id'],
              })
              .then((res) => console.log(res.data))
              .catch((err) => console.log(err));
          });
          localStorage.removeItem('ORDER');
          localStorage.removeItem('SHOPPING-CART');
          alert('your order has been registered');
          location.assign('/');
        })
        .catch((err) => console.log(err));
    }
  }, [send]);


 
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const total = books.reduce((a, c) => a + c.qty * c.price * (1 + 20 / 100), 0);
  const taxTotal = books.reduce((a, c) => a + (c.qty * c.price * 20) / 100, 0);

  return (
    <div className='lg:h-screen w-full flex flex-col justify-center items-center'>
      <div className='md:w-4/5 py-2 my-2'>
        <Link
          to={'/'}
          className='underline text-gray-700 hover:text-black mx-2 p-1'>
          {' '}
          {'<<'}store{' '}
        </Link>
        <Link
          to={'/shipping'}
          className='underline text-gray-700 hover:text-black mx-2 p-1'>
          {'<<'}shipping{' '}
        </Link>
        <span></span>
      </div>
      <div className='md:grid md:grid-cols-4 w-11/12 xl:w-4/5 mx-auto bg-white h-auto'>
        <div className=' col-span-3'>
          <div className='m-2 p-2 lg:p-3 lg:m-3 rounded-md bg-orange-50 shadow-md'>
            <div className='border-b-2 border-gray-300 pb-1'>
              {' '}
              <h2 className='text-base lg:text-lg uppercase text-gray-700'>
                Shipping Address :{' '}
              </h2>{' '}
              <p className=' my-1'>
                {order.shipAddress +
                  ' ' +
                  order.shipZipCode +
                  ' ' +
                  order.shipCity}
              </p>
            </div>

            <div className='border-b-2 border-gray-300 pb-1'>
              {' '}
              <h2 className='text-base lg:text-lg uppercase text-gray-700'>
                Billing Address :{' '}
              </h2>
              <p className=' my-1'>
                {' '}
                {order.billAddress +
                  ' ' +
                  order.billZipCode +
                  ' ' +
                  order.billCity}
              </p>
            </div>
            {order.payMethod && (
              <div>
                <h2 className='text-base lg:text-lg uppercase text-gray-700'>
                  Pay Method :
                </h2>{' '}
                <p className=' my-2'>{order.payMethod}</p>
              </div>
            )}
          </div>
          <div className='p-2 m-2 lg:p-3 lg:m-4 rounded-md bg-orange-50 shadow-md'>
            <h2 className='text-base lg:text-lg uppercase text-gray-700 m-1'>
              {' '}
              Order Books :
            </h2>
            {currentBooks && (
              <table className='pb-4 w-full'>
                <thead className='bg-orange-100 shadow-sm'>
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
                      className='px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Price
                    </th>
                    <th
                      scope='col'
                      className='px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Qty
                    </th>
                    <th
                      scope='col'
                      className='px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Tax Price
                    </th>
                    <th
                      scope='col'
                      className='px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      total without tax
                    </th>
                  </tr>
                </thead>

                <tbody className='w-full'>
                  {currentBooks.map((book) => {
                    return (
                      <tr key={book.id} className='w-full'>
                        <td className='my-2'>
                          <img
                            className=' border-white object-center h-24 w-20'
                            src={'uploads/images/' + book.photo}
                          />
                        </td>
                        <td className='px-2 py-2 max-w-sm whitespace-pre-wrap '>
                          {book.title}
                        </td>
                        <td className='px-2 py-2 max-w-sm whitespace-pre-wrap text-center'>
                          {book.price} €
                        </td>
                        <td className='px-2 py-2 max-w-sm whitespace-pre-wrap text-center'>
                          {book.qty}{' '}
                        </td>
                        <td className='px-2 py-2 max-w-sm whitespace-pre-wrap text-center'>
                          {((book.price * 20) / 100).toFixed(2)}€{' '}
                        </td>
                        <td className='px-2 py-2 max-w-sm whitespace-pre-wrap text-center'>
                          {(book.price * book.qty).toFixed(2)}€
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            <div className='flex justify-around '>
              {books[indexOfFirstBook - 1] && (
                <button
                  className='bg-blue-500 text-white rounded-md py-1 px-2 text-xs lg:text-sm'
                  onClick={() => setCurrentPage(currentPage - 1)}>
                  {' '}
                  {'<<'} previous{' '}
                </button>
              )}
              {books[indexOfLastBook] && (
                <button
                  className='bg-blue-500 text-white rounded-md py-1 px-2 text-xs lg:text-sm'
                  onClick={() => setCurrentPage(currentPage + 1)}>
                  Next {'>>'}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className=' col-span-1 m-2 p-1 lg:m-5 lg:p-5 bg-orange-50 shadow-md'>
          <h2 className='border-b-2 border-gray-200 pb-1 text-base lg:text-lg uppercase text-gray-700'>
            Order Summary:
          </h2>
          <div className='p-1 m-2'>
            <table className='w-full border-b-2 border-gray-200'>
              <tbody className='border-b-2 border-gray-200'>
                <tr className='flex justify-between w-full my-2'>
                  <th>Books</th>
                  <td className='text-base lg:text-lg'>{total.toFixed(2)}€</td>
                </tr>
                <tr className='flex justify-between w-full my-2'>
                  <th>Tax</th>
                  <td className='text-base lg:text-lg'>{taxTotal.toFixed(2)}€</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className='flex justify-between w-full py-2'>
                  <th>Total</th>
                  <td className='text-lg'>{(taxTotal + total).toFixed(2)}€</td>
                </tr>
              </tfoot>
            </table>
            <button
              onClick={() => register()}
              className='flex justify-center items-center px-4 py-2 mt-4 bg-green-500 border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-green-700 active:bg-green-800  focus:outline-none  focus:ring ring-green-300 disabled:opacity-25 transition ease-in-out duration-150 w-full'>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
