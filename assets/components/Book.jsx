import React from 'react'
import MDate from 'mini-date-format'



export const Book = ({book , show, onAdd}) => {


    // const checkCartItems = (book, cartList, addToCart) => {

    //     if(!cartList.includes(book)){
    //         book.qty = 1;
    //         addToCart(book)
    //     }else{
    //         book.qty += 1
    //     }
     
    // }
    



  return ( 
   <div>
    <div className="min-h-fit  sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 col-span-4">
      <div className="flex flex-col  mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg m-10">
        <div className="grid grid-cols-2">
            <table className="divide-y divide-gray-200 col-span-1">
                <tbody>
            
                    <tr>
                        <th className='text-left uppercase'>Title :</th>
                        <td className='text-left'> {book.title} </td>
                    </tr>

                    <tr>
                        <th className='text-left uppercase'>Price :</th>
                        <td className='text-left'>{ book.price ? book.price : '' }</td>
                    </tr>
                    <tr>
                        <th className='text-left uppercase'>ReleaseDate :</th>
                        <td className='text-left'>{ book.releaseDate ? MDate('YYYY-MM-DD',book.releaseDate.replace(/[a-zA-Z]/g,' '))  : '' }</td>
                    </tr>
                    <tr>
                        <th className='text-left uppercase'>Published :</th>
                        <td className='text-left'>{ book.published ? 'Yes' : 'No' }</td>
                    </tr>
                </tbody>
            </table>
            <div className="flex flex-col col-span-1">
    <img className=" w-60" src={"uploads/images/" + book.photo} />
                <p>Description :
                    <span>{book.Description}</span>
                </p>
            </div>
        </div>
        <div className='flex justify-around items-center mt-10'>
            <button onClick={() => show(false)} className="flex justify-center items-center px-4 py-2 mt-4 bg-gray-700 border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-gray-900 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">back to list</button>

            <button onClick={() => onAdd(book)} className=' flex justify-center items-center px-4 py-2 mt-4 bg-green-400 border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-green-700 active:bg-green-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150'>Add To Cart</button>
        </div>
    </div>
   </div>
   </div>
  )
}

