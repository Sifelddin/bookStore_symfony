import React, { useState, useEffect } from 'react';
import { Cats } from './cats';
import { SubCats } from './subCats';
import { Books } from './books';
import Header from './header';
import { Cart } from './cart';
import fetchData from './hooks';
import NavLink from './uis/NavLink';

const App = () => {
  const [user, setUser] = useState({ loading: true, data: null });
  const [catParent, setCatParent] = useState(null);
  const [catBooks, setCatBooks] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [cartList, setCartList] = useState(
    JSON.parse(localStorage.getItem('SHOPPING-CART')) || [],
  );
  const [order, setOrder] = useState(localStorage.getItem('ORDER') || null);
  console.log(order);
  useEffect(() => {
    if (order) {
      let status = fetchData('/api/me', setUser);
      status.then((respStatus) => {
        respStatus === 200 ||
          (localStorage.removeItem('ORDER'), setOrder(null));
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('SHOPPING-CART', JSON.stringify(cartList));
    cartList.length > 0 ||
      (localStorage.removeItem('SHOPPING-CART'),
      localStorage.removeItem('ORDER'));
  }, [cartList]);

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
            <NavLink link={'/ordering'}>ordering </NavLink>
          )}
          {order && <NavLink link={'/placeorder'}> summary </NavLink>}
        </div>
        <div className='flex flex-col lg:grid lg:grid-cols-4 lg:gap-2  mx-auto '>
          <div className='md:col-span-1 order-1 lg:order-3'>
            <Cats select={selectCat} />
          </div>
          <div className='md:col-span-3 flex flex-col order-2'>
            <SubCats catParent={catParent} setCatBooks={setCatBooks} />
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

export default App;
