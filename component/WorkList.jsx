import React, { useEffect, useState } from "react";
import WorkExperiencCard from "./WorkExperiencCard";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage"

const WorkList = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");

  const fetchedData = async () => {
    setloading(true);
    setError("");
    try {
      const responce = await fetch("http://localhost:3000/api/work");
      if (!responce.ok) throw new Error("Failed to fetch projects");
      const data = await responce.json();
      console.log(data)
      setExperience(data.meta.data || []);
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setloading(false);
    }
  };
  
  useEffect(() => {
    fetchedData();
  }, []);

  if(loading) return <Loader />
  if(error) return <ErrorMessage  message={error} onRetry={fetchedData} />

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {experience.map((e)=>(
          <WorkExperiencCard 
            key = {e._id}
            company = {e.company}
            role={e.role}
            endDate={e.endDate}
            startDate={e.startDate}
            location ={e.location}
            technologies = {e.technologies}
          />
        ))}
      </div>
    </>
  )
};

export default WorkList;
