import React, { useState, useEffect } from 'react';
import Categories from '../layouts/Categories';
import SubCategories from '../layouts/SubCategories';
import { Books } from '../layouts/books';
import Header from '../layouts/header';
import { Cart } from '../layouts/cart';
import NavLink from '../components/uis/NavLink';
import { useAuth } from '../contexts/OrderContext';

const Store = () => {
  const [catParent, setCatParent] = useState(null);
  const [catBooks, setCatBooks] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [cartList, setCartList] = useState(
    JSON.parse(localStorage.getItem('SHOPPING-CART')) || [],
  );
  useEffect(() => {
    localStorage.setItem('SHOPPING-CART', JSON.stringify(cartList));
    cartList.length > 0 ||
      (localStorage.removeItem('SHOPPING-CART'),
      localStorage.removeItem('ORDER'));
  }, [cartList]);
  const order = localStorage.getItem('ORDER');

  const { loading, data } = useAuth();
  if (!loading) {
    data || localStorage.removeItem('ORDER');
  }

  const selectCat = (e) => {
    setCatParent(e);
    setCatBooks(null);
  };

  return (
    <>
      <div className=' xl:w-10/12 w-11/12 mx-auto'>
        <Header show={setShowCart} cartList={cartList} />
        <div className='p-2 xl:p-0'>
          {cartList.length > 0 && (
            <NavLink link={'/ordering'}>ordering {'>>'} </NavLink>
          )}
          {order && <NavLink link={'/placeorder'}> summary {'>>'} </NavLink>}
        </div>
        <div className='flex flex-col lg:grid lg:grid-cols-4 lg:gap-2  mx-auto '>
          <div className='md:col-span-1 order-1 lg:order-3'>
            <Categories select={selectCat} />
          </div>
          <div className='md:col-span-3 flex flex-col order-2'>
            <SubCategories catParent={catParent} setCatBooks={setCatBooks} />
            <Books
              catBooks={catBooks}
              cartList={cartList}
              setCartList={setCartList}
            />
          </div>
        </div>

        <Cart
          cartList={cartList}
          setShowCart={setShowCart}
          showCart={showCart}
          setCartList={setCartList}></Cart>
      </div>
    </>
  );
};

export default Store;
