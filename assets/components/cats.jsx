import  React from 'react';



export const Cats = ({cats , select}) => {

  return (
    <>
      <h2 className='text-lg uppercase text-center underline my-4'> Categories </h2>
      <div className='grid grid-cols-2 gap-1  p-4'>
      {cats && cats.map(cat => {
        return(<div className=' flex items-center cursor-pointer' key={cat.id} onClick={() => select(cat)}>
          <img className="w-16 h-16 rounded-full m-0 border-4 border-white " src={"uploads/images/" + cat.photo} alt={cat.title} />
          <h3 className='mx-2'>{cat.name}</h3>
          </div>
        )
      })}
      
   </div>
</>
  )
}
