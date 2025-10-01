import { useEffect, useState } from 'react'
import WorkList from '../component/WorkList'
import './App.css'

function App() {
  
  return (
    <>
      <div className="min-h-screen bg-gray-300 p-6 rounded-xl ">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Work Experience
      </h1>
      <WorkList />
    </div>
    </>
  )
}

export default App
