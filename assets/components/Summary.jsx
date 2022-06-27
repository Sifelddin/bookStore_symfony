import React from 'react'

const Summary = () => {

    const books = JSON.parse(localStorage.getItem('SHOPPING-CART'))
    const order = JSON.parse(localStorage.getItem('ORDER'))
    console.log(order);
  return (
     <div className='h-screen w-full flex justify-center items-center'>
        <div className='grid grid-cols-4 md:w-4/5 mx-auto bg-white h-auto' >
            <div className=' col-span-3'> 
                <div id='shipping address' className='p-5 m-5 rounded-md bg-orange-50'>
                     <p className='text-xl my-2'><strong>Shipping Address : </strong> {order.shipAddress + " " + order.shipZipCode + " " + order.shipCity}</p>
                   
                <p className='text-xl my-2'><strong>Billing Address : </strong> {order.billAddress + " " + order.billZipCode + " " + order.billCity}</p>
                {order.payMethod && (
    
                  <p className='text-lg my-2'>  <strong>Pay Method :</strong> {order.payMethod}</p>
                )}
                </div>
                <div id='billing  address' className=' p-5 m-5 rounded-md bg-orange-50'>
                  <strong> order books  :</strong>
                  {books && ( <table className='p-4 m-4'><tbody>
                          {books.map((book) => {
                            return (
                              <tr key={book.id} className="w-full">
                                <td className='my-2 '>
                                  <img
                                    className=' border-white object-center h-24 w-20'
                                    src={'uploads/images/' + book.photo}
                                  />
                                </td>
                                <td colSpan="3" className='px-2 py-2 max-w-sm whitespace-pre-wrap'>{book.title}</td>
                                <td className='px-2 py-2'>{book.price}€  X  {book.qty} = {(book.price * book.qty).toFixed(2)}€</td>
                              </tr>
                            );
                          })}
                        </tbody></table>)}
                </div>
            </div>

        <div className=" col-span-1 m-5 p-5 bg-orange-50"> 
        <h2 className='border-b-2 border-gray-500 pb-3 text-lg'>Order Summary:</h2>
        </div>
        </div>
    </div>
  )
}

export default Summary