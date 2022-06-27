import axios from 'axios';
import  React,{useState, useEffect} from 'react';



export const SubCats = ({catParent, select}) => {




const [subCategories,setSubCategories] = useState(null)
const [pageUrl, setPageUrl] = useState(null);

const getUrlPerPage = (hydraView) => setPageUrl(subCategories['hydra:view'][hydraView])


useEffect(() => {
  if(catParent){ 
  axios.get(`api/categories?page=1&catParent.name=${catParent.name}`).then(res => setSubCategories(res.data)).catch(err =>console.log(err))
 } 
},[catParent])
useEffect(() => {
  if (pageUrl) {
    axios.get(pageUrl).then((res) => setSubCategories(res.data)).catch((err) => log.error(err))
  }
},[pageUrl])

const btnClasses = 'flex justify-center items-center px-2 py-1 mt-2 cursor-pointer border border-transparent rounded-md font-medium text-sm text-gray-600 tracking-widest hover:underline active:text-gray-800  disabled:opacity-25 transition ease-in-out duration-150'

  return (
    <>
     
     {subCategories && 
      <div>
       <span className='uppercase text-gray-500 p-4'>total subCategories of {catParent.name} : <strong>{subCategories['hydra:totalItems']}</strong></span>
      <div className='grid xl:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 gap-1 p-4 m-2 w-full border-b-2 '>
      {subCategories['hydra:member'].map(cat => {
        return(<div className=' flex items-center cursor-pointer' key={cat.id} onClick={() => select(cat)}>
          <img className="w-16 h-16 rounded-full m-0 border-4 border-white " src={"uploads/images/" + cat.photo} alt={cat.title} />
          <h3 className='mx-1 text-md'>{cat.name}</h3>
          </div>
        )
      })}
        </div>
      </div>}

      
  { subCategories && subCategories["hydra:totalItems"] > 8 && <div className="w-full flex justify-around">
    <button onClick={() => getUrlPerPage('hydra:first')} className={btnClasses}>first</button>
    { subCategories['hydra:view']['hydra:previous'] && <button onClick={() => getUrlPerPage('hydra:previous')} className={btnClasses}>{'<<'}prev</button>}
    { subCategories['hydra:view']['hydra:next'] && <button onClick={() => getUrlPerPage('hydra:next')} className={btnClasses}>next {'>>'}</button>}
    <button onClick={() => getUrlPerPage('hydra:last')} className={btnClasses}>last</button>
    </div>}
    
    </>
  )
}
