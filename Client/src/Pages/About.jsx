import React, { useEffect, useState } from "react";
import ContactForm from "../Components/ContactForm";
import { createPortal } from 'react-dom';
import Spinner from "../Components/Spinner";
import { fetchAllSkills } from "../Services/SkillsService";

const About = () => {
  const [showContact, setShowContact] = useState(false);
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSkills = async()=>{
      try {
        setLoading(true)
        const responce = await fetchAllSkills();
        const data = responce.data || responce;
        setSkills(Array.isArray(data)? data.slice(0,3):[])
      } catch (error) {
        setError(error.message || "Failed to fetch skills");
      } finally {
        setLoading(false);
      }
    }
    fetchSkills();
  }, [])
  

  const closeContact = ()=>{
    setShowContact(false)
  }
  return (
    <div className="my-19 p-4">
        <h2 className="mx-auto text-center font-bold text-4xl text-indigo-400 pb-19">About Me</h2>
      <div className="md:flex md:justify-around mx-auto text-center w-full">
        <div className="md:w-1/2 mb-4 mx-auto text-left md:text-center txt">
          <p>
            I’m a MERN Stack Developer passionate about building fast, scalable,
            and user-focused web applications. I enjoy turning ideas into
            full-fledged digital experiences using MongoDB, Express.js, React,
            and Node.js. From crafting clean UI components to architecting
            efficient backend APIs, I strive to create applications that are
            both intuitive and high-performing.
          </p>
          <br></br>
          <p>
            Over the years, I’ve worked on projects involving real-time
            communication, authentication systems, RESTful APIs. I love
            exploring new technologies, optimizing code, and solving complex
            problems with clean, maintainable solutions.
          </p>
        </div>
        <div className="bg-indigo-50 max-w-fit border-2 px-3 border-indigo-200 rounded-lg p-3 shadow-md hover:-translate-y-0.5 transform duration-300 mx-auto text-center">
          <h3 className="font-semibold text-center pb-3 text-lg  ">Quick Fact</h3>
          <ul>
            <li className="">
                <span className="font-semibold">Location: </span>
                <span>Your City, Country</span>
              </li>
              <li className="">
                <span className="font-semibold">Experience:</span>
                <span> ...? Years</span>
              </li>
              <li className="">
                <span className="font-semibold">Education:</span>
                <span> Your Education</span>
              </li>
              <li className="fact-item">
                <span className="font-semibold">Languages:</span>
                <span> English, Hindi, Marathi</span>
              </li>
          </ul>
      
          <button 
          className="mt-3 mx-auto block text-center cursor-pointer bg-indigo-200 px-2 py-1 rounded-lg hover:bg-indigo-400 duration-300 "
          onClick={()=> setShowContact(true)}
          >
            Contact Me
          </button>
          {
            showContact &&
            createPortal(
            <ContactForm 
              closeContact={closeContact}
            />,
            document.body
          )}
        </div>
      </div>

      <div className="mx-auto text-center my-5">
        <h2 className="font-bold text-xl text-indigo-400 ">What I Do</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto text-center space-x-2 w-2/3 ">
            {loading ? (
              <div className="loading-spinner"><Spinner /></div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : (
              skills.map((skill) => (
                <div key={skill._id} className="relative bg-indigo-50 border border-indigo-200 shadow-md rounded-xl hover:shadow-indigo-300 py-2 my-2 hover:-translate-y-0.5 transition-all duration-300">
                  <h3 className="skill-name font-bold text-xl text-indigo-500">{skill.name}</h3>
                  <p className="skill-card-text">{skill.description}</p>
                </div>
              ))
            )}
          </div>
      </div>
    </div>
  );
};

export default About;