import React from 'react'

const WorkExperienceCard = ({company,role,startDate,endDate,location,technologies}) => {
  const formateDate = (dateString)=>{
    if(!dateString) return 'Present';
    return (
      new Date(dateString).toLocaleDateString('en-Us',{
      Date: 'numeric',
      month: 'short',
      year: 'numeric'
    }))
  }

  return (
    <div className='bg-gradient-to-br from-gray-500 via-gray-800 to-gray-900 rounded-2xl shadow-lg p-6 flex flex-col gap-3 hover:scale-105 transition-transform duration-300'>
      <h1 className='text-2xl font-bold text-white text-center'>{company} </h1>
      <h3 className='text-lg text-gray-300 text-center'>{role}</h3>
      <div className="flex justify-center gap-4 text-sm text-gray-400">
      <span>{formateDate(startDate)} 
        {" - "}
        {formateDate(endDate)}</span>
        <span>•</span>
        <span>{location}</span>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mt-3">
    {technologies?.map((tech, i) => (
      <span
        key={i}
        className="bg-blue-100 text-blue-700 px-3 py-1 text-xs font-medium rounded-full shadow-sm"
      >
        {tech}
      </span>
    ))}
  </div>
    </div>
  )
}

export default WorkExperienceCard