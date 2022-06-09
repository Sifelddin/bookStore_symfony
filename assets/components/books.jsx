import  React,{useState,useEffect} from 'react';



export const Books = ({books,select}) => {

  console.log(books);

  return (
      <div className='grid grid-cols-3 items-center p-4 m-4'>
      {books && books.map(book => {
        return (
          <div className='mx-auto' key={book.id} onClick={() => select(book)}>
            <p>{book.title}</p>
            <img className="w-20 h-20" src={"uploads/images/" + book.photo} alt={book.photo} />
            <span>{book.price}€</span>
        </div>
      )
    })}
</div>
  )
}
