import axios from 'axios';
import  React,{useState, useEffect,useRef} from 'react';
import Spinner from './Spinner';



export const SubCats = ({catParent, select}) => {


const [subCategories,setSubCategories] = useState({loadSubCategories : true, data})
const [pageUrl, setPageUrl] = useState(null);
const elements = useRef([])

const getUrlPerPage = (hydraView) => setPageUrl(data['hydra:view'][hydraView])

useEffect(() => {
  if(catParent){ 
  axios.get(`api/categories?page=1&catParent.name=${catParent.name}`).then(res =>{ 
    setSubCategories({loadSubCategories: false, data: res.data});
  }).catch(err =>console.log(err))
 } 
},[catParent])
useEffect(() => {
  if (pageUrl) {
    axios.get(pageUrl).then((res) => setSubCategories({loadSubCategories: false, data: res.data})).catch((err) => log.error(err))
  }
},[pageUrl])


const {loadSubCategories , data} = subCategories;

const btnClasses = 'flex justify-center items-center px-2 py-1 mt-2 cursor-pointer border border-transparent rounded-md font-medium text-sm text-gray-600 tracking-widest hover:underline active:text-gray-800  disabled:opacity-25 transition ease-in-out duration-150'

const addToRefs  =  (el) => {
  if (el && !elements.current.includes(el)) {
    elements.current.push(el);
  }
}

const addStyles = (cat) =>{
  let styles = ['border-green-400']
  elements.current.map(el => {
    cat.target.id === el.id ? el.classList.add(...styles) : el.classList.remove(...styles)
  })
}
 

  if(!catParent){
  return <div className="w-full h-full flex justify-center items-center text-lg uppercase"> <p>recently published books in the list below</p></div>
  }
  if (loadSubCategories) {
    return <div className='w-full h-full flex items-center justify-center'><Spinner/></div> 
  }else {

      let catsClasses = 'grid xl:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 gap-1 p-4 m-2 w-full';
      if (data['hydra:totalItems'] > 8) {
        catsClasses += ' border-b-2';
      } 


  return (
    <div className='p-3 bg-orange-50 my-5 shadow-md'>
      <div>
       <span className='uppercase text-gray-500 p-4'>total subCategories of {catParent.name} : <strong>{data['hydra:totalItems']}</strong></span>
      <div className={catsClasses}>
      {data['hydra:member'].map(cat => {
        return(<div className=' flex items-center cursor-pointer' key={cat.id} onClick={() => select(cat)}>
          <img id={cat.id} className="w-16 h-16 rounded-full m-0 border-4 border-white " ref={addToRefs} onClick={(e) => addStyles(e)} src={"uploads/images/" + cat.photo} alt={cat.title} />
          <h3 className='mx-1 text-md'>{cat.name}</h3>
          </div>
        )
      })}
        </div>
      </div>

      
    {data["hydra:totalItems"] > 8 && <div className="w-full flex justify-around">
    <button onClick={() => getUrlPerPage('hydra:first')} className={btnClasses}>first</button>
    { data['hydra:view']['hydra:previous'] && <button onClick={() => getUrlPerPage('hydra:previous')} className={btnClasses}>{'<<'}prev</button>}
    { data['hydra:view']['hydra:next'] && <button onClick={() => getUrlPerPage('hydra:next')} className={btnClasses}>next {'>>'}</button>}
    <button onClick={() => getUrlPerPage('hydra:last')} className={btnClasses}>last</button>
    </div>}
    
    </div>
  )
}
}
