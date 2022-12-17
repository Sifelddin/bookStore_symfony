import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetchData, { implementCoefPrice, onAdd } from '../hooks';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import { useAuth } from '../contexts/OrderContext';

const Books = ({ subCategory, cartList, setCartList }) => {
  const [books, setBooks] = useState({ loading: true, data: undefined });
  const [pageUrl, setPageUrl] = useState(`api/books?page=1&published=true`);
  const { data: user } = useAuth();

  useEffect(() => {
    setBooks({ loading: true, data: undefined });
    if (subCategory) {
      fetchData(`/api/books?page=1&category=${subCategory.id}&published=true`, setBooks).then((res) => {
        if (user) {
          // add coef calculation
          implementCoefPrice(res.data['hydra:member'], user);
        }
      });
    } else {
      fetchData(pageUrl, setBooks).then((res) => {
        if (user) {
          // add coef calculation
          implementCoefPrice(res.data['hydra:member'], user);
        }
      });
    }
  }, [subCategory, pageUrl, user]);

  const { loading, data } = books;

  if (loading) {
    return <Spinner />;
  }

  let catsClasses = 'p-2 m-2';
  if (data['hydra:totalItems'] > 5) {
    catsClasses += ' border-b-2';
  }

  return (
    <div className=" bg-orange-50 my-2 pt-2 shadow-md rounded-md">
      {subCategory && (
        <span className="uppercase text-gray-500 p-4 text-sm sm:text-base">
          total books of {subCategory.name} category : <strong>{data?.['hydra:totalItems']}</strong>
        </span>
      )}
      <div className={catsClasses}>
        {data['hydra:member']?.map((book) => {
          return (
            <div
              className="flex items-center shadow-md m-1 p-1 md:p-3 md:m-3 bg-white rounded-md  hover:shadow-md hover:shadow-blue-200 transition-all duration-300"
              key={book.id}
            >
              <div className="mr-2 w-24 h-auto">
                <Link to={`book/${book.slug}/${book.id}`}>
                  <img
                    className="cursor-pointer w-20 md:w-24 h-auto table-cell  hover:scale-125 hover:-translate-x-0 duration-200"
                    src={`/images/books/${book.photo}`}
                    alt={book.title}
                  />
                </Link>
              </div>
              <div className="ml-2">
                <h3 className="text-base md:text-lg text-blue-500 hover:text-blue-800 duration-150 cursor-pointer">
                  <Link to={`book/${book.slug}/${book.id}`}>{book.title}</Link>
                </h3>
                <p className="text-gray-800">
                  {user?.private === false ? 'Professional :' : ''}
                  <span className="text-sm md:text-lg text-red-400">{Number(book.price).toFixed(2)}€</span>
                </p>
                <p className="text-gray-700 text-sm md:text-base"> Author : {book.author}</p>
                <button
                  onClick={() => onAdd(book, setCartList, cartList)}
                  className=" flex justify-center items-center px-2 py-1 mt-2 bg-green-400 border border-transparent rounded-md font-normal md:font-semibold text-xs sm:text-sm text-white uppercase md:tracking-widest hover:bg-green-700 active:bg-green-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination data={data} setPageUrl={setPageUrl} />
    </div>
  );
};

export default Books;
