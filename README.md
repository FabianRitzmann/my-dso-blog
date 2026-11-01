# Learning Journal & Portfolio

A personal portfolio and learning journal built with [Docusaurus](https://docusaurus.io/), React and TypeScript. The home page presents my skills, project highlights and contact options as React components; every project links to its documentation in the Docusaurus docs. The site is built in CI and published to GitHub Pages.

## Table of Contents

- [Quickstart](#quickstart)
  - [Prerequisites](#prerequisites)
  - [How to start](#how-to-start)
- [Usage](#usage)
  - [Configuration](#configuration)
  - [Start the development server](#start-the-development-server)
  - [Build the project](#build-the-project)
  - [Deployment](#deployment)
  - [Customize the portfolio](#customize-the-portfolio)
  - [Add a project](#add-a-project)
- [Project structure](#project-structure)
- [Development workflow](#development-workflow)
- [Extras](#extras)
- [Security](#security)

## Quickstart

### Prerequisites

- [Node.js](https://nodejs.org/) v20 or later (includes npm)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/products/docker-desktop) (optional, only needed for the [NGINX deployment](#deployment))

### How to start

```bash
git clone <repository-url>
cd <repository-name>
npm ci
cp example.env .env      # Windows (cmd): copy example.env .env
npm start
```

`npm start` starts the development server and opens `http://localhost:3000/` in the browser. Changes to components, styles and documentation are reloaded automatically.

## Usage

### Configuration

All environment-specific values are read from environment variables. Locally they come from a `.env` file (ignored by Git, create it from `example.env`). In CI they are set in the workflow and in the repository variables of GitHub (**Settings → Secrets and variables → Actions → Variables**).

| Variable | Purpose |
| --- | --- |
| `DEPLOYMENT_URL` | Public URL of the site, e.g. `https://<user>.github.io` |
| `BASE_URL` | Path prefix of the site, e.g. `/<repository-name>/` on GitHub Pages, `/` otherwise |
| `GITHUB_ORG` | GitHub user or organization that owns the repository. Also used for the GitHub buttons of the project cards |
| `GITHUB_PROJECT` | Repository name |
| `GIT_REPOSITORY_URL` | Repository URL, used for "Edit this page" links (derived from the two values above if empty) |
| `DEPLOYMENT_BRANCH` | Branch used for the deployment (`gh-pages`) |
| `BLOG_ENABLED` | `true` enables the Docusaurus blog, default `false` |
| `CONTACT_EMAIL` | Optional. Shows the email address in the Contact section |
| `LINKEDIN_URL` | Optional. Shows the LinkedIn link in the Contact section. Use the full URL including `https://` |
| `LEGAL_NOTICE` | Optional. Provider details for the legal notice page, lines separated by `\|` |

Entries for empty variables are not shown. The `.env` file is only read when the server starts, so restart `npm start` after changing it.

### Start the development server

```bash
npm start
```

Run `npm run typecheck` to check the TypeScript types and `npm run clear` to clear the Docusaurus cache if something looks outdated.

### Build the project

```bash
npm run build
```

The static site is generated into the `build/` directory. Preview it locally with:

```bash
npm run serve
```

Set `BASE_URL` and `DEPLOYMENT_URL` like on the production system to test the production paths. The build fails on broken links, so a green build also means that every link between the portfolio and the documentation works.

### Deployment

**GitHub Pages (automatic).** A GitHub Actions workflow in `.github/workflows/` builds the site on every pull request and deploys it to GitHub Pages when a commit lands on `main`. One-time setup:

1. Create the repository variables from the [configuration table](#configuration) (at least `CONTACT_EMAIL`, `LINKEDIN_URL`, `GITHUB_ORG` and `GITHUB_PROJECT`).
2. Open **Settings → Pages** and select the source the workflow publishes to.
3. Merge into `main` and wait for the workflow run to finish.
4. The site is then available at `https://<user>.github.io/<repository-name>/`.

**NGINX with Docker.** The `Dockerfile` builds the site and serves it with NGINX. A step-by-step guide, including the required build arguments, is part of the documentation: [Deploy Docusaurus with Docker and NGINX](./docs/guides/deploy-docusaurus-with-docker-and-nginx.md).

### Customize the portfolio

| What | Where |
| --- | --- |
| Name, subtitle, intro text, photo | `src/data/portfolio.ts` (`OWNER_*` constants). Put the photo in `static/img/` |
| Skills and the "How I used this skill" texts | `SKILLS` in `src/data/portfolio.ts`. Icons live in `static/img/skills/` |
| Projects | `PROJECTS` in `src/data/portfolio.ts` |
| Navigation entries | `NAV_ITEMS` in `src/data/portfolio.ts` |
| Colors, font and page width | the `--pf-*` variables in `src/css/custom.css` |
| Look of one component | the CSS module next to it, e.g. `src/components/hero/hero.module.css` |
| Layout of the home page | `src/pages/index.tsx` |

### Add a project

1. Add the project documentation as Markdown below `docs/projects/<project-name>/`.
2. Put a preview image into `static/img/projects/`.
3. Add an entry to `PROJECTS` in `src/data/portfolio.ts`:

   ```ts
   {
     title: 'My Project',
     description: 'One or two sentences about the project.',
     image: '/img/projects/my-project.png',
     skillIds: ['python', 'container'],   // ids from SKILLS
     docPath: '/docs/projects/my-project/',
     repoName: 'my-project',              // optional, repository name for the GitHub button
   },
   ```

4. Run `npm run build` to check that all links work.

## Project structure

| Path | Description |
| --- | --- |
| `src/pages/index.tsx` | Home page, composes all portfolio sections into one layout |
| `src/pages/legal-notice.tsx` | Legal notice page linked from the footer |
| `src/components/header` | Header with the section navigation |
| `src/components/hero` | Hero section with name, intro text, photo and contact button |
| `src/components/my-skills` | "My skills" section (grid of skill cards) |
| `src/components/skill-card` | One skill card that flips and shows "How I used this skill" |
| `src/components/project-highlights` | "My project highlights" section with the project list |
| `src/components/project-card` | Card of the selected project with skills, image, description and buttons |
| `src/components/skill-chip` | Small skill badge used in the project card |
| `src/components/button` | Shared button (light, solid and outline variant) |
| `src/components/contact` | "Contact me" section |
| `src/components/footer` | Footer with back-to-top button and legal notice link |
| `src/components/github-link-admonition` | Helper component used inside the documentation |
| `src/data/portfolio.ts` | Typed content of the portfolio (skills, projects, navigation, texts) |
| `src/css/custom.css` | Global styles, design tokens and the self-hosted Quicksand font (`@fontsource/quicksand`) |
| `docs/` | Documentation: `knowledge-base` (learning notes), `projects` (project write-ups) and `guides` (template guides) |
| `docs/projects/` | One folder per project, e.g. `Truck-Signs-API`, `baby-tools-world`, `minecraft-server`, `wordpress-docker-setup` and `Juice Shop Master` |
| `blog/` | Docusaurus blog posts (only built if `BLOG_ENABLED=true`) |
| `static/` | Static assets: logo, favicon, profile photo, project images (`img/projects`) and skill icons (`img/skills`) |
| `docusaurus.config.ts` | Docusaurus configuration, reads all values from environment variables |
| `sidebars.ts` | Sidebar definition for the documentation |
| `babel.config.js`, `tsconfig.json` | Babel and TypeScript configuration |
| `package.json`, `package-lock.json` | Dependencies and scripts (npm is used locally and in CI) |
| `pnpm-lock.yaml`, `pnpm-workspace.yaml` | Lockfile and settings for optional use with pnpm |
| `example.env` | Template for the local `.env` file |
| `Dockerfile`, `.dockerignore` | Container build: Node build stage, NGINX runtime stage |
| `.github/workflows/` | GitHub Actions: CI/CD (build and deploy to GitHub Pages), check for an open pull request and creation of pull requests |
| `.gitignore` | Excludes dependencies, build output and `.env` files |
| `LICENSE` | License of the repository |
| `build/` | Generated by `npm run build`, not committed |

## Development workflow

- Every sub-task is developed in its own feature branch, for example `feature/skills-section`.
- A pull request into `main` is opened right after the first push of the branch (a workflow checks that an open pull request exists).
- The build must pass before merging. Merging into `main` triggers the deployment to GitHub Pages.

## Extras

Beyond the required sections the portfolio contains:

- Skill cards that flip on hover, click or keyboard and show how each skill was used
- A legal notice page, configured through `LEGAL_NOTICE`
- Project documentation imported from my other repositories into `docs/projects/`
- A self-hosted font (no external requests)

## Security

- No passwords, tokens, usernames, IP addresses or SSH keys are stored in this repository.
- Contact details, the GitHub name and deployment settings are passed through environment variables; `.env` files are ignored by Git.