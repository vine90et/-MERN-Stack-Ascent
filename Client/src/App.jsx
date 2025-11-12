import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import About from './Pages/About'
import Skills from './Pages/Skills'
import Experience from './Pages/Experience'
import Projects from './Pages/Projects'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/skills' element={<Skills />}></Route>
        <Route path='/project' element={<Projects />}></Route>
        <Route path='/experience' element={<Experience />}></Route>
      </Routes>
    </div>
  )
}

export default App