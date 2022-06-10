import  React,{useState,useEffect} from 'react';
import {BsCart4} from 'react-icons/bs'
import {BsSearch} from 'react-icons/bs'


export const Header = () => {


  return (
      <>
    <div className='flex justify-end items-center p-6 m-6'>
        <BsCart4 className='text-lg m-4  w-10 h-10 '/>
        <BsSearch className='text-lg m-4  w-8 h-8'/>
    </div>
</>
  )
}
