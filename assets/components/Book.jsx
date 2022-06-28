import React,{useState,useEffect} from 'react';
import {useParams } from "react-router-dom";
import MDate from 'mini-date-format';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Spinner from './Spinner';


 const Book = () => {

  const {slug,id} = useParams();

  const [book,setBook] = useState({loadBook: true, data: null});

  useEffect(() => {
    axios.get(`/api/books/${id}`).then(res => setBook({loadBook: false, data: res.data})).catch(err => console.log(err))
  },[])

  const {loadBook, data} = book;
  
  
  if(loadBook){
    return <div className='w-full h-full flex items-center justify-center'><Spinner/></div> 
  }else{
    console.log(data.photo);
  return (
    <div className='flex flex-col  mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg m-10'>
      <div className='grid grid-cols-2 items-center'>
        <div className='divide-y divide-gray-200 col-span-1 self-center'>
        <img className=' border-white object-center' src= {"/uploads/images/" + data.photo}/>
          <div className='p-2 my-4 border-none'>
            <h2 className='text-left text-2xl '> {data.title} </h2>
            <p className='text-left uppercase'>Price : {data.price}€</p>
            <p className='text-left'>
              Released :{' '}
              {data.releaseDate
                ? MDate(
                    'YYYY-MM-DD',
                    data.releaseDate.replace(/[a-zA-Z]/g, ' '),
                  )
                : ''}
            </p>
          </div>
        </div>
        <div className='mx-auto col-span-1 text-center self-center'>
          <strong className='text-xl my-2'>Description </strong>
          <p className='text-left'>{data.description}</p>
        </div>
      </div>
      <div className='flex justify-around items-center mt-10'>
        <Link to={"/"}
          className='flex justify-center items-center px-4 py-2 mt-4 bg-gray-700 border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-gray-900 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150'>
          back to list
        </Link>

        <button
          onClick={() => onAdd(book)}
          className=' flex justify-center items-center px-4 py-2 mt-4 bg-green-400 border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-green-700 active:bg-green-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150'>
          Add To Cart
        </button>
      </div>
    </div>
  );
                }
};

export default Book;