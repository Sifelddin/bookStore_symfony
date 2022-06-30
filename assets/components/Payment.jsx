import React,{useState,useEffect}from 'react'
import { useForm , Controller } from 'react-hook-form';
import Cleave from 'cleave.js/react';
import axios from 'axios';



const Payment = () => {

    const [messageErr,setMessageErr] = useState(null)
    const [send, setSend] = useState(false);
    console.log(messageErr);
    if (
      localStorage.getItem('SHOPPING-CART') === null ||
      localStorage.getItem('ORDER') === null
    ) {
      location.assign('/');
    }
    
    
    
    
    useEffect(() => {
        if (send) {
        const books = JSON.parse(localStorage.getItem('SHOPPING-CART'))
        const order = JSON.parse(localStorage.getItem('ORDER'))
        axios
          .post('https://localhost:8000/api/orders', order)
          .then((res) => {
            books.map((book) => {
              axios
                .post('https://localhost:8000/api/book_orders', {
                  quantity: book.qty,
                  unitPrice: book.price,
                  book: book['@id'],
                  order: res.data['@id'],
                })
                .then((res) => console.log(res.data))
                .catch((err) => console.log(err));
            });
            localStorage.removeItem('ORDER');
            localStorage.removeItem('SHOPPING-CART');
            alert('your order has been registered');
            location.assign('/');
          })
          .catch((err) => console.log(err));
      }
    }, [send]);
  
    const {
        control,
        register,
        handleSubmit,
        
        formState: { errors },
      } = useForm({
          mode : 'onTouched'
      });
      const onSubmit = (data) => {
          let cartNums = [16,15,14]
          let ccNumber = data["cc-number"].replace(/\s/g,"").length;
          let cvv = data["cc-exp"].replace(/\//g,"").length
          console.log(data);
          if (cartNums.includes(ccNumber) && cvv === 4) {
            setMessageErr(null);
            setSend(confirm('you confirm you registration ?'))
            
          }else{
              setMessageErr("checkout your cart number or expiry date !")
          }
      };


      const exactCVV = (cvv) => {
        const regExp = /^[0-9]{3,4}$/;
        return regExp.test(cvv);
      };

      const inputClasses =
      'focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-7 sm:text-md border-gray-300 rounded-md';
      const labelClasses = 'block text-md m-1 text-gray-700';
  return (
    <div className='w-full flex justify-center items-center'>
        <div className='bg-white mt-40 p-6 shadow-md rounded-md'>
            <h1 className='text-xl text-center'>Confirm Purchase</h1>
            <div className='m-2 p-2'>
            <form onSubmit={handleSubmit(onSubmit)}> 
        
         {messageErr && (<span className='text-red-600 text-sm'>{messageErr}</span>)}
            <div className='h-24'>
            <label htmlFor='cc-number' className={labelClasses}>
                    Card number*
                  </label>
                  <Controller
                    control={control}
                    name="cc-number"
                    type="text"
                    render={({
                        field: { onChange, onBlur, value, name, ref },
                    }) => (
                        <Cleave placeholder='Ex: 5465 1313 2132 1321'
                        options={{creditCard: true}}
                        onChange={onChange} 
                        className={inputClasses} 
                        name={name}
                        value={value}
                        ref={ref}
                        onBlur={onBlur}
                        />
                        )} />
    
                    </div>
                    <div className=' h-24'>
                    <label htmlFor='cc-exp' className={labelClasses}>
                            Expiry date*
                        </label>
                        <Controller
                            control={control}
                            name="cc-exp"
                            type="tel"
                            render={({
                                field: { onChange, onBlur, value, name, ref },
                                fieldState: { error },
                            }) => (
                                <Cleave placeholder='mm/yy'
                                        options={{date: true ,datePattern : ['m','y'] , delimiter : '/' }}
                                        onChange={onChange} 
                                        className={inputClasses} 
                                        name={name}
                                        value={value}
                                        ref={ref}
                                        onBlur={onBlur}
                                        error={error}
                                        />
                                )} />
                     
                            </div>
                        
           
                    <div className='h-24'>
                  <label htmlFor='cc-csc' className={labelClasses}>
                    CVV*
                  </label>
                    <input
                      type='text'
                      id='cc-csc'
                      className={inputClasses}
                      {...register('cc-csc', {
                        required: true,validate : exactCVV
                      })}
                    />
                      {errors['cc-csc']?.type === 'required' && (
                          <span className='text-red-600 text-sm'>
                         Name on card is required
                        </span>)}
                      {errors['cc-csc']?.type === 'validate' && (
                          <span className='text-red-600 text-sm'>
                         scc is in correct format
                        </span>
                    )}
                    </div>
                 
                    
                    <div className='w-full mt-2 pt-2 flex justify-center items-center'>
                    <button
                  type='submit'
                  className=' rounded-md bg-green-500 px-6 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-green-400 mx-auto'>
                  validate
                </button>
                </div>
            </form>
            </div>
        </div>
    </div>
  )
}

export default Payment