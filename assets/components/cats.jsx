import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Spinner from './Spinner';

export const Cats = ({ select }) => {
  const [pageUrl, setPageUrl] = useState(
    '/api/categories?exists%5BcatParent%5D=false&exists%5BsubCategories%5D=true&page=1',
  );
  const [categories, setCategories] = useState({ loadCategories: true, data });
  const elements = useRef([]);

  console.log('categories render');
  useEffect(() => {
    axios
      .get(pageUrl)
      .then((res) => {
        setCategories({ loadCategories: false, data: res.data });
      })
      .catch((e) => console.log(e));
  }, [pageUrl]);

  const { loadCategories, data } = categories;

  const getUrlPerPage = (hydraView) =>
    data['hydra:view'][hydraView] && setPageUrl(data['hydra:view'][hydraView]);

  const btnClasses =
    'flex justify-center items-center px-2 py-1 mt-2 cursor-pointer border border-transparent rounded-md font-medium text-sm text-gray-600 tracking-widest hover:underline active:text-gray-800  disabled:opacity-25 transition ease-in-out duration-150';

  const addToRefs = (el) => {
    if (el && !elements.current.includes(el)) {
      elements.current.push(el);
    }
  };

  const addStyles = (cat) => {
    let styles = ['border-green-400'];
    elements.current.map((el) => {
      cat.target.id === el.id
        ? el.classList.add(...styles)
        : el.classList.remove(...styles);
    });
  };

  if (loadCategories) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <Spinner />
      </div>
    );
  } else {
    let catsClasses = 'grid xl:grid-cols-2 xl:gap-2 p-2 w-full';
    if (data['hydra:totalItems'] > 8) {
      catsClasses += ' border-b-2';
    }

    return (
      <div className='p-3 bg-orange-50 my-2 shadow-md rounded-md'>
        <span className='uppercase text-gray-500 pl-4'>
          total categories : <strong>{data['hydra:totalItems']}</strong>
        </span>
        <div className={catsClasses}>
          {data['hydra:member'].map((cat) => {
            return (
              <div
                className='flex items-center cursor-pointer'
                key={cat.id}
                onClick={() => {
                  select(cat);
                }}>
                <img
                  id={cat.id}
                  className='w-16 h-16 rounded-full m-0 border-4 border-white shadow-md '
                  ref={addToRefs}
                  onClick={(e) => addStyles(e)}
                  src={'uploads/images/' + cat.photo}
                  alt={cat.title}
                />
                <h3 className='mx-2'>{cat.name}</h3>
              </div>
            );
          })}
        </div>
        {data['hydra:totalItems'] > 8 && (
          <div className='flex justify-around w-full my-2 '>
            <button
              onClick={() => getUrlPerPage('hydra:first')}
              className={btnClasses}>
              first
            </button>
            {data['hydra:view']['hydra:previous'] && (
              <button
                onClick={() => getUrlPerPage('hydra:previous')}
                className={btnClasses}>
                {'<<'}prev
              </button>
            )}
            {data['hydra:view']['hydra:next'] && (
              <button
                onClick={() => getUrlPerPage('hydra:next')}
                className={btnClasses}>
                next {'>>'}
              </button>
            )}
            <button
              onClick={() => getUrlPerPage('hydra:last')}
              className={btnClasses}>
              last
            </button>
          </div>
        )}
      </div>
    );
  }
};
