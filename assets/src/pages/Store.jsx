import React, { useState, useEffect } from 'react';
import Categories from '../layouts/Categories';
import SubCategories from '../layouts/SubCategories';
import Books from '../layouts/Books';
import Header from '../layouts/header';
import Cart from '../layouts/cart';
import NavLink from '../components/uis/NavLink';
import { useAuth } from '../contexts/OrderContext';
import SearchBar from '../layouts/SearchBar';

const Store = () => {
  const [catParent, setCatParent] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [cartList, setCartList] = useState(JSON.parse(localStorage.getItem('SHOPPING-CART')) || []);
  const { data: userData } = useAuth();
  const order = localStorage.getItem('ORDER');
  useEffect(() => {
    localStorage.setItem('SHOPPING-CART', JSON.stringify(cartList));
    if (!cartList.length) {
      localStorage.removeItem('SHOPPING-CART');
      localStorage.removeItem('ORDER');
    }
  }, [cartList]);

  if (userData === undefined) {
    // remove order from localStorage if the user is not logged in
    localStorage.removeItem('ORDER');
  }

  const selectParentCategory = (e) => {
    setCatParent(e);
    setSubCategory(null);
  };

  return (
    <div className="xl:w-10/12 w-11/12 mx-auto h-full overflow-hidden min-h-screen ">
      <Header showCart={setShowCart} cartList={cartList} setShowSearchBar={setShowSearchBar} />
      <div className="p-2 xl:p-0 text-sm sm:text-base md:text-lg">
        {cartList.length > 0 && <NavLink link="/ordering">ordering {'>>'} </NavLink>}
        {order && <NavLink link="/placeorder"> summary {'>>'} </NavLink>}
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-4 lg:gap-2  mx-auto ">
        <div className="md:col-span-1 order-1 lg:order-3">
          <Categories selectParentCategory={selectParentCategory} />
        </div>
        <div className="md:col-span-3 flex flex-col order-2">
          <SubCategories catParent={catParent} setSubCategory={setSubCategory} />
          <Books subCategory={subCategory} cartList={cartList} setCartList={setCartList} />
        </div>
      </div>
      <Cart cartList={cartList} setShowCart={setShowCart} showCart={showCart} setCartList={setCartList} />
      <SearchBar setShowSearchBar={setShowSearchBar} showSearchBar={showSearchBar} />
    </div>
  );
};

export default Store;
