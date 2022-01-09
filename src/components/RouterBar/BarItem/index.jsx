import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';

export const BarItem = ({ route, children }) => {
  const location = useLocation();

  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(location.pathname === route);
    return () => {
      setActive(false);
    };
  }, [location.pathname, route]);

  return (
    <li className={`mt-8 border-r-8 ${active ? 'border-purple-500' : ''}`}>
      <Link to={route} className="block py-2 hover:bg-gray-200">
        {children}
      </Link>
    </li>
  );
};
