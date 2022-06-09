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

useEffect(()=>{
    axios.get('api/categories?page=1&catParent=null').then((res) => setPosts(res.data)).catch(e=>console.log(e))
    
},[])

const selectCat = (e) => {
  return setSubCategories(e); 
}

console.log(subCategories);

  return (
      <>
      <Header/>
    <div className='grid grid-cols-2'>

      <Cats cats={posts['hydra:member']} select={selectCat} className='col-span-1'/>
      <div className='col-span-1'>
        <SubCats/>
        <Books/>
      </div>
        
    </div>
 </>
  )
}

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App/>);