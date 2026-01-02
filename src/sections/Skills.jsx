import Container from "../components/common/Container";
import SectionWrapper from "../components/layout/SectionWrapper";
import { skills } from "../data/skills";
import SkillBar from "../components/ui/SkillBar";

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <Container>
        <h2 className="text-3xl font-semibold mb-10">
          Skills
        </h2>

        <div className="space-y-6 max-w-xl">
          {skills.map(s => (
            <SkillBar key={s.name} {...s} />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
