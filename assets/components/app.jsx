import  React,{useState,useEffect} from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import { Cats } from './cats';
import { SubCats } from './subCats';
import { Books } from './books';
import { Header } from './header';
import {Book} from './Book';
import {Cart} from './cart'

const App = () => {

  

const [subCategories, setSubCategories] = useState([])
const [catBooks, setCatBooks] = useState([])
const [categories,setCategories] = useState([])
const [book,setBook] = useState(false)
const [showCart, setShowCart] = useState(false)
const [cartList, setCartList] = useState([])


useEffect(()=>{
    axios.get('api/categories?page=1&catParent=null').then((res) => setCategories(res.data)).catch(e=>console.log(e))
    
},[])

const selectCat = (e) => setSubCategories(e) 
   
  const selectBooks = (e) => setCatBooks(e)
    
  const selectBook = (e) => setBook(e)
     
  const onAdd = (book) => {
    const exist = cartList.find((item) => item.id === book.id )
    if(exist){
      setCartList(cartList.map((item)=> item.id === book.id ? {...exist, qty: exist.qty + 1}: item))
    }else{
      setCartList([...cartList, {...book, qty: 1}])
    }
  }
  const onRemove = (book) => {
    const exist = cartList.find((item) => item.id === book.id )
    if(exist.qty === 1){
      setCartList(cartList.filter((item)=> item.id !== book.id))
    }else{
    setCartList(cartList.map(item => item.id === book.id ? { ...exist, qty: exist.qty - 1} : item))
    }
  }

  if (book) {
    return <> 
    <Header show={setShowCart} showBook={selectBook} cartList={cartList}/>
    <Book book={book} show={selectBook} onAdd={onAdd} cartList={cartList} ></Book>
    </>
  }

  if(showCart){
    return <Cart cartList={cartList} showCart={setShowCart} onAdd={onAdd} onRemove={onRemove}></Cart>
  }


  return (
      <>
      <Header show={setShowCart} showBook={selectBook} cartList={cartList}/>
    <div className='grid grid-cols-3 gap-3 w-10/12 mx-auto '>
      <div className='col-span-1'>
          <Cats cats={categories['hydra:member']} select={selectCat} />
        </div>
      <div className='col-span-2 flex flex-col'>
          <SubCats subCategories={subCategories} select={selectBooks}/>
          <Books catBooks={catBooks} select={selectBook}/>
      </div>
    </div>
 </>
  )
}


const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App/>);