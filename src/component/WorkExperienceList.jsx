import React, { useEffect, useState } from 'react'
import Error from './ErrorMessage'
import Loader from './Loader'
import WorkExperienceCard from './WorkExperienceCard'

const WorkExperienceList = () => {
    const [experience, setExperience] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchExperience = async()=>{
        setLoading(true)
        setError('')
        try {
        const responce = await fetch('http://localhost:3000/api/work')
        if(!responce.ok){
            throw new Error("Failed to fetch experiences")
        }
        const data = await responce.json()
        console.log(data)
        setExperience(Array.isArray(data?.meta?.data)? data.meta.data : [])
    } catch (error) {
        setError(error.message)
    }finally{
        setLoading(false);
    }
    }

    useEffect(() => {
        fetchExperience()
    }, [])
    if(loading) return <Loader />
    if(error) return <Error message={error} onRetry={fetchExperience} />

    
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {experience.map((e)=>(
            <WorkExperienceCard
                key = {e._id || e.userId }
                company = {e.company}
                role={e.role}
                endDate={e.endDate}
                startDate={e.startDate}
                location ={e.location}
                technologies = {e.technologies}
            />
        ))}
    </div>
  )
}

export default WorkExperienceList