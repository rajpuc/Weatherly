import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setDarkMode } from "../../features/theme/themeSlice";
import { Moon, Sun } from "lucide-react";

const DarkModeToggleButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const toggleTheme = (): void => {
    dispatch(setDarkMode());
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded  transition-all duration-300  ${darkMode?'rotate-180':'rotate-0'}`}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={darkMode ? "Light Mode" : "Dark Mode"}
    >
      {darkMode ? <Sun size={25} className="text-blue-300"/> : <Moon size={25} className="text-black"/>}
    </button>
  );
};

export default DarkModeToggleButton;
