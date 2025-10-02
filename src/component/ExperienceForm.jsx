import React, { useState } from "react";

const ExperienceForm = ({ onSaved }) => {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    skills: "",
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.company || !formData.role || !formData.startDate) {
      setMessage("Company, Position and Start date are required");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/work/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          skills: formData.skills.split(",").map((s) => s.trim()),
        }),
      });

      if (response.ok) {
        setFormData({
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
          skills: "",
        });
        setMessage("Experience saved successfully ✅");
        if (onSaved) onSaved();
      } else {
        setMessage("❌ Failed to save");
      }
    } catch (error) {
      setMessage("⚠️ Error connecting to server");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
      endDate: name === "current" && checked ? "" : formData.endDate,
    });
  };

  return (
    <div className="border-2 border-black rounded-xl w-1/2 mx-auto shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-col p-4 gap-4">
        <label className="text-sm font-semibold">
          Company:
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            className="border-2 border-black rounded-xl px-2 py-1 ml-2"
            onChange={handleChange}
          />
        </label>

        <label className="text-sm font-semibold">
          Position:
          <input
            type="text"
            name="role"
            placeholder="Position"
            value={formData.role}
            className="border-2 border-black rounded-xl px-2 py-1 ml-2"
            onChange={handleChange}
          />
        </label>

        <label className="text-sm font-semibold">
          Start Date:
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            className="border-2 border-black rounded-xl px-2 py-1  ml-2"
            onChange={handleChange}
          />
        </label>

        {!formData.current && (
          <label className="text-sm font-semibold">
            End Date:
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              className="border-2 border-black rounded-xl px-2 py-1  ml-2"
              onChange={handleChange}
            />
          </label>
        )}

        <label className="text-sm font-semibold flex items-center gap-2">
          <input
            type="checkbox"
            name="current"
            checked={formData.current}
            onChange={handleChange}
          />
          Current Role
        </label>

        <label className="text-sm font-semibold">
          Description:
          <textarea
            name="description"
            placeholder="Job Description"
            value={formData.description}
            className="border-2 border-black rounded-xl px-2 py-1 h-24  ml-2"
            onChange={handleChange}
          />
        </label>

        <label className="text-sm font-semibold ">
          Skills:
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            value={formData.skills}
            className="border-2 border-black rounded-xl px-2 py-1  ml-2"
            onChange={handleChange}
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Save Experience
        </button>

        {message && <p className="text-sm text-red-600">{message}</p>}
      </form>
    </div>
  );
};

export default ExperienceForm;
