import React, { lazy, Suspense, useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "./store/store"
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";


const Home = lazy(() => import('./pages/Home'));


const App : React.FC = () => {
  const darkMode = useSelector((state:RootState)=>state.theme.darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="dark:bg-black dark:text-white w-full min-h-screen">
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
