interface SkillTagsProps {
  skills: string[]
}

export function SkillTags({ skills }: SkillTagsProps) {
  return (
    <ul className="skill-tags" role="list">
      {skills.map(skill => (
        <li key={skill} className="skill-tag">{skill}</li>
      ))}
    </ul>
  )
}
