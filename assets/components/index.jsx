import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './app';
import Checkout from './Checkout';
import Summary from './Summary';
import Book from './Book';
import Payment from './Payment';


const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/shipping' element={<Checkout />} />
      <Route path='/placeorder' element={<Summary />} />
      <Route path='/book/:slug/:id' element={<Book />} />
      <Route path='/payment' element={<Payment />} />
    </Routes>
  </BrowserRouter>,
);
