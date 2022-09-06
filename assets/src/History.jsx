import React from 'react';
import { createRoot } from 'react-dom/client';
import OrdersList from './profileComponents/OrdersList';
import AuthContext from './contexts/OrderContext';

const container = document.getElementById('history');
const root = createRoot(container);

const History = () => {
  return (
    <AuthContext>
      <OrdersList />
    </AuthContext>
  );
};

root.render(<History />);
