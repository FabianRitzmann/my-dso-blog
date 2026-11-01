import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function LegalNotice(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const notice = siteConfig.customFields?.legalNotice;
  const lines = typeof notice === 'string' && notice.length > 0 ? notice.split('|') : [];

  return (
    <Layout title="Legal notice" noFooter>
      <Head>
        <body className="portfolio-page" />
      </Head>
      <main style={{maxWidth: '40rem', margin: '0 auto', padding: '4rem 1.5rem'}}>
        <h1>Legal notice</h1>
        {lines.length > 0 ? (
          lines.map((line) => <p key={line}>{line.trim()}</p>)
        ) : (
          <p>The provider details are configured through the LEGAL_NOTICE environment variable.</p>
        )}
        <p>
          <Link to="/">Back to the portfolio</Link>
        </p>
      </main>
    </Layout>
  );
}
