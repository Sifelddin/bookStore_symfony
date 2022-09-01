import axios from 'axios';
import MDate from 'mini-date-format';

// fetch data function
const fetchData = async (url, callback) => {
  try {
    const res = await axios.get(url);
    console.log(res);
    callback({ loading: false, data: res.data });
    return res;
  } catch (err) {
    console.log(err);
    callback({ loading: true, data: undefined });
    return err;
  }
};
export default fetchData;

// implement coefficient for fetched books list
export const implementCoefPrice = (books, user) => {
  books.forEach((book) => {
    book.Coef = user.Coef;
    book.price *= user.Coef;
  });
};

// implement the coefficient in localstorage preset data
export const applyCoefPriceLocalStorage = (books, Coef) => {
  let count = 0;
  books?.forEach((book) => {
    if (!Object.prototype.hasOwnProperty.call(book, 'Coef')) {
      book.Coef = Coef;
      book.price = Number(book.price) * Coef;
      count += 1;
    }
  });
  if (count) {
    localStorage.setItem('SHOPPING-CART', JSON.stringify(books));
  }
};

// send order data
export const postOrder = async (orderUrl, order, books) => {
  if (order.isPrivate) {
    order.paymentDate = MDate('YYYY-MM-DD');
  }
  order.bookOrders = books.map((book) => {
    return {
      quantity: book.qty,
      unitPrice: book.price.toString(),
      book: book['@id']
    };
  });
  return axios.post(orderUrl, order);
};

// add books quantity to cart function
export const onAdd = (book, setCartList, cartList) => {
  const exist = cartList.find((item) => item.id === book.id);
  if (exist) {
    setCartList(cartList.map((item) => (item.id === book.id ? { ...exist, qty: exist.qty + 1 } : item)));
  } else {
    setCartList([...cartList, { ...book, qty: 1 }]);
  }
};

// remove books quantity from cart list
export const onRemove = (book, setCartList, cartList) => {
  const exist = cartList.find((item) => item.id === book.id);
  if (exist.qty === 1) {
    setCartList(cartList.filter((item) => item.id !== book.id));
  } else {
    setCartList(cartList.map((item) => (item.id === book.id ? { ...exist, qty: exist.qty - 1 } : item)));
  }
};

// remove selected book
export const deleteBook = (book, setCartList, cartList) => {
  setCartList(cartList.filter((item) => item.id !== book));
};

// TVA 10/100
// total calculations for books list card
export const globalTotal = (books) => books.reduce((a, c) => a + c.qty * c.price * (1 + 10 / 100), 0);
export const bookTotal = (book) => book.qty * book.price * (1 + 10 / 100);
export const taxTotal = (book) => (book.qty * book.price * 10) / 100;

// total calculations in an existing order details
export const TotalHT = (books) => books.reduce((a, c) => a + c.quantity * c.unitPrice, 0);
export const TotalTVA = (books) => books.reduce((a, c) => a + (c.quantity * c.unitPrice * 10) / 100, 0);
export const Total = (books) => books.reduce((a, c) => a + c.quantity * c.unitPrice * (1 + 10 / 100), 0);

// pagination for the card or sammury
export const currentPageBooks = (currentPage, booksPerPage, books = []) => {
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  return books.slice(indexOfFirstBook, indexOfLastBook);
};

// tailwind classes
export const inputDivClasses = 'mt-1 relative rounded-md shadow-sm';
export const inputfeildClasses =
  'focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-7 sm:text-md border-gray-300 rounded-md';
