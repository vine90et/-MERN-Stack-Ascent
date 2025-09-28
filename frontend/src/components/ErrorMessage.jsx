import React from 'react'

const ErrorMessage = ({message}) => {
  return (
    <div>
        <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-lg">
      ❌ {message}
        </div>
    </div>
  )
}

export default ErrorMessage