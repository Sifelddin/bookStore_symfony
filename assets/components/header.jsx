import  React,{useState,useEffect} from 'react';
import {BsCart4} from 'react-icons/bs'
import {BsSearch} from 'react-icons/bs'


export const Header = ({show , showBook, cartList}) => {


  return (
      <>
    <div className='flex justify-end items-center p-6 m-6'>
        <div className='flex justify-center items-center'><span className='bg-red-700 rounded-full text-white text-lg px-2'>{cartList && cartList.length > 0 ? cartList.length : null}</span><BsCart4 onClick={() => {show(true), showBook(false)}} className="text-lg  w-10 h-10 cursor-pointer"/></div>
        <BsSearch className='text-lg m-4  w-8 h-8'/>
    </div>
</>
  )
}
