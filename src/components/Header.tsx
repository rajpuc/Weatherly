import React from 'react';
import Logo from './baseComponents/Logo';
import DarkModeToggleButton from './baseComponents/DarkModeToggleButton';

const Header: React.FC = () => {
  return (
    <header className="flex container mx-auto items-center justify-between px-4 py-2 border-b dark:border-gray-700">
      <Logo />
      <DarkModeToggleButton />
    </header>
  );
};

export default Header;
