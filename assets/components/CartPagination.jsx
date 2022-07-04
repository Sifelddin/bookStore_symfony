import React,{useState} from 'react'

const CartPagination = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(5);
  const [cartList, setCartList] = useState(
    JSON.parse(localStorage.getItem('SHOPPING-CART')) || [],
  );


  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentList = cartList.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div className='flex justify-around '>
    {cartList[indexOfFirstBook - 1] && (
      <button
        className='bg-blue-500 text-white rounded-md p-2'
        onClick={() => setCurrentPage(currentPage - 1)}>
        {' '}
        {'<<'} previous{' '}
      </button>
    )}
    {cartList[indexOfLastBook] && (
      <button
        className='bg-blue-500 text-white rounded-md p-2'
        onClick={() => setCurrentPage(currentPage + 1)}>
        Next {'>>'}
      </button>
    )}
  </div>
  )
}

export default CartPagination