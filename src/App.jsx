import { useState } from 'react'
import ExperienceForm from './component/ExperienceForm'
import ExperienceList from './component/ExperienceList'

function App() {
  const [refresh, setRefresh] = useState(false)

  return (
    <>
      <div className='w-full h-full p-20 flex items-center flex-col'>
        <h1 className='my-4 font-bold text-2xl'>Work Experience Form</h1>
        <ExperienceForm onSaved={()=> setRefresh(!refresh)} />

        <ExperienceList refresh={refresh} />
      </div>
    </>
  )
}

export default App
