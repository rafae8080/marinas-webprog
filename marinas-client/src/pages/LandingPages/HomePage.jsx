import SectionHeader from "../../components/ui/SectionHeader";
import TodoText from "../../components/ui/TodoText";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import CaseFiles from "../../sections/CaseFiles";
import Certifications from "../../sections/Certifications";
import FieldKit from "../../sections/FieldKit";
import FieldLog from "../../sections/FieldLog";
import Hero from "../../sections/Hero";
import OffTheClock from "../../sections/OffTheClock";
import OpsMap from "../../sections/OpsMap";
import Section from "../../sections/Section";
import SignalStrip from "../../sections/SignalStrip";
import StoryTeaser from "../../sections/StoryTeaser";

// Placeholder for a section that a later phase fills in
const Placeholder = ({ id, code, title, note }) => (
  <Section id={id}>
    <SectionHeader code={code} title={title} />
    <p className="mt-6">
      <TodoText value={note} />
    </p>
  </Section>
);

export default function HomePage() {
  useDocumentTitle("Rafael Marinas — Full-Stack Developer");

  return (
    <>
      <Hero />
      <SignalStrip />
      <CaseFiles />
      <OpsMap />
      <FieldKit />
      <StoryTeaser />
      <FieldLog />
      <Certifications />
      <OffTheClock compact />
      <Placeholder id="contact" code="SEC-09" title="Contact" note="TODO(rafael): contact form arrives in Phase 8" />
    </>
  );
}
