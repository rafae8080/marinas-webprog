import { useParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import SectionHeader from "../../components/ui/SectionHeader";

// Placeholder until Phase 4 (case studies from src/data/projects.js)
export default function CaseStudyPage() {
  const { slug } = useParams();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader as="h1" code="CASE" title={slug} kicker="This case file is still being written." />
      <div className="mt-8">
        <Button to="/work">Back to work</Button>
      </div>
    </section>
  );
}
