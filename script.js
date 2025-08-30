const skills = [
  { name: "HTML", proficiency: "Intermediate" },
  { name: "CSS", proficiency: "Advanced" },
  { name: "JavaScript", proficiency: "Beginner" },
  { name: "Python", proficiency: "Intermediate" }
];

const mapskils = skills.map((item)=>{
    console.log(`${item.name} (${item.proficiency})`)
})
const filteredSkills = skills.filter(item => item.proficiency === "Intermediate")
console.log(filteredSkills)

