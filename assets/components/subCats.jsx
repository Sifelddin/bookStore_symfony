
import React, { useState, useEffect, useRef } from 'react';
import fetchData from './hooks';
import Pagination from './Pagination';
import Spinner from './Spinner';

export const SubCats = ({ catParent, setCatBooks }) => {
  const [subCategories, setSubCategories] = useState({
    loading: true,
    data,
  });
  const [pageUrl, setPageUrl] = useState(null);
  const elements = useRef([]);

  useEffect(() => {
    if (catParent) {
        fetchData(`api/categories?page=1&catParent.name=${catParent.name}`,setSubCategories)
    }
  }, [catParent]);
  useEffect(() => {
    if (pageUrl) {
      fetchData(pageUrl,setSubCategories)
    }
  }, [pageUrl]);

  const { loading, data } = subCategories;

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

  if (!catParent) {
    return (
      <div className=' w-full flex justify-center items-center text-lg uppercase'>
        {' '}
        <h1 className='text-base sm:text-xl'>recently published books in the list below</h1>
      </div>
    );
  }
  if (loading) {
    return ( <Spinner /> ); 
  } else {
    let catsClasses =
      'grid md:grid-cols-4 p-2 mt-2 w-full grid-cols-2 sm:grid-cols-3';
    if (data['hydra:totalItems'] > 8) {
      catsClasses += ' border-b-2';
    }

    return (
      <div className='p-1 md:pt-2 xl:p-3 bg-orange-50 my-2 shadow-md'>
        <div>
          <span className='uppercase text-gray-500 p-4 text-sm sm:text-base'>
            total subCategories of {catParent.name} :{' '}
            <strong>{data['hydra:totalItems']}</strong>
          </span>
          <div className={catsClasses}>
            {data['hydra:member'].map((cat) => {
              return (
                <div
                  className=' flex items-center cursor-pointer'
                  key={cat.id}
                  onClick={() => setCatBooks(cat)}>
                  <img
                    id={cat.id}
                    className='w-14 h-14 2xl:w-16 2xl:h-16 rounded-full m-0 border-4 border-white '
                    ref={addToRefs}
                    onClick={(e) => addStyles(e)}
                    src={'uploads/images/' + cat.photo}
                    alt={cat.title}
                  />
                  <h3 className='mx-1 text-sm 2xl:text-base'>{cat.name}</h3>
                </div>
              );
            })}
          </div>
        </div>
        <Pagination data={data} setPageUrl={setPageUrl}/>
      </div>
    );
  }
};
