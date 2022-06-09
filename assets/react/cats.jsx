import  React from 'react';



export const Cats = ({cats , select}) => {


  console.log(cats);
  return (
      <>
      
      {cats && cats.map(cat => {
        return(<div key={cat.id} onClick={() => select(cat.subCategories)}>
          <p>{cat.title}</p>
          <img className="w-40 h-40" src={"uploads/images/" + cat.photo} alt={cat.photo} />
          </div>
        )
      })}
      
    <div>
        <p>categories</p>
    </div>
</>
  )
}
