import React from 'react'

const ErrorMessage = ({message, onRetry}) => {
  return (
    <div className='bg-gradient-to-br from-gray-500 via-gray-800 to-gray-900 rounded-2xl shadow-lg p-6  w-1/3 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-fit'>
        <h3 className='text-red-400 font-semibold'>{message}</h3>
        <button  className="border-2 border-black text-black font-medium rounded-xl px-6 py-2 mt-3 
             hover:bg-black hover:text-white transition-colors duration-300 shadow-sm" onClick={onRetry}>Retry</button> 
    </div>
  )
}

export default ErrorMessage