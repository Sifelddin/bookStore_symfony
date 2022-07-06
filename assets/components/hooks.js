import axios from 'axios';

const fetchData = async (url, callback) => {
  try {
    let res = await axios.get(url);
    callback({ loading: false, data: res.data });
    return res.status
  } catch (err) {
    console.log(err);
    return err.response.status
  }
};

export const postData = (orderUrl,cartUrl,order,cartList) => {
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
}
 
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
