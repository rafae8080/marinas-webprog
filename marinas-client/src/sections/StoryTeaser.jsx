import Button from "../components/ui/Button";
import SectionHeader from "../components/ui/SectionHeader";
import Section from "./Section";

// §D3 teaser: first paragraph of the story (wording approved by Rafael)
const StoryTeaser = () => (
  <Section id="story">
    <div className="md:grid md:grid-cols-[14rem_1fr] md:gap-8">
      <div className="md:col-span-2">
        <SectionHeader code="SEC-05" title="Story" />
      </div>
      <div className="md:col-start-2">
        <p className="mt-6 max-w-3xl font-display text-2xl font-medium leading-snug tracking-[-0.02em] text-ink sm:text-3xl">
          Since 2017 I've helped run my family's apartment rental: 17 units, 14 residential and 3 commercial. I handle
          tenants, lease contracts, and the monthly statements of account. That's where I learned what a management
          system actually needs to do, because I was the person who needed one.
        </p>
        <div className="mt-8">
          <Button to="/about" variant="ghost">
            Read the full story →
          </Button>
        </div>
      </div>
    </div>
  </Section>
);

export default StoryTeaser;
