import React from 'react'
import BaseLoader from './baseComponents/BaseLoader'

const Loader:React.FC = () => {
  return (
    <div className='dark:bg-[0,0,0,0.3] w-full h-screen flex items-center justify-center'>
      <BaseLoader  style='animate-spin text-black dark:text-blue-300' size={40}/>
    </div>
  )
}

export default Loader
