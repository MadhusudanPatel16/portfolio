import Container from "../components/common/Container";
import SectionWrapper from "../components/layout/SectionWrapper";
import { techStack } from "../data/tech";
import TechCard from "../components/ui/TechCard";

export default function TechStack() {
  return (
    <SectionWrapper>
      <Container>
        <h2 className="text-3xl font-semibold mb-10">
          Technologies
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {techStack.map(t => (
            <TechCard key={t} name={t} />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
