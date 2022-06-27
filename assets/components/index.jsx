import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import App from './app';
import Checkout from './Checkout';
import Summary from './Summary';
 
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />}/>
            <Route path='/shipping' element={<Checkout/>} />   
            <Route path='/placeorder' element={<Summary/>} />   
        </Routes>
    </BrowserRouter>
);