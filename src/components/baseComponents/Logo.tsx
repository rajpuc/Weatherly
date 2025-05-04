import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { images } from '../../assets/asset';

const Logo: React.FC = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <div className="flex items-center gap-2 ">
      <img
        src={darkMode ? images.darkLogo : images.lightLogo}
        alt="Weatherly Logo"
        className="w-10 h-10"
      />
      <span className="text-2xl text-black font-semibold dark:text-blue-300">Weatherly</span>
    </div>
  );
};

export default Logo;
