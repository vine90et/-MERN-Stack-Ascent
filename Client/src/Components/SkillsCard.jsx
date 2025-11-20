import React from "react";
import { Code } from 'lucide-react';

const SkillsCard = ({ Skills }) => {
  const {
    _id,
    icon,
    color = "#6c63ff",
    name = "Untitled Skill",
    category = "General",
    description = "No description provided.",
    yearsOfExperience,
    proficiency,
    createdAt,
    updatedAt,
  } = Skills || {};

  return (
    <div className="relative bg-indigo-50 border border-indigo-200 shadow-md rounded-xl hover:shadow-indigo-300 py-2 my-2 hover:-translate-y-0.5 transition-all duration-300">
        <div className="skill-top py-2 px-4 flex items-start">
        <i className={`${icon || "fas fa-star"} skill-icon`} style={{ color }} />
        <div className="skill-header pt-3">
          <h3 className="skill-name font-bold text-xl text-indigo-500 ">{name}</h3>
          <span className="bg-indigo-600 rounded-xl px-1 text-xs">{category}</span>
        </div>
      </div>

      <div>
        <p>{description} </p>

        <div className="flex justify-between text-sm px-4 py-2 ">
            <span className="text-xs text-gray-600/80" ><strong>Experience:</strong> {yearsOfExperience ?? "—"} yrs</span>
            <span className="text-xs text-gray-600/80" ><strong>Level:</strong> {proficiency || "—"}</span>
        </div>
        

        <div className="flex justify-between text-sm px-4 ">
            <span className="text-xs text-gray-600/80" ><strong>Created:</strong> {createdAt ? new Date(createdAt).toLocaleDateString(): "—"} yrs</span>
            <span className="text-xs text-gray-600/80" ><strong>Update:</strong> {updatedAt ? new Date(updatedAt).toLocaleDateString(): "—"}</span>
        </div>


      </div>

    </div>
  );
};

export default SkillsCard;
