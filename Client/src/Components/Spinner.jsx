import { LoaderCircle } from 'lucide-react'
import React from 'react'

const Spinner = () => {
  return (
    <div className='font-bold   '>
       <LoaderCircle className='animate-spin text-center my-auto text-indigo-800 mx-auto z-70 ' size={40} />
    </div>
  )
}

export default Spinner