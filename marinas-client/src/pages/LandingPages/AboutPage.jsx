import CornerMarks from "../../components/ui/CornerMarks";
import SectionHeader from "../../components/ui/SectionHeader";
import Tag from "../../components/ui/Tag";
import { coords, education, experience } from "../../data/site";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import FieldLog from "../../sections/FieldLog";
import OffTheClock from "../../sections/OffTheClock";
import Section from "../../sections/Section";

const label = "font-mono text-[11px] uppercase tracking-[0.12em] text-muted";

const Fact = ({ name, children }) => (
  <div className="border-t border-line pt-3">
    <dt className={label}>{name}</dt>
    <dd className="mt-1 text-base leading-relaxed text-ink">{children}</dd>
  </div>
);

export default function AboutPage() {
  useDocumentTitle("About — Rafael Marinas");

  return (
    <>
      {/* SEC-A1 Origin: story from §D3. TODO(rafael): approve the wording (§D3) */}
      <Section id="origin" className="grid gap-12 pt-12 md:pt-16 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <div>
          <SectionHeader as="h1" code="SEC-A1" title="Origin" />
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-ink sm:text-xl">
            <p>
              Since 2017 I've helped run my family's apartment rental: 17 units, 14 residential and 3 commercial. I handle
              tenants, lease contracts, and the monthly statements of account. That's where I learned what a management
              system actually needs to do, because I was the person who needed one.
            </p>
            <p>
              Today I build those systems for clients, and bigger ones at school. My capstone, E-Telly, is a disaster
              preparedness platform where I built the entire web app, backend, and database. It was evaluated by 122
              residents, 6 CDRRMO personnel, and 5 IT professionals.
            </p>
          </div>
        </div>

        <figure className="relative mx-auto w-full max-w-xs border border-line bg-surface p-3 lg:mt-16">
          <CornerMarks />
          <img
            src="/images/me/portrait.webp"
            alt="Rafael Marinas"
            width="720"
            height="900"
            className="aspect-[4/5] w-full border border-line object-cover"
          />
          <figcaption className={`${label} flex justify-between gap-3 pt-3`}>
            <span className="text-ink">R. Marinas</span>
            <span>{coords.place}</span>
          </figcaption>
        </figure>
      </Section>

      {/* SEC-A2 Education */}
      <Section id="education">
        <SectionHeader code="SEC-A2" title="Education" />
        <div className="mt-8 md:grid md:grid-cols-[1fr_1fr] md:gap-12">
          <div>
            <h3 className="font-display text-2xl font-medium tracking-[-0.02em] text-ink">{education.school}</h3>
            <p className="mt-2 text-base leading-relaxed text-muted">{education.degree}</p>
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 md:mt-0">
            <Fact name="Expected">{education.expected}</Fact>
            <Fact name="GWA">{education.gwa}</Fact>
            <Fact name="Dean's List">{education.deansList}</Fact>
            <Fact name="Specialization">Mobile & Web Applications</Fact>
          </dl>
        </div>
        <div className="mt-8">
          <p className={label}>Coursework</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {education.coursework.map((course) => (
              <li key={course}>
                <Tag>{course}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* SEC-A3 Experience */}
      <Section id="experience">
        <SectionHeader code="SEC-A3" title="Experience" />
        <ul className="mt-8 border-t border-line">
          {experience.map((job) => (
            <li key={job.title} className="grid gap-2 border-b border-line py-6 md:grid-cols-[14rem_1fr] md:gap-8">
              <p className={`${label} text-accent`}>{job.period}</p>
              <div>
                <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-ink">{job.title}</h3>
                <p className={`${label} mt-1`}>{job.org}</p>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{job.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <FieldLog code="SEC-A4" />
      <OffTheClock code="SEC-A5" />
    </>
  );
}
