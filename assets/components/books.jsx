import  React,{useState,useEffect} from 'react';



export const Books = ({catBooks,select}) => {

  console.log(catBooks);

  return (
    <>
        <h2 className='text-lg uppercase text-center underline my-4'> {catBooks.name} </h2>
      <div className='grid grid-cols-2 items-center p-2 m-2 gap-2'>
      {catBooks.books && catBooks.books.map(book => {
        return (
          <div className='flex  items-center cursor-pointer bg-white' key={book.id} onClick={() => select(book)}>
            <div className='mr-2'>
            <img className="w-24 h-24" src={"uploads/images/" + book.photo} alt={book.photo} />
            </div>
            <div className='ml-2'> 
            <h3 className='text-lg text-blue-500'>{book.title}</h3>
            <span>{book.price}€</span>
            </div>
           
        </div>
      )
    })}
</div>
</>
  )
}
