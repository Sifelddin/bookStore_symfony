import axios from 'axios'
import React, {useEffect, useState} from 'react'

const Checkout  = () => {

  const [user, setUser] = useState(null)
useEffect(() => {
  axios.get('api/me').then(res => setUser(res.data)).catch(err => console.log(err))
},[])

const inputClasses = "focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-md border-gray-300 rounded-md"
const labelClasses = "block text-md font-medium text-gray-700"

console.log(user);

  return (
    <div class=" h-screen w-full flex justify-center items-center">
		<div class=" w-3/5 p-3 bg-white rounded-md shadow-md">
    <div class="mt-1 relative rounded-md shadow-sm">
    <input type="text" name="customer" id="price" class={inputClasses}  />
  </div>
    <form action="">
    <div class="mx-auto grid grid-cols-2 gap-2  items-center">
				<div class='col-span-1 '>
        <div className='w-full'>
          <h2 className=' text-2xl text-center'>Shipping Address</h2>
          </div>
            <label for="shipAddress" class={labelClasses}>Address</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input type="text" name="shipAddress" id="shipAddress" class={inputClasses} />
            </div>
            <label for="shipCity" class={labelClasses}>City</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input type="text" name="shipCity" id="shipCity" class={inputClasses} />
            </div>
            <label for="shipZipCode" class={labelClasses}>ZipCode</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input type="text" name="shipZipCode" id="shipZipCode" class={inputClasses} />
            </div>
    </div>
				<div class='col-span-1 '>
          <div className='w-full'>
          <h2 className='text-2xl text-center'>Billing Address</h2>
          </div>
            <label for="shipAddress" class={labelClasses}>Address</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input type="text" name="shipAddress" id="shipAddress" class={inputClasses} />
            </div>
            <label for="shipCity" class={labelClasses}>City</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input type="text" name="shipCity" id="shipCity" class={inputClasses} />
            </div>
            <label for="shipZipCode" class={labelClasses}>ZipCode</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input type="text" name="shipZipCode" id="shipZipCode" class={inputClasses} />
            </div>
    </div>
</div>
      <button className='text-center mx-auto' onClick={e => e.preventDefault()}>Submit</button>
    </form>
    </div>
    </div>
  )
}

export default Checkout