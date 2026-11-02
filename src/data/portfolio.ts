export interface NavItem {
  label: string;
  href: string;
}

export interface Skill {
  id: string;
  label: string;
  icon: string;
  usage: string[];
}

export interface Project {
  /** Eindeutiger Schlüssel. Muss zu den Keys in customFields.githubProjectUrls passen. */
  id: string;
  title: string;
  description: string;
  image: string;
  skillIds: string[];
  docPath: string;
}

/** So viele Projekte sind auf Desktop in der Liste anklickbar. */
export const MAX_HIGHLIGHTS_DESKTOP = 5;
/** So viele Projekt-Karten erscheinen auf Mobile untereinander. */
export const MAX_HIGHLIGHTS_MOBILE = 3;

export const OWNER_NAME = 'Fabian Ritzmann';
export const OWNER_SUBTITLE = 'Business Informatics';
export const OWNER_INTRO =
  'Business Information Systems graduate with experience at the intersection of business and IT. Currently working as a Junior IT Service Manager – Applications, focusing on application support, IT support, and interface management. Experienced in process analysis, IT security, documentation, and project work. Analytical, structured, and solution-oriented.';
export const OWNER_PHOTO = '/img/Fabian_Ritzmann.jpeg';

export const DOCS_PATH = '/docs/projects/overview';

export const NAV_ITEMS: NavItem[] = [
  {label: 'About me', href: '#about'},
  {label: 'My skills', href: '#skills'},
  {label: 'My projects', href: '#projects'},
  {label: 'Contact', href: '#contact'},
];

export const SKILLS: Skill[] = [
  {
    id: 'html',
    label: 'HTML',
    icon: '/img/skills/icon-html5.svg',
    usage: [
      'Page structure of this portfolio and its documentation',
      'Semantic sections and accessible landmarks',
      'Content pages written in Markdown and MDX',
    ],
  },
  {
    id: 'css',
    label: 'CSS',
    icon: '/img/skills/icon-css3.svg',
    usage: [
      'Styling this portfolio with CSS Modules',
      'Responsive layouts with grid and flexbox',
      'Design tokens as CSS variables',
    ],
  },
  {
    id: 'ssg',
    label: 'Static site generator',
    icon: '/img/skills/icon-docusaurus.svg',
    usage: [
      'This portfolio and my learning journal are built with Docusaurus',
      'Documentation structure with sidebars and categories',
      'Configuration through environment variables',
    ],
  },
  {
    id: 'python',
    label: 'Python',
    icon: '/img/skills/icon-python.svg',
    usage: [
      'Command line tools such as a port scanner and PDF metadata scripts',
      'Web automation with Selenium',
      'Scripts for security exercises',
    ],
  },
  {
    id: 'shell',
    label: 'Shell scripting',
    icon: '/img/skills/icon-shell.svg',
    usage: [
      'Server administration over SSH on a Linux VM',
      'Entrypoint scripts for containers',
      'Automating repeated setup steps',
    ],
  },
  {
    id: 'yaml',
    label: 'Yaml',
    icon: '/img/skills/icon-yaml.svg',
    usage: [
      'Docker Compose files for multi-container setups',
      'GitHub Actions workflows',
      'Category and sidebar configuration in Docusaurus',
    ],
  },
  {
    id: 'container',
    label: 'Container',
    icon: '/img/skills/icon-docker.svg',
    usage: [
      'Containerized apps such as a WordPress setup and a Minecraft server',
      'Dockerfiles and Docker Compose with env files',
      'Deployments on a cloud VM',
    ],
  },
  {
    id: 'cicd',
    label: 'CI/CD with GitHub Actions',
    icon: '/img/skills/icon-cicd.svg',
    usage: [
      'A workflow that builds and deploys this site',
      'Build on pull requests, deploy on merge to main',
      'Publishing to GitHub Pages',
    ],
  },
  {
    id: 'security',
    label: 'IT Security',
    icon: '/img/skills/icon-it-security.svg',
    usage: [
      'Challenges in the OWASP Juice Shop',
      'Exercises on reflected XSS and directory enumeration',
      'Keeping secrets out of repositories with environment variables',
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'juice-shop',
    title: 'Juice Shop Meister',
    description:
      'Write-ups for challenges in the intentionally vulnerable OWASP Juice Shop, including broken authentication, two-factor authentication and server-side XSS protection.',
    image: '/img/projects/juice-shop.png',
    skillIds: ['security', 'python'],
    docPath: '/docs/projects/Juice%20Shop%20Master/',
  },
  {
    id: 'minecraft',
    title: 'Minecraft',
    description:
      'A Minecraft Java Edition server running in Docker on a cloud VM. I wrote the Compose setup, kept the configuration in environment variables and documented the deployment.',
    image: '/img/projects/minecraft.png',
    skillIds: ['yaml', 'shell', 'container'],
    docPath: DOCS_PATH,
  },
  {
    id: 'baby-tools',
    title: 'Baby Tools',
    description:
      'A small web project from my training. The write-up in my documentation shows the idea, the implementation and what I learned.',
    image: '/img/projects/baby-tools.png',
    skillIds: ['python', 'css', 'container'],
    docPath: DOCS_PATH,
  },
  {
    id: 'truck-signs-api',
    title: 'Truck Signs API',
    description:
      'I containerized the Truck Signs API with a Dockerfile, a Compose file driven by environment variables, an entrypoint script and a README, and deployed it to a cloud VM.',
    image: '/img/projects/truck-signs-api.png',
    skillIds: ['container', 'yaml', 'shell'],
    docPath: DOCS_PATH,
  },
  {
    id: 'wordpress',
    title: 'WordPress hosten',
    description:
      'WordPress with MariaDB in a Docker Compose setup, configured through an env file and documented in a README.',
    image: '/img/projects/wordpress.png',
    skillIds: ['container', 'shell'],
    docPath: DOCS_PATH,
  },
];
