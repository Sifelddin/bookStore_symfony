import React, { useEffect } from 'react';
import { BiError } from 'react-icons/bi';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { buttonClasses } from '../layouts/helpers';

const Error = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate('/', { replace: true }), 8000);
  }, []);

  return (
    <div className="flex justify-center flex-col items-center text-center h-screen space-y-5">
      <div className="flex items-center">
        <BiError className="text-4xl text-red-700" />
        <h2 className="text-2xl">404 Error - Page introuvable</h2>
      </div>
      <p className="text-lg">
        the path : <strong className="mx-2">{location.pathname}</strong> is not found
      </p>
      <Link className={buttonClasses('gray')} to="/" replace>
        back to Store
      </Link>
    </div>
  );
};

export default Error;
