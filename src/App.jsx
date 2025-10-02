import WorkExperienceList from './component/WorkExperienceList'

function App() {

  return (
    <div className="w-full flex justify-center flex-col items-center mt-5 overflow-y-scroll">
      <h1 className='text-bold text-4xl mb-2'>Work Experience</h1>
      <div className="text-center p-8 w-2/3 bg-gray-500 shadow-xl min-h-[75vh] rounded-2xl">
        <WorkExperienceList />
      </div>
    </div>

    
  )
}

export default App
