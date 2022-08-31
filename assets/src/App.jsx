import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Store from './pages/Store';
import Checkout from './pages/Checkout';
import Summary from './pages/Summary';
import Book from './pages/Book';
import Payment from './pages/Payment';
import AuthContext from './contexts/OrderContext';
import Error from './pages/Error';

const container = document.getElementById('root');
const root = createRoot(container);

const App = () => {
  return (
    <BrowserRouter>
      <AuthContext>
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="/ordering" element={<Checkout />} />
          <Route path="/placeorder" element={<Summary />} />
          <Route path="/book/:slug/:id" element={<Book />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </AuthContext>
    </BrowserRouter>
  );
};

root.render(<App />);
