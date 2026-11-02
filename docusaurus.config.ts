import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {config as dotenvconfig} from 'dotenv';

dotenvconfig();

const blogEnabled = process.env.BLOG_ENABLED === 'true';
const githubOrg = process.env.GITHUB_ORG;
const githubProject = process.env.GITHUB_PROJECT;

const gitRepositoryUrl =
  process.env.GIT_REPOSITORY_URL ??
  (githubOrg && githubProject ? `https://github.com/${githubOrg}/${githubProject}` : '');
const baseUrl = process.env.BASE_URL ?? (githubProject ? `/${githubProject}/` : '/');

const config: Config = {
  title: 'Learning Journal & Portfolio',
  tagline: 'Junior IT Service Manager on the path to becoming a DevSecOps Specialist',

  // Production URL and base path come from the environment (see example.env)
  url:
    process.env.DEPLOYMENT_URL ??
    (githubOrg ? `https://${githubOrg}.github.io` : 'http://localhost:3000'),
  baseUrl,

  // GitHub pages deployment config
  organizationName: githubOrg,
  projectName: githubProject,
  deploymentBranch: process.env.DEPLOYMENT_BRANCH,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Values read by the portfolio page (src/pages/index.tsx)
  customFields: {
    githubProfileUrl: process.env.GITHUB_PROFILE_URL,
    githubProjectUrls: {
      'juice-shop':      process.env.GITHUB_URL_JUICE_SHOP,
      'minecraft':       process.env.GITHUB_URL_MINECRAFT,
      'baby-tools':      process.env.GITHUB_URL_BABY_TOOLS,
      'truck-signs-api': process.env.GITHUB_URL_TRUCK_SIGNS,
      'wordpress':       process.env.GITHUB_URL_WORDPRESS,
    },
    // contactEmail, linkedinUrl usw. bleiben wie sie sind
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: gitRepositoryUrl ? `${gitRepositoryUrl}/edit/main` : undefined,
        },
        blog: blogEnabled
          ? {
              showReadingTime: true,
              feedOptions: {
                type: ['rss', 'atom'],
                xslt: true,
              },
              editUrl: gitRepositoryUrl ? `${gitRepositoryUrl}/edit/main` : undefined,
              onInlineTags: 'warn',
              onInlineAuthors: 'warn',
              onUntruncatedBlogPosts: 'warn',
            }
          : false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'My Site',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'My projects',
        },
        ...(blogEnabled ? [{to: '/blog', label: 'Blog', position: 'left' as const}] : []),
        ...(gitRepositoryUrl
          ? [{href: gitRepositoryUrl, label: 'GitHub', position: 'right' as const}]
          : []),
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Tutorial', to: '/docs/guides/intro'},
            {label: 'Projects', to: '/docs/projects/overview'},
          ],
        },
        {
          title: 'More',
          items: [
            ...(blogEnabled ? [{label: 'Blog', to: '/blog'}] : []),
            ...(gitRepositoryUrl ? [{label: 'GitHub', href: gitRepositoryUrl}] : []),
            {
              label: 'Template',
              href: 'https://github.com/Developer-Akademie-DevSecOpsKurs/dev-blog-template',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Fabian Ritzmann - extended from the developer-akademie-starter`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['powershell', 'hcl'],
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: {start: 'highlight-start', end: 'highlight-end'},
        },
        {
          className: 'code-block-error-line',
          line: 'This will error',
        },
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
