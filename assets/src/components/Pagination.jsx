import React from 'react';

const Pagination = ({ data, setPageUrl }) => {
  const getUrlPerPage = (hydraView) => setPageUrl(data['hydra:view'][hydraView]);

  const btnClasses =
    'flex justify-center items-center px-2 py-1 mt-2 cursor-pointer border border-transparent rounded-md font-medium text-sm text-gray-600 tracking-widest hover:underline active:text-gray-800  disabled:opacity-25 transition ease-in-out duration-150 ';

  return (
    data['hydra:totalItems'] > data['hydra:member'].length && (
      <div className="w-full flex justify-around">
        <button onClick={() => getUrlPerPage('hydra:first')} className={btnClasses}>
          First P
        </button>
        {data['hydra:view']['hydra:previous'] && (
          <button onClick={() => getUrlPerPage('hydra:previous')} className={btnClasses}>
            {'<<'}prev
          </button>
        )}
        {data['hydra:view']['hydra:next'] && (
          <button onClick={() => getUrlPerPage('hydra:next')} className={btnClasses}>
            next {'>>'}
          </button>
        )}
        <button onClick={() => getUrlPerPage('hydra:last')} className={btnClasses}>
          Last P
        </button>
      </div>
    )
  );
};

export default Pagination;
