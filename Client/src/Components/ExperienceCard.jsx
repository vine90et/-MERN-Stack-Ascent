import React from 'react'

const ExperienceCard = ({experience}) => {
     const {
    _id,
    company = 'Company',
    position = 'Position',
    location,
    startDate,
    endDate,
    description,
    achievements = [],
    technologies = [],
    color = '#6c63ff',
    createdAt,
    updatedAt,
  } = experience || {};

  const date = (date)=>{
     if (!date) return 'Present';
     return new Date(date).toLocaleDateString('en-Us',{
      year: 'numeric',
      month: 'short'
    });
  }

  return (
    <div className='relative bg-indigo-50 border shadow-md rounded-xl hover:shadow-indigo-300 my-2 hover:-translate-y-0.5 transition-all duration-300 '>
        <div className='space-x-2 p-3 '>
            <h2 className='font-bold text-lg text-indigo-500 '>{company}</h2>
            <p>
                <span>{date(startDate)}-{date(endDate)}</span>
            </p>
        </div>

        <div className='p-3 pt-0 w-full'> 
            <h2 className='font-bold text-gray-700'>{position}</h2> 
            <p className='text-gray-600 -mt-2'>{location}</p>
            <p className='mt-2 px-2'>{description}</p>
        </div>

        <div className='px-2' >
            <h3 className='font-bold text-indigo-700/80 '>Key Achievemets</h3>
            <ul className='flex flex-col items-start px-5 max-h-[35%] overflow-y-hidden '>
                {
                    achievements.map((item,idx)=>(
                            <li key={idx} className='text-gray-700 list-disc'>
                                {item}
                            </li>
                        ))
                    } 
            </ul>
        </div>

        <div className='text-xs flex gap-2 px-3 py-2 flex-wrap '>
            {
                technologies.map((tech,idx)=>(
                    <p className='bg-indigo-600 rounded-xl px-2 py-1'>{tech}</p>
                ))
            }
        </div>

        <div className='flex justify-between '>
            <small className='texx-gary-700/70 px-4 pb-4'>Created: {createdAt ? new Date(createdAt).toLocaleDateString() : '—'}</small>
            <small className='texx-gary-700/70 px-4 pb-4'>Updated: {updatedAt ? new Date(updatedAt).toLocaleDateString() : '—'}</small>
        </div>
    </div>
  )
}

export default ExperienceCard