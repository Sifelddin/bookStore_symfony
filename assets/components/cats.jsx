import  React from 'react';



export const Cats = ({cats , select, setPageUrl}) => {



const getUrlPerPage = (hydraView) => cats['hydra:view'][hydraView] && setPageUrl(cats['hydra:view'][hydraView])
    
const btnClasses = 'flex justify-center items-center px-2 py-1 mt-2 cursor-pointer border border-transparent rounded-md font-medium text-sm text-gray-600 tracking-widest hover:underline active:text-gray-800  disabled:opacity-25 transition ease-in-out duration-150'
  
  return (
    <>
     {cats &&  <div className=''>
       <span className='uppercase text-gray-500 pl-4'>total categories : <strong>{cats['hydra:totalItems']}</strong></span>
      <div className='grid xl:grid-cols-2 xl:gap-2 p-2 w-full border-b-2 '>
      {cats['hydra:member'].map(cat => {
        return(<div className=' flex items-center cursor-pointer' key={cat.id} onClick={() => select(cat)}>
          <img className="w-16 h-16 rounded-full m-0 border-4 border-white " src={"uploads/images/" + cat.photo} alt={cat.title} />
          <h3 className='mx-2'>{cat.name}</h3>
          </div>
        )
      })}
   </div>
        <div className='flex justify-around w-full my-2 '>


  <button onClick={() => getUrlPerPage('hydra:first')} className={btnClasses}>first</button>
{ cats['hydra:view']['hydra:previous'] && <button onClick={() => getUrlPerPage('hydra:previous')} className={btnClasses}>{'<<'}prev</button>}
{ cats['hydra:view']['hydra:next'] && <button onClick={() => getUrlPerPage('hydra:next')} className={btnClasses}>next {'>>'}</button>}
<button onClick={() => getUrlPerPage('hydra:last')} className={btnClasses}>last</button>

        </div>
        
        </div>}
</>
  )
}
