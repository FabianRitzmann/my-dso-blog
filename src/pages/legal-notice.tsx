import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './legal-notice.module.css';

/**
 * Legal notice (Impressum).
 *
 * Personal details come from the environment, nothing personal is hardcoded here:
 *   LEGAL_NOTICE  ->  customFields.legalNotice, parts separated by "|", e.g.
 *                     "Vorname Nachname|Straße 1|12345 Ort"
 *   CONTACT_EMAIL ->  customFields.contactEmail (already used for the contact section)
 */
export default function LegalNotice(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const fields = siteConfig.customFields ?? {};
  const notice = fields.legalNotice;
  const email = fields.contactEmail;
  const lines =
    typeof notice === 'string' && notice.length > 0
      ? notice.split('|').map((line) => line.trim()).filter(Boolean)
      : [];
  const mail = typeof email === 'string' && email.length > 0 ? email : undefined;

  return (
    <Layout title="Legal notice" noFooter>
      <Head>
        <body className="portfolio-page" />
      </Head>
      <main className={styles.page}>
        <h1 className={styles.title}>Legal notice</h1>

        <section className={styles.section} aria-labelledby="provider">
          <h2 id="provider" className={styles.heading}>
            Information pursuant to § 5 DDG
          </h2>
          {lines.length > 0 ? (
            lines.map((line, index) => <p key={index}>{line}</p>)
          ) : (
            <p>The provider details are configured through the LEGAL_NOTICE environment variable.</p>
          )}
        </section>

        {mail ? (
          <section className={styles.section} aria-labelledby="contact">
            <h2 id="contact" className={styles.heading}>
              Contact
            </h2>
            <p>
              E-mail: <a href={`mailto:${mail}`}>{mail}</a>
            </p>
          </section>
        ) : null}

        <section className={styles.section} aria-labelledby="content">
          <h2 id="content" className={styles.heading}>
            Liability for content
          </h2>
          <p className={styles.text}>
            As a service provider I am responsible for my own content on these pages in accordance
            with general law (§ 7 (1) DDG). Under §§ 8 to 10 DDG I am not obliged to monitor
            transmitted or stored third-party information or to investigate circumstances that
            indicate illegal activity. Obligations to remove or block the use of information under
            general law remain unaffected. Liability in this respect is only possible from the point
            in time at which I become aware of a specific infringement. If I become aware of such
            infringements, I will remove the content immediately.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="links">
          <h2 id="links" className={styles.heading}>
            Liability for links
          </h2>
          <p className={styles.text}>
            This site contains links to external websites of third parties, on whose content I have
            no influence. I therefore cannot accept any liability for this external content. The
            respective provider or operator of the linked pages is always responsible for their
            content. The linked pages were checked for possible legal violations at the time of
            linking, and no illegal content was recognisable at that time. Permanent monitoring of
            the linked pages is not reasonable without concrete evidence of an infringement. If I
            become aware of infringements, I will remove such links immediately.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="copyright">
          <h2 id="copyright" className={styles.heading}>
            Copyright
          </h2>
          <p className={styles.text}>
            The content and works created by the site operator on these pages are subject to German
            copyright law. Reproduction, editing, distribution and any kind of use beyond the limits
            of copyright law require the written consent of the respective author or creator.
            Downloads and copies of this site are only permitted for private, non-commercial use.
            Where content on this site was not created by the operator, the copyrights of third
            parties are respected. If you notice a copyright infringement, please let me know, and I
            will remove such content immediately.
          </p>
        </section>

        <p>
          <Link to="/">Back to the portfolio</Link>
        </p>
      </main>
    </Layout>
  );
}
