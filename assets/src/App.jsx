import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Store from './pages/Store';
import Checkout from './pages/Checkout';
import Summary from './pages/Summary';
import Book from './pages/Book';
import Payment from './pages/Payment';
import OrderContext from './contexts/OrderContext';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

const App = () => {
  return (
    <BrowserRouter>
      <OrderContext>
        <Routes>
          <Route path='/' element={<Store />} />
          <Route path='/ordering' element={<Checkout />} />
          <Route path='/placeorder' element={<Summary />} />
          <Route path='/book/:slug/:id' element={<Book />} />
          <Route path='/payment' element={<Payment />} />
        </Routes>
      </OrderContext>
    </BrowserRouter>
  );
};

root.render(<App />);
