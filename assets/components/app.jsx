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
const [sendData,setSendData] = useState(false)




useEffect(()=>{
  axios.get('/api/categories?page=1&exists%5BcatParent%5D=false').then((res) => setCategories(res.data)).catch(e=>console.log(e))
},[])
useEffect(()=>{

   if(sendData && cartList.length > 0){ 
  const data = cartList.map((a) => {
    for(let property in a){
      if(property !== 'id' && property !== "price" && property !== "qty") {
        delete a[property]
      }
    }
  return a
  })
 //console.log(JSON.parse(JSON.stringify(data)));
    axios.post('/checkout',data,{headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'content-type': 'application/json'
    }})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
},[sendData])

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
    return <Cart cartList={cartList} showCart={setShowCart} onAdd={onAdd} onRemove={onRemove} setSendData={setSendData} sendData={sendData}></Cart>
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