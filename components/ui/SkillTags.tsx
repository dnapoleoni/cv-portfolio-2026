interface SkillTagsProps {
  skills: string[];
}

export function SkillTags({ skills }: SkillTagsProps) {
  return (
    <ul className="skill-tags">
      {skills.map((skill) => (
        <li key={skill} className="skill-tag">
          {skill}
        </li>
      ))}
    </ul>
  );
}
