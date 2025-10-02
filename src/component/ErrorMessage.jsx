import React from 'react'

const Error = ({message, onRetry}) => {
  return (
    <div className='flex justify-center items-center flex-col'>
      <h3 className='text-red-500 font-lg'>{message} </h3>
      <button className='border-2 border-black text-black font-medium rounded-xl px-6 py-2 mt-3 
             hover:bg-black hover:text-white transition-colors duration-150 shadow-sm' onClick={onRetry}>Retry</button>
    </div>
  )
}

export default Error