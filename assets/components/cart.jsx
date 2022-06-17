
import React from 'react'

export const Cart = ({cartList, showCart, onAdd, onRemove}) => {


  const globalTotal = cartList && cartList.reduce((a, c) => a + ((c.qty * c.price) * (1 + 10/100)), 0)
  const bookTotal = (book) =>  (book.qty * book.price) * (1 + 10/100)
  const taxTotal = (book) => book.qty * book.price * 10/100
  return (
   
      <div className="py-12 col-span-4 self-center">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  {cartList.length == 0 && <h1 className='text-center text-xl'> shopping cart is empty </h1>}
                  {cartList.length > 0 &&
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                        <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Price</th>
                        <th scope="col" className="px-2 pyonRemove-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    {cartList && cartList.map(book => {
                      return (
                        <tr key={book.id}>
                          <td className="px-4 py-4 whitespace-nowrap inline-block h-28 w-28  rounded-full ring-2 ring-white "><img 
                              className=" border-white h-full object-cover" src={"uploads/images/" + book.photo} />
                          
                          </td>
                          <td className="px-2 py-2">{book.title }</td>
                          <td className="px-2 py-2">{book.price}€</td>
                          <td className="px-2 py-2">{book.qty}</td>
                          <td className="px-2 py-2">{bookTotal(book).toFixed(2)}€</td>
                          <td className="px-2 py-2">{taxTotal(book).toFixed(2)}€</td>
                          <td className="px-2 py-2 flex justify-around items-center"><button onClick={() => onAdd(book)} className='px-3 py-1  bg-green-700 border border-transparent rounded-md font-semibold text-white uppercase tracking-widest hover:bg-green-900 active:bg-green-900 focus:outline-none focus:border-gray-900 focus:ring ring-green-300 disabled:opacity-25 transition ease-in-out duration-150 text-lg'>+</button> <button onClick={() => onRemove(book)} className=' px-3 py-1 bg-red-700 border border-transparent rounded-md font-semibold text-white uppercase tracking-widest hover:bg-red-900 active:bg-red-900 focus:outline-none focus:border-red-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 text-lg'>-</button></td>
                        </tr>
                        )
                    })}
                    {cartList && <tr className='border-t-4 border-gray-500'><td className=' py-2 my-2 text-xl' col='7'> <strong>Total :</strong> {globalTotal.toFixed(2)}€
                      </td></tr>}
                    </tbody>
                  </table>
                  }
                </div>
              </div>
        
          <div className="p-4 flex justify-around items-center bg-white border-b border-gray-200">
          {cartList.length > 0 && <button className="flex  justify-center items-center px-2 py-2 bg-blue-700 border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:border-gray-100 focus:ring ring-gray-100 disabled:opacity-25 transition ease-in-out duration-150 w-onRemovefit">
          <a href="/test">  Checkout</a> </button> }
            <button onClick={() => showCart(false)} className="flex justify-center items-center px-4 py-2 mt-4 bg-gray-700 border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-gray-900 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">back to list</button>
          </div>
        
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
 



