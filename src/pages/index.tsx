import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Contact from '@site/src/components/contact';
import Footer from '@site/src/components/footer';
import Header from '@site/src/components/header';
import Hero from '@site/src/components/hero';
import MySkills from '@site/src/components/my-skills';
import ProjectHighlights from '@site/src/components/project-highlights';
import {
  DOCS_PATH,
  NAV_ITEMS,
  OWNER_INTRO,
  OWNER_NAME,
  OWNER_PHOTO,
  OWNER_SUBTITLE,
  PROJECTS,
  SKILLS,
} from '@site/src/data/portfolio';

function readCustomField(fields: Record<string, unknown>, key: string): string | undefined {
  const value = fields[key];
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

/** Liest customFields.githubProjectUrls ({projekt-id: url}) und wirft leere Einträge weg. */
function readProjectUrls(fields: Record<string, unknown>): Record<string, string> {
  const raw = fields['githubProjectUrls'];
  const result: Record<string, string> = {};
  if (raw && typeof raw === 'object') {
    for (const [id, url] of Object.entries(raw as Record<string, unknown>)) {
      if (typeof url === 'string' && url.length > 0) {
        result[id] = url;
      }
    }
  }
  return result;
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const fields = siteConfig.customFields ?? {};

  return (
    <Layout title="Portfolio" description={`${OWNER_NAME} – ${OWNER_SUBTITLE}`} noFooter>
      <Head>
        <body className="portfolio-page" />
      </Head>
      <div id="top" />
      <Header navItems={NAV_ITEMS} />
      <main>
        <Hero name={OWNER_NAME} subtitle={OWNER_SUBTITLE} intro={OWNER_INTRO} photo={OWNER_PHOTO} />
        <MySkills skills={SKILLS} />
        <ProjectHighlights
          projects={PROJECTS}
          skills={SKILLS}
          moreProjectsPath={DOCS_PATH}
          githubProfileUrl={readCustomField(fields, 'githubProfileUrl')}
          githubProjectUrls={readProjectUrls(fields)}
        />
        <Contact
          email={readCustomField(fields, 'contactEmail')}
          linkedinUrl={readCustomField(fields, 'linkedinUrl')}
          githubUrl={readCustomField(fields, 'githubProfileUrl')}
        />
      </main>
      <Footer name={OWNER_NAME} legalPath="/legal-notice" />
    </Layout>
  );
}
