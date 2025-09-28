
function ProjectList({ projects }) {
  if (projects.length === 0) {
    return <p>No projects found 🚫</p>;
  }

  return (
    <ul className="space-y-2 gap-4  flex justify-center items-center">
      {projects.map((project) => (
        <li
          key={project.id}
          className="p-4 bg-gray-100 rounded-lg shadow-sm"
        >
          <h2 className="font-semibold">{project.name}</h2>
          <p>{project.description}</p>
        </li>
      ))}
    </ul>
  );
}

export default ProjectList;