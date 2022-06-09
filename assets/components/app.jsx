import  React,{useState,useEffect} from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import { Cats } from './cats';
import { SubCats } from './subCats';
import { Books } from './books';
import { Header } from './header';


const App = () => {

  
const [categories, setCategories] = useState([])
const [subCategories, setSubCategories] = useState([])
const [books, setBooks] = useState([])
const [posts,setPosts] = useState([])
const [book,setBook] = useState(false)

useEffect(()=>{
    axios.get('api/categories?page=1&catParent=null').then((res) => setPosts(res.data)).catch(e=>console.log(e))
    
},[])

const selectCat = (e) => {
   setSubCategories(e) 
  }
  
  const selectBooks = (e) => {
      setBooks(e)
  }

  const selectBook = (e) => {
     setBook(e)
  }

  if (book) {

    console.log(book);
    return (
      <div className="min-h-fit flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
		<div className="flex flex-col items-center w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <h1>{book.title}</h1>
        <img className="w-40 h-40" src={"uploads/images/" + book.photo} alt={book.photo} />
        <span>{book.price}€</span>
        <p>{book.description}</p>
        <button onClick={() => setBook(false)}>Back To List</button>
        <button>add to cart</button>
        </div>
        </div>
    )
  }

  return (
      <>
      <Header/>
    <div className='grid grid-cols-3 gap-3'>
      <div className='col-span-1'>
          <Cats cats={posts['hydra:member']} select={selectCat} />
        </div>
      <div className='col-span-2 flex flex-col'>
          <SubCats subCategories={subCategories} select={selectBooks}/>
          <Books books={books} select={selectBook}/>
      </div>
    </div>
 </>
  )
}

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App/>);