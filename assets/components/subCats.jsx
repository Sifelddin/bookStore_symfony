import  React from 'react';



export const SubCats = ({subCategories , select}) => {

  return (
    <div className=''>
       <h2 className='text-lg uppercase text-center underline'> {subCategories.name} </h2>
    <ul className='w-full inline-block'>
      { subCategories.subCategories && subCategories.subCategories.map(cat => { 
        return(<li className='flex items-center float-left p-3 m-3 w-1/4 cursor-pointer' key={cat.id} onClick={() => select(cat)}>
        <img className="w-16 h-16 rounded-full m-0 border-2 border-x-white" src={"uploads/images/" + cat.photo} alt={cat.title} />
        <h3 className='mx-2'>{cat.name}</h3>
        </li>
      )
      })}
    </ul>
    </div>
  )
}
