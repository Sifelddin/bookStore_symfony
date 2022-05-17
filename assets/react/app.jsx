import  React,{useState,useEffect} from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';


const App = () => {

const [posts,setPosts] = useState([])

useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => setPosts(res.data)).catch(e=>console.log(e))
    
},[])

  return (
      <>
    <div>
        <ul>
        {posts.map(post => {
            return(<li key={post.id}>{post.title}</li>)
        })}
        </ul>
    </div>
    <h1>vincent</h1></>
  )
}

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App/>);