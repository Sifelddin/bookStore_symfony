import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';

export const Books = ({ catBooks, onAdd }) => {
  const [books, setBooks] = useState({ LoadBooks: true, data });
  const [pageUrl, setPageUrl] = useState(null);

  const getUrlPerPage = (hydraView) =>
    setPageUrl(data['hydra:view'][hydraView]);

  useEffect(() => {
    if (catBooks) {
      setBooks({LoadBooks: true, data})
      axios
        .get(`/api/books?page=1&category=${catBooks.id}&published=true`)
        .then((res) => setBooks({ LoadBooks: false, data: res.data }))
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`api/books?page=1&published=true`)
        .then((res) => setBooks({ LoadBooks: false, data: res.data }))
        .catch((err) => console.log(err));
    }
  }, [catBooks]);

  useEffect(() => {
    if (pageUrl) {
      axios
        .get(pageUrl)
        .then((res) => setBooks({ LoadBooks: false, data: res.data }))
        .catch((err) => console.log(err));
    }
  }, [pageUrl]);

  const btnClasses =
    'flex justify-center items-center px-2 py-1 cursor-pointer border border-transparent rounded-md font-medium text-sm text-gray-600 tracking-widest hover:underline active:text-gray-800  disabled:opacity-25 transition ease-in-out duration-150';
  const { LoadBooks, data } = books;

  if (LoadBooks) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <Spinner />
      </div>
    );
  } else {
    console.log(data);
    let catsClasses = 'p-2 m-2';
    if (data['hydra:totalItems'] > 5) {
      catsClasses += ' border-b-2';
    }

    return (
      <div className=' bg-orange-50 my-2 pt-2 shadow-md rounded-md'>
        {catBooks && (
          <span className='uppercase text-gray-500 p-4'>
            total books of {catBooks.name} category :{' '}
            <strong>{data['hydra:totalItems']}</strong>
          </span>
        )}
        <div className={catsClasses}>
          {data['hydra:member'].map((book) => {
            return (
              <div
                className='flex items-center p-3 m-3 bg-white rounded-md shadow-sm hover:shadow-md hover:shadow-blue-200 transition-all duration-300'
                key={book.id}>
                <div className='mr-2'>
                  <Link to={`book/${book.slug}/${book.id}`}>
                    <img
                      className='cursor-pointer w-24 h-auto'
                      src={'uploads/images/' + book.photo}
                      alt={book.photo}
                    />{' '}
                  </Link>
                </div>
                <div className='ml-2'>
                  <h3 className='text-lg text-blue-500 hover:text-blue-800 duration-150 cursor-pointer'>
                    {' '}
                    <Link to={`book/${book.slug}/${book.id}`}>
                      {book.title}
                    </Link>
                  </h3>
                  <span className='text-lg text-red-400'>{book.price}€</span>
                  <p className='text-gray-700'> Author : {book.author}</p>
                  <button
                    onClick={() => onAdd(book)}
                    className=' flex justify-center items-center px-2 py-1 mt-2 bg-green-400 border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-green-700 active:bg-green-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150'>
                    Add To Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {data['hydra:totalItems'] > 5 && (
          <div className='w-full flex justify-around'>
            <span
              onClick={() => getUrlPerPage('hydra:first')}
              className={btnClasses}>
              First Page
            </span>
            {data['hydra:view']['hydra:previous'] && (
              <span
                onClick={() => getUrlPerPage('hydra:previous')}
                className={btnClasses}>
                {'<<'}Prev
              </span>
            )}
            {data['hydra:view']['hydra:next'] && (
              <span
                onClick={() => getUrlPerPage('hydra:next')}
                className={btnClasses}>
                Next {'>>'}
              </span>
            )}
            <span
              onClick={() => getUrlPerPage('hydra:last')}
              className={btnClasses}>
              Last Page
            </span>
          </div>
        )}
      </div>
    );
  }
};
