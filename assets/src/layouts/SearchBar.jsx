import React, { useRef, useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import fetchData from '../hooks';

const SearchBar = ({ showSearchBar, setShowSearchBar }) => {
  const [searchString, setSearchString] = useState('');
  const [resultValues, setResultValue] = useState({ loading: true, data: undefined });
  // make input focus when search bar popup and render filtredData array empty when closing the search bar
  const searchField = useRef();
  useEffect(() => {
    if (showSearchBar && searchString) {
      fetchData(`/api/books/search?page=1&slug=${searchString}`, setResultValue);
    } else {
      searchField.current.value = '';
      setSearchString(searchField.current.value);
      setResultValue({ loading: true, data: undefined });
    }
  }, [searchString, showSearchBar]);

  let containerClasses =
    'fixed top-0 right-0 left-0 bottom-0 w-screen bg-black/70  transition-all ease-in-out duration-300 min-h-screen flex justify-center transition-all ease-in-out duration-300';
  let SearchBarClasses = 'bg-white relative mt-1 px-2 py-3 rounded-md shadow-sm transtion-all duration-500';

  if (showSearchBar) {
    containerClasses += ' z-20';
    SearchBarClasses += ' translate-y-6';
  } else {
    containerClasses += ' -z-20';
    SearchBarClasses += ' translate-y-0';
  }

  const handleChange = (e) => {
    setSearchString(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const { data } = resultValues;
  return (
    <div role="presentation" onClick={() => setShowSearchBar(false)} className={containerClasses}>
      <div className="w-10/12 md:w-6/12">
        <form role="presentation" onClick={(e) => e.stopPropagation()} className="w-full" onSubmit={handleSubmit}>
          <div className={SearchBarClasses}>
            <input
              ref={searchField}
              className="focus:ring-indigo-500 text-lg focus:border-indigo-500 block w-full pl-8 pr-7 sm:text-md border-gray-300 rounded-md"
              type="text"
              placeholder="Rechercher un contenu..."
              onChange={handleChange}
            />
            <button className="absolute top-6 text-xl left-4 inline-flex bg-transparent text-gray-700 " type="submit">
              <FaSearch />
            </button>
          </div>
        </form>
        {data?.['hydra:member'].length > 0 && (
          <div className="bg-white z-30 mt-7 w-full rounded-md text-lg p-2">
            <ul>
              {data?.['hydra:member'].map((book) => {
                return (
                  <Link key={book.id} to={`book/${book.slug}/${book.id}`}>
                    <li className="transition-all duration-300 p-1 text-black hover:text-gray-800 hover:bg-slate-200 rounded-md capitalize">
                      <span className="text-gray-600 capitalize ">Book Title |</span> {book.slug}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
