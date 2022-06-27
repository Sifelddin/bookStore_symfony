import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cats } from './cats';
import { SubCats } from './subCats';
import { Books } from './books';
import { Header } from './header';
import { Book } from './Book';
import { Cart } from './cart';

const App = () => {
  const [catParent, setCatParent] = useState(null)
  const [catBooks, setCatBooks] = useState(null);
  const [categories, setCategories] = useState(null);
  const [book, setBook] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [pageUrl, setPageUrl] = useState('/api/categories?exists%5BcatParent%5D=false&exists%5BsubCategories%5D=true&page=1');
 
  useEffect(() => {
    axios
      .get(
        pageUrl,
      )
      .then((res) => setCategories(res.data))
      .catch((e) => console.log(e));

    const parsJson = JSON.parse(localStorage.getItem('SHOPPING-CART'));
    if (parsJson !== null) {
      setCartList(parsJson);
    }
  }, [pageUrl]);

  useEffect(() => {
    localStorage.setItem('SHOPPING-CART', JSON.stringify(cartList));
    JSON.parse(localStorage.getItem('SHOPPING-CART')).length > 0 ||
      localStorage.removeItem('SHOPPING-CART');
  }, [cartList]);

  const selectCat = (e) => setCatParent(e);

  const selectBooks = (e) => setCatBooks(e);

  const selectBook = (e) => setBook(e);

  const onAdd = (book) => {
    const exist = cartList.find((item) => item.id === book.id);
    if (exist) {
      setCartList(
        cartList.map((item) =>
          item.id === book.id ? { ...exist, qty: exist.qty + 1 } : item,
        ),
      );
    } else {
      setCartList([...cartList, { ...book, qty: 1 }]);
    }
  };
  const onRemove = (book) => {
    const exist = cartList.find((item) => item.id === book.id);
    if (exist.qty === 1) {
      setCartList(cartList.filter((item) => item.id !== book.id));
    } else {
      setCartList(
        cartList.map((item) =>
          item.id === book.id ? { ...exist, qty: exist.qty - 1 } : item,
        ),
      );
    }
  };

  const deleteBook = (book, cartList) => {
    setCartList(cartList.filter((item) => item.id !== book));
  };

  if (book) {
    return (
      <>
        <div className='w-10/12 mx-auto'>
          <Header
            show={setShowCart}
            showBook={selectBook}
            cartList={cartList}
          />
          <Book
            book={book}
            show={selectBook}
            onAdd={onAdd}
            cartList={cartList}></Book>
        </div>
      </>
    );
  }

  if (showCart) {
    return (
      <div className='w-10/12 mx-auto'>
        <Cart
          deleteBook={deleteBook}
          cartList={cartList}
          showCart={setShowCart}
          onAdd={onAdd}
          onRemove={onRemove}
          setCartList={setCartList}></Cart>
      </div>
    );
  }

  return (
    <>
      <div className='xl:w-10/12 w-11/12 mx-auto'>
        <Header show={setShowCart} showBook={selectBook} cartList={cartList} />
        <div className='flex flex-col md:grid md:grid-cols-3 md:gap-1  mx-auto '>
          <div className='md:col-span-1'>
            <Cats setPageUrl={setPageUrl} cats={categories} select={selectCat} />
          </div>
          <div className='md:col-span-2 flex flex-col p-2 m-2'>
            <SubCats catParent={catParent}  select={selectBooks} />
            <Books catBooks={catBooks} select={selectBook} onAdd={onAdd} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
