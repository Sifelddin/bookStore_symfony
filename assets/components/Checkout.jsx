import axios from 'axios'
import React, {useEffect, useState} from 'react'

const Checkout  = () => {

  const [user, setUser] = useState(null)
useEffect(() => {
  axios.get('/test').then(res => setUser(res.data)).catch(err => console.log(err))
},[])

console.log(user);
  return (
    <div>Test page</div>
  )
}

export default Checkout