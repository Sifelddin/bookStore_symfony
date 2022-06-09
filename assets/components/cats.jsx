import  React from 'react';



export const Cats = ({cats , select}) => {

  return (
      <div className='grid grid-cols-2 gap-1'>
      
      {cats && cats.map(cat => {
        return(<div className='mx-auto' key={cat.id} onClick={() => select(cat.subCategories)}>
          <img className="w-16 h-16 rounded-full m-0" src={"uploads/images/" + cat.photo} alt={cat.title} />
          </div>
        )
      })}
      
   </div>

  )
}
