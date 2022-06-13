import axios from 'axios';
import  React,{useState,useEffect} from 'react';




export const Books = ({catBooks,select}) => {

  const [books, setBooks] = useState([])

 useEffect( () =>{

  
  axios.get(`https://localhost:8000/api/books?page=1&category=${catBooks.id}&published=true`).then((res) => setBooks(res.data)).catch((err) => console.log(err));
 },[catBooks])

  return (
    <>
        <h2 className='text-lg uppercase text-center underline my-4'> {catBooks.name} </h2>
      <div className='grid grid-cols-2 items-center p-2 m-2 gap-2'>
      {books['hydra:member'] && books['hydra:member'].map(book => {
        return (
          <div className='flex  items-center  bg-white' key={book.id}>
            <div className='mr-2'>
            <img className="cursor-pointer w-24 h-24" src={"uploads/images/" + book.photo} alt={book.photo} onClick={() => select(book)} />
            </div>
            <div className='ml-2'> 
            <h3 onClick={() => select(book)} className='text-lg text-blue-500 hover:text-blue-800 duration-150 cursor-pointer'>{book.title}</h3>
            <span>{book.price}€</span>
            </div>
           
        </div>
      )
    })}
</div>
</>
  )
}
