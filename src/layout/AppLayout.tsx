import React, { PropsWithChildren } from 'react';
import Header from '../components/Header';

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default AppLayout;
