import React, { useCallback, useEffect, useState } from "react";
import { fetchAllSkills } from "../Services/SkillsService";
import Spinner from "../Components/Spinner";
import SkillsCard from "../Components/SkillsCard";

const Skills = () => {
  const [error, setError] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSkills = useCallback(async () => {
    try {
      const responce = await fetchAllSkills();
      if (!responce || !responce.data) {
        throw new Error("Invalid response format");
      }

      setSkills(responce.data);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setError(error.message || "Failed to load projects");
      setSkills([]);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className="">
      <div className="px-5 my-19 mx-auto text-center">
        <h1 className="text-4xl font-bold text-indigo-400  ">
          My Skills
        </h1>
      </div>

      {error && (
        <div className="border-2 border-black/40 bg-gray-700/50 mx-auto text-center w-fit px-4 py-2 rounded-2xl ">
          <p className="text-red-500">{error}!</p>
          <button
            className="px-3 py-1 my-3 border-2 border-indigo-500 rounded-lg bg-indigo-500 hover:bg-indigo-700 transition duration-300 cursor-pointer hover:translate-y-[-3px] shadow-md hover:shadow-2xl  "
            onClick={fetchSkills}
          >
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="mx-auto text-center">
          <Spinner />
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto text-center space-x-2 w-2/3 ">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <SkillsCard key={skill._id} Skills={skill} />
            ))
          ) : (
            <p className="text-xl text-black/60 px-5 col-span-full ">
              No projects found. Add one to get started!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Skills;
