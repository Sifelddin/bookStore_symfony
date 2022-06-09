import  React,{useState,useEffect} from 'react';



export const SubCats = ({subCategories , select}) => {

  return (
    <div className='flex justify-around'>
      { subCategories && subCategories.map(cat => { 
        return(<div className='mx-auto' key={cat.id} onClick={() => select(cat.books)}>
        <img className="w-16 h-16 rounded-full m-0" src={"uploads/images/" + cat.photo} alt={cat.title} />
        </div>
      )
      })}
    </div>

  )
}
