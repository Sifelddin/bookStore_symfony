import React, { useState, useEffect, useRef } from 'react';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import fetchData from '../hooks';

const Categories = ({ select }) => {
  const [pageUrl, setPageUrl] = useState(
    '/api/categories?exists%5BcatParent%5D=false&exists%5BsubCategories%5D=true&page=1',
  );
  const [categories, setCategories] = useState({ loading: true, data });
  const elements = useRef([]);

  useEffect(() => {
    fetchData(pageUrl, setCategories);
  }, [pageUrl]);

  const { loading, data } = categories;

  const addToRefs = (el) => {
    if (el && !elements.current.includes(el)) {
      elements.current.push(el);
    }
  };

  const addStyles = (cat) => {
    let styles = ['border-green-400', 'shadow-green-300'];
    elements.current.map((el) => {
      cat.target.id === el.id
        ? el.classList.add(...styles)
        : el.classList.remove(...styles);
    });
  };

  if (loading) {
    return <Spinner />;
  } else {
    let catsClasses =
      'mt-2 p-2 w-full lg:block grid md:grid-cols-4 grid-cols-2 sm:grid-cols-3';
    if (data['hydra:totalItems'] > 8) {
      catsClasses += ' border-b-2';
    }
    return (
      <>
        <h2 className='text-base sm:text-xl text-center uppercase'>
          Main Categories
        </h2>
        <div className='p-1 xl:p-3 md:pt-3 bg-stone-50 my-2 shadow-md rounded-md'>
          <span className='uppercase text-gray-500 pl-4 text-sm sm:text-base'>
            total categories : <strong>{data['hydra:totalItems']}</strong>
          </span>
          <div className={catsClasses}>
            {data['hydra:member'].map((cat) => {
              return (
                <div className='flex items-center m-1' key={cat.id}>
                  <img
                    id={cat.id}
                    className=' md:block w-14 h-14 xl:w-16 xl:h-16  rounded-full m-0 border-4 border-white shadow-md cursor-pointer'
                    ref={addToRefs}
                    onClick={(e) => {
                      addStyles(e), select(cat);
                    }}
                    src={'images/categories/' + cat.photo}
                    alt={cat.title}
                  />
                  <h3 className='mx-2 text-sm xl:text-base'>{cat.name}</h3>
                </div>
              );
            })}
          </div>
          <Pagination data={data} setPageUrl={setPageUrl} />
        </div>
      </>
    );
  }
};

export default Categories;
