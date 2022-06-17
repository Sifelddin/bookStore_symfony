import axios from 'axios';
import  React,{useState,useEffect} from 'react';




export const Books = ({catBooks,select, onAdd}) => {

  const [books, setBooks] = useState([])

  useEffect( () =>{
    
    if(catBooks){
      axios.get(`/api/books?page=1&category=${catBooks.id}&published=true`).then((res) => setBooks(res.data)).catch((err) => console.log(err));
    }else{
      axios.get(`api/books?page=1&published=true`).then((res) => setBooks(res.data)).catch((err) => console.log(err));
    }
    console.log('render');
  },[catBooks])
  
  return (
    <>
        <h2 className='text-lg uppercase text-center underline'> {catBooks && catBooks.name} </h2>
      <div className=' p-2 m-2'>
      {books['hydra:member'] && books['hydra:member'].map(book => {
        return (
          <div className='flex  items-center p-3 m-3 bg-white rounded-md' key={book.id}>
            <div className='mr-2'>
            <img className="cursor-pointer w-24 h-auto" src={"uploads/images/" + book.photo} alt={book.photo} onClick={() => select(book)} />
            </div>
            <div className='ml-2'> 
            <h3 onClick={() => select(book)} className='text-lg text-blue-500 hover:text-blue-800 duration-150 cursor-pointer'>{book.title}</h3>
            <span className='text-lg text-red-400'>{book.price}€</span>
            <p className='text-gray-700'> Author : {book.author}</p>
            <button onClick={() => onAdd(book)} className=' flex justify-center items-center px-2 py-1 mt-2 bg-green-400 border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-green-700 active:bg-green-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150'>Add To Cart</button>
            </div>
           
        </div>
      )
    })}
</div>
</>
  )
}
