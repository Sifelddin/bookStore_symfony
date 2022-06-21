import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import App from './app.jsx';
import Test from './test.jsx';
 
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<App></App>)

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}></Route>
             <Route path='test' element={<Test/>} />   
           
        </Routes>
    </BrowserRouter>
);