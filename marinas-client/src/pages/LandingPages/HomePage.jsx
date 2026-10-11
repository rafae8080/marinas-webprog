import useDocumentTitle from "../../hooks/useDocumentTitle";
import CaseFiles from "../../sections/CaseFiles";
import Contact from "../../sections/Contact";
import Certifications from "../../sections/Certifications";
import FieldKit from "../../sections/FieldKit";
import FieldLog from "../../sections/FieldLog";
import Hero from "../../sections/Hero";
import OffTheClock from "../../sections/OffTheClock";
import OpsMap from "../../sections/OpsMap";
import SignalStrip from "../../sections/SignalStrip";
import StoryTeaser from "../../sections/StoryTeaser";

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
      <Contact />
    </>
  );
}
