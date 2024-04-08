import React, { useContext } from 'react'
import { LoadingContext } from '../../services/context/loading.context';



const Loading = () => { 
  const { loader } = useContext(LoadingContext);
  return (    
    loader && 
     (<div className="loader">
      <span className='loader-content'>
      <span className='loader-spinner'></span>
        </span>      
    </div>)
  )
}

export default Loading