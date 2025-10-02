import React, { useEffect, useState } from "react";

function ExperienceList({ refresh }) {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/work");
        const data = await res.json();
        console.log(data)
        setExperiences(Array.isArray(data.meta.data) ? data.meta.data : []);
      } catch (err) {
        console.error("Error fetching experiences", err);
      }
    };
    fetchExperiences();
  }, [refresh]);

  const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric", // remove if you only want Month Year
  });
};


  return (
    <div className="p-6 max-w-3xl mx-auto">
  <h2 className="text-2xl font-bold mb-6">All Experiences</h2>

  {experiences.length === 0 ? (
    <p className="text-gray-500">No experiences found.</p>
  ) : (
    <ul className="space-y-4">
      {experiences.map((exp) => (
        <li
          key={exp._id || exp.company}
          className="border border-gray-300 rounded-xl p-4 shadow-sm hover:shadow-md transition"
        >
          <h3 className="text-lg font-semibold text-blue-700">
            {exp.position}
          </h3>
          <p className="text-gray-700">
            <span className="font-medium">{exp.company}</span> <br />
            <span className="text-sm text-gray-500">
              {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
            </span>
          </p>

          {exp.description && (
            <p className="mt-2 italic text-gray-600">{exp.description}</p>
          )}

          {exp.skills && exp.skills.length > 0 && (
            <p className="mt-2 text-sm text-gray-700">
              <span className="font-semibold">Skills:</span>{" "}
              {Array.isArray(exp.skills) ? exp.skills.join(", ") : exp.skills}
            </p>
          )}
        </li>
      ))}
    </ul>
  )}
</div>

  );
}

export default ExperienceList;