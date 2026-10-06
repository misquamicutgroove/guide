# Misquamicut Groove site

Guest-facing site for the house at 2 Uzzi Ave, Westerly, RI: a House Manual and a Local Guide.

## How the site is built
- Plain static HTML and CSS. **No build step, no framework, no package.json.**
- Hosted on Netlify (`netlify.toml`), deployed from the `main` branch of `misquamicutgroove/guide`.
- Every page repeats the same nav and footer markup. There are no templates, so a new page means copying an existing one (e.g. `local-guide/misc/index.html`).
- Shared styles live in `css/shared.css`. Useful classes: `.two-col`, `.divider`, `.info-table`, `.page-header`, `.page-content`.

## Site map
- `/` home
- `/house-manual` with `/instructions` and `/house-rules`
- `/local-guide` landing page linking to `/beach`, `/food-drink`, `/explore`, `/misc`

## Content conventions
- Listings are `<li><a href="..." target="_blank">Name</a> — short description</li>`. Use plain text, not a link, when no URL is known.
- Internal links use absolute paths (`/local-guide/explore`).
- Section headings are `<h2>`. The pink `.section-label` style is being phased out (see the open issue on it).
- This repo is **public**. Never put passwords, door codes, or other private details in issues, PRs, or commit messages.

## Workflow: everything goes through an issue and a pull request
1. **Issue first.** Each change starts as a GitHub issue (what and why). Check for an existing one before creating another.
2. **Branch off `main`**, named `<issue-number>-short-description`, e.g. `1-grey-sail-link`.
3. **Commit** with a clear message.
4. **Open a PR** from the branch. Fill in the template and put `Closes #<issue>` in the description so the issue closes on merge.
5. **Check the Netlify deploy preview** before merging.
6. **The owner reviews and merges.** Claude should open PRs but must not merge one unless explicitly asked.
7. Merging to `main` deploys to production.

**Never push directly to `main`.** Small ideas that aren't ready to work on become issues, not scope creep inside an unrelated PR.

## Labels
`content` (listings and copy), `design` (look and layout), `decision` (owner must choose), `needs-verification` (facts or visuals to check), `task` (setup and housekeeping), plus GitHub's defaults (`bug`, `enhancement`, `documentation`, ...).
