import { useState,useEffect } from 'react'
import ProjectList from './components/ProjectList';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';


function App() {
  const [projects, setProjects] = useState([]);
  const [ error, setError] = useState('')
  const[loading,setLoading] = useState(false)

  const fetchData = async ()=>{
    setLoading(true);
    setError("");
    try {
      const responce = await fetch('http://localhost:3000/api/project');
      if(!responce.ok){
        throw new Error("Failed to fetch projects");
      }
      const data = await responce.json()
      setProjects(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  },[])
  

  return (
    <>
      <div className='p-6 w-full flex flex-col justify-center items-center'>
         <h1 className="text-2xl font-bold mb-4">📂 Project Dashboard</h1>

      <button
        onClick={fetchData}
        className="px-4 py-2 mb-4 bg-blue-600 text-white rounded-lg"
      >
        Refresh Projects 🔄
      </button>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && <ProjectList projects={projects} />}
      </div>
    </>
  )
}

export default App
