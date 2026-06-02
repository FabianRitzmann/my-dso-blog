# Docusaurus Blog Project

This project is based on the Docusaurus starter template and was customized to create a personal learning journal and portfolio website. The goal was to personalize the template, configure repository-related settings, and prepare the project for automatic deployment via GitHub Pages.

---

# Table of Contents

1. [Configuration docusaurus.config.ts](#configuration-docusaurusconfigts)
2. [Configuration README.md](#configuration-readmemd)
3. [Configuration on GitHub](#configuration-on-github)
4. [Remove Docusaurus Tutorial Link from Homepage](#remove-docusaurus-tutorial-link-from-homepage) 
5. [Summary](#summary)

---

## Configuration docusaurus.config.ts

Several changes were made inside the docusaurus.config.ts file:

1. Updated the website title: 
        ```
        title: 'Learning Journal & Portfolio'
        ```

2. Added a custom tagline describing:
        ```
        tagline: 'Fabian Ritzmann – Junior IT Service Manager on the path to becoming a DevSecOps Specialist'
        ```

3. Set the default URL value to my GitHub username.

    - The example.env file was updated to include my GitHub username `GITHUB_ORG=FabianRitzmann`. The URL fallback now uses this variable to automatically generate the GitHub Pages URL:
        ```
        url: process.env.DEPLOYMENT_URL ?? `https://${process.env.GITHUB_ORG}.github.io`
        ```

4. Configure Git Repository URL via Environment Variable

    - Add the `GIT_REPOSITORY_URL` variable to `example.env`, and read it in `docusaurus.config.ts` using `process.env.GIT_REPOSITORY_URL`, with a default fallback value:
        ```
        const gitRepositoryUrl = process.env.GIT_REPOSITORY_URL ?? "https://github.com/FabianRitzmann/my-dso-blog";
        ```

5. Use `GIT_REPOSITORY_URL` for `editUrl` in Docs and Blog configuration   

    - Update `editUrl` so it uses the `GIT_REPOSITORY_URL` environment variable.
    
    - Apply the same configuration for both `docs` and `blog`, using the format `${gitRepositoryUrl}/edit/main`.

6. Navbar updates

   - The `title` in the `navbar` object was changed to `About me`. 
   
   - The `logo` was commented out because no custom logo is available.

   - In the `navbar items`:
        - the `href` was set to `gitRepositoryUrl`
        - the `label` was updated to `My projects`

7. Footer updates        
    - Extend the Docs section by adding a link to the project page (/docs/projects):
        ```
        {
        label: 'Projects',
        to: '/docs/projects',
        }
        ```
    - The Community section was removed.   
    - The More section was updated: the GitHub link was replaced with the gitRepositoryUrl variable, and an additional link to the template repository with the label "Template" was added:
         ```
       items: [
            {
                label: 'GitHub',
                href: gitRepositoryUrl,
            },
            {
                label: 'Template',
                href: 'https://github.com/Developer-Akademie-DevSecOpsKurs/dev-blog-template',
            }
        ]
        ```

8. The copyright message was customized to reflect personal ownership and extended with an additional note referencing the original starter project:        
        ```
        copyright: `Copyright © ${new Date().getFullYear()} Fabian Ritzmann - extended from the developer-akademie-starter`,
        ```

## Configuration README.md

- The Deployment section in the `README.md` was reduced to a single sentence describing automatic deployment to GitHub Pages via a GitHub Actions workflow on pushes to the main branch.

- The Contributing section was removed from the `README.md`.

## Configuration on GitHub
- In the GitHub repository settings, the Pages configuration was changed from `Deploy from a branch` to `GitHub Actions`.

- Additionally, under Actions → General, the workflow permissions were updated to `Read and write permissions`.

## Remove Docusaurus Tutorial Link from Homepage

- The link to the Docusaurus Tutorial was removed from the homepage `src/pages/index.ts`.
 ```
      <Link
        className="button button--secondary button--lg"
        to="/docs/guides/intro">
        Docusaurus Tutorial - 5min 
    </Link>
   ```     

## Summary

This project was fully customized from the original Docusaurus starter template. Environment variables were introduced for better configurability, repository links were centralized, and the project was prepared for automated deployment using GitHub Actions and GitHub Pages.

### Loom Video
- [Loom Video](https://go.screenpal.com/watch/cOhvF3nuVtT)