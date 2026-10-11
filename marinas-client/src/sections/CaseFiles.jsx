import Button from "../components/ui/Button";
import CaseFileCard from "../components/ui/CaseFileCard";
import SectionHeader from "../components/ui/SectionHeader";
import projects, { isTodo } from "../data/projects";
import Section from "./Section";

// Featured projects only; case numbers match /work
const featured = projects
  .map((project, i) => ({ project, index: i + 1 }))
  .filter(({ project }) => project.tier === "featured");

const CaseFiles = () => (
  <Section id="case-files">
    <SectionHeader
      code="SEC-02"
      title="Case Files"
      kicker="The projects I'd walk an interviewer through first: what the problem was, what I built, and what it measured."
    />
    <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {featured.map(({ project, index }) => (
        <CaseFileCard
          key={project.slug}
          index={index}
          title={project.title}
          status={project.status}
          year={project.year}
          stack={project.stack.slice(0, 3)}
          metric={project.cardMetric}
          summary={isTodo(project.summary) ? undefined : project.summary}
          to={`/work/${project.slug}`}
        />
      ))}
    </div>
    <div className="mt-10">
      <Button to="/work" variant="ghost">
        View all case files →
      </Button>
    </div>
  </Section>
);

export default CaseFiles;
