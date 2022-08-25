import axios from 'axios';
import MDate from 'mini-date-format';

const fetchData = async (url, callback) => {
  try {
    let res = await axios.get(url);
    callback({ loading: false, data: res.data });
    return res
  } catch (err) {
    console.log(err);
    callback({ loading: false, data: null });
  }
};


export const implementCoefPrice = (res , user) => {
  res.data['hydra:member'].forEach(book => {
   return  book.price *= user.Coef
     
  })
  return res
}

export const postData = async (orderUrl, order, books) => {
  order.isPrivate ? (order.paymentDate = MDate('YYYY-MM-DD')) : '';
  order.bookOrders = books.map((book) => {
    return Object.assign(
      {},
      { quantity: book.qty, unitPrice: book.price.toString(), book: book['@id'] },
    );
  });
  return axios
    .post(orderUrl, order)
    .then(() => {
      alert('your order has been registered successfully !');
      localStorage.removeItem('ORDER');
      localStorage.removeItem('SHOPPING-CART');
    })
    .catch((e) => {
      alert('server error !'), console.log(e);
    });
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

// TVA 10/100

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
