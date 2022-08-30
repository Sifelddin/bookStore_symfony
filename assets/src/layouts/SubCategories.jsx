import React, { useState, useEffect, useRef } from 'react';
import fetchData from '../hooks';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import { addStyles, addToRefs } from './helpers';

const SubCategories = ({ catParent, setSubCategory }) => {
  const [subCategories, setSubCategories] = useState({
    loading: true,
    data: undefined
  });
  const [pageUrl, setPageUrl] = useState(null);
  const categoriesRefs = useRef([]);

  useEffect(() => {
    if (catParent) {
      fetchData(`api/categories?page=1&catParent.id=${catParent.id}`, setSubCategories);
    }
  }, [catParent]);
  useEffect(() => {
    if (pageUrl) {
      fetchData(pageUrl, setSubCategories);
    }
  }, [pageUrl]);

  const { loading, data } = subCategories;

  if (!catParent) {
    return (
      <div className=" w-full flex justify-center items-center text-lg uppercase">
        {' '}
        <h1 className="text-base sm:text-xl">recently published books in the list below</h1>
      </div>
    );
  }
  if (loading) {
    return <Spinner />;
  }
  let catsClasses = 'grid md:grid-cols-4 p-2 mt-2 w-full grid-cols-2 sm:grid-cols-3';
  if (data['hydra:totalItems'] > 8) {
    catsClasses += ' border-b-2';
  }

  return (
    <div className="p-1 md:pt-2 xl:p-3 bg-stone-50 my-2 shadow-md">
      <div>
        <span className="uppercase text-gray-500 p-4 text-sm sm:text-base">
          total subCategories of <span className="text-gray-900 font-semibold">{catParent.name}</span> :{' '}
          <strong className="text-gray-700">{data['hydra:totalItems']}</strong>
        </span>
        <div className={catsClasses}>
          {data['hydra:member'].map((cat) => {
            return (
              <div
                className=" flex items-center cursor-pointer"
                key={cat.id}
                role="presentation"
                onClick={() => setSubCategory(cat)}
                onKeyPress={() => setSubCategory(cat)}
              >
                <img
                  id={cat.id}
                  role="presentation"
                  className="w-14 h-14 2xl:w-16 2xl:h-16 rounded-full m-0 border-2 shadow-md cursor-pointer "
                  ref={(e) => addToRefs(e, categoriesRefs)}
                  onClick={(e) => addStyles(e, categoriesRefs)}
                  src={`images/categories/${cat.photo}`}
                  alt={cat.title}
                />
                <h3 className="mx-1 text-sm 2xl:text-base capitalize">{cat.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
      <Pagination data={data} setPageUrl={setPageUrl} />
    </div>
  );
};

export default SubCategories;
