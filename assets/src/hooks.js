import axios from 'axios';

const fetchData = async (url, callback) => {
  try {
    let res = await axios.get(url);
    callback({ loading: false, data: res.data });
  } catch (err) {
    console.log(err);
    callback({ loading: false, data: null });
  }
};

export const postData = (orderUrl, cartUrl, order, cartList) => {
  axios
    .post(orderUrl, order)
    .then((res) => {
      cartList.map((book) => {
        axios
          .post(cartUrl, {
            quantity: book.qty,
            unitPrice: book.price,
            book: book['@id'],
            order: res.data['@id'],
          })
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      });
      localStorage.removeItem('ORDER');
      localStorage.removeItem('SHOPPING-CART');
      alert('your order has been registered');
      location.assign('/');
    })
    .catch((err) => console.log(err));
};

export default fetchData;

export const onAdd = (book, setCartList, cartList) => {
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

export const onRemove = (book, setCartList, cartList) => {
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

export const deleteBook = (book, setCartList, cartList) => {
  setCartList(cartList.filter((item) => item.id !== book));
};

export const globalTotal = (books) =>
  books.reduce((a, c) => a + c.qty * c.price * (1 + 10 / 100), 0);

export const bookTotal = (book) => book.qty * book.price * (1 + 10 / 100);
export const taxTotal = (book) => (book.qty * book.price * 10) / 100;

export const currentPageBooks = (books = [], currentPage, booksPerPage) => {
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  return books.slice(indexOfFirstBook, indexOfLastBook);
};

// tailwind classes

export const inputDivClasses = 'mt-1 relative rounded-md shadow-sm';
export const inputfeildClasses =
  'focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-7 sm:text-md border-gray-300 rounded-md';
