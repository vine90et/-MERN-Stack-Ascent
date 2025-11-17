import React from 'react'
import img from "../assets/vineet.png"

const ProjectCard = ({ project }) => {
  const {
    imageUrl,
    title,
    featured,
    description,
    technologies = [],
    status = "planned",
    startDate,
    endDate,
    githubUrl,
    liveUrl
  } = project || {};

  return (
    <div className="relative bg-indigo-50 border border-indigo-200 shadow-md rounded-xl hover:shadow-indigo-300 my-2 hover:-translate-y-0.5 transition-all duration-300">

      <img src={img} alt="Project image" className="overflow-hidden mb-2 w-full rounded-t-xl" />

      {/* CONTENT */}
      <div className="pb-20 px-4"> 
        <h2>{title || "Untitled Project"}</h2>
        {featured && <span className="badge">Featured</span>}

        <p className="project-description">
          {description || "No description provided."}
        </p>

        {/* TECH SECTION */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {technologies.map((tech, idx) => (
            <span
              key={idx}
              className="text-xs rounded-2xl bg-indigo-500 text-white px-3 py-1 hover:bg-indigo-600 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* FIXED FOOTER */}
      <div className="absolute bottom-3 left-4 right-4 p-2">

        {/* STATUS + DATE */}
        <div className="flex justify-between text-sm text-gray-700 mb-1">
          <span>{status}</span>
          <span>
            {startDate ? new Date(startDate).toLocaleDateString() : "—"} -{" "}
            {endDate ? new Date(endDate).toLocaleDateString() : "Present"}
          </span>
        </div>

        {/* LINKS */}
        <div className="flex gap-4 text-indigo-600 text-sm font-medium">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noreferrer" className="hover:underline">
              GitHub
            </a>
          )}

          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noreferrer" className="hover:underline">
              Live Demo
            </a>
          )}
        </div>
      </div>

    </div>
  );
};

export default ProjectCard;
