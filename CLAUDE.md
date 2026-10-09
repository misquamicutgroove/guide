# Misquamicut Groove site

Guest-facing site for the house at 2 Uzzi Ave, Westerly, RI: a House Manual and a Local Guide.

## How the site is built
- Plain static HTML and CSS. **No build step, no framework, no package.json.**
- Hosted on Netlify (`netlify.toml`), deployed from the `main` branch of `misquamicutgroove/guide`.
- Netlify project: `sunny-belekoy-8b7edb` (dashboard: https://app.netlify.com/projects/sunny-belekoy-8b7edb). Production domain: `misquamicutgroove.com`.
- Merging to `main` auto-deploys to production within a few minutes (confirmed Oct 2026). **Every PR automatically gets a Deploy Preview** at `https://deploy-preview-<PR number>--sunny-belekoy-8b7edb.netlify.app`. Netlify comments the link on the PR and adds a `deploy-preview` check.
- Every page repeats the same nav and footer markup. There are no templates, so a new page means copying an existing one (e.g. `local-guide/misc/index.html`).
- `scripts/nav.js` is the only script the shared nav needs. It lives in `scripts/`, **not** `js/`: `netlify.toml` caches `/js/*` for a year as immutable, so edits there would not reach visitors.
- Shared styles live in `css/shared.css`. Useful classes: `.two-col`, `.divider`, `.info-table`, `.section-note` (small grey line under a heading), `.page-header`, `.page-content`.

## Site map
- `/` home
- `/house-manual` with `/instructions` and `/house-rules`
- `/local-guide` landing page linking to `/beach`, `/food-drink`, `/explore`, `/misc`
- **Nav dropdowns:** in the shared main nav, both "House Manual" and "Local Guide" are dropdowns (`<div class="nav-dropdown">` with a `.nav-caret` button and a `.nav-menu` list). They appear on **all 8 pages that use the shared nav**, i.e. every House Manual and Local Guide page. The home page has its own nav. Menu items: House Manual → Check In & Check Out, House How-To. Local Guide → Beach Guide, Food & Drink, Explore, Misc & Useful. There is no "Overview" item; the top link goes to the landing page. On each page the current page's menu item gets `class="active" aria-current="page"`, and the top link gets `class="active"` on pages in its section. **A new page in either section must be added to the matching `.nav-menu` on every page.** Open/close behavior (tap, click, Escape, one menu at a time) is in `scripts/nav.js`; hover works from CSS alone.
- **Page names:** the House Manual pages are called "Check In & Check Out" (`/house-manual/instructions`) and "House How-To" (`/house-manual/house-rules`) everywhere: menu, landing cards, browser title, and page heading. The URLs keep their old slugs so links don't break.

## Content conventions
- Listings are `<li><a href="..." target="_blank">Name</a> — short description</li>`. Use plain text, not a link, when no URL is known.
- Internal links use absolute paths (`/local-guide/explore`).
- **Headings: one system on every page** (decided in #4). New pages and edits must follow it.
  - `h1` is the page title. The pink script tagline above it stays.
  - `h2` is every section title: the big green heading with the soft pink underline. There are no pink small-caps labels anymore, and the old `.section-label` style has been removed.
  - `h3` is only for items or sub-groups *inside* a section. Never skip a level (h1, then h2, then h3). Known exception: the link-card titles on the two landing pages (tracked in #38).
  - Context a heading needs (a distance, "in order of distance", a caveat) goes in a small grey `<p class="section-note">` directly under it, not in the heading and not in a label.
  - **Page titles (`h1`)** wrap on small screens, so keep an `&` attached to the word before it (`FOOD&nbsp;&amp; DRINK`) and keep short phrases together (`CHECK&nbsp;OUT`). Otherwise a line can start with `&` or end up with one lonely word. `shared.css` scales the title down on phones so the longest word (`MISQUAMICUT`) fits; a new title with a longer word needs a recheck at 320px.
  - Anchor ids go on the heading itself, for example `<h2 id="beach">`. `shared.css` has a `scroll-margin-top` rule so anchored headings land below the sticky nav instead of behind it.
- This repo is **public**. Never put passwords, door codes, or other private details in issues, PRs, or commit messages.

## Workflow: everything goes through an issue and a pull request
1. **Issue first.** Each change starts as a GitHub issue (what and why). Check for an existing one before creating another.
2. **Branch off `main`**, named `<issue-number>-short-description`, e.g. `1-grey-sail-link`.
3. **Commit** with a clear message.
4. **Open a PR** from the branch. Fill in the template and put `Closes #<issue>` in the description so the issue closes on merge.
5. **Check the Netlify deploy preview** before merging. Open the preview URL for the PR (see above) on desktop and phone width. Fetching it with `curl` only proves the text is there, not that it looks right.
6. **The owner reviews and merges.** Claude should open PRs but must not merge one unless explicitly asked.
7. Merging to `main` deploys to production.

**Never push directly to `main`.** Small ideas that aren't ready to work on become issues, not scope creep inside an unrelated PR.

## GitHub accounts (important)
The machine's default `gh` account is a different one (`earlehouse`, write access only). **This repo belongs to `misquamicutgroove`.**
- **`git push` / `git fetch`** are already pinned to `misquamicutgroove` by a repo-local credential helper (in `.git/config`, not committed).
- **`gh` commands** (issues, PRs, labels, API calls) must be prefixed so they act as the owner: `GH_TOKEN=$(gh auth token --user misquamicutgroove) gh ...`
- Nothing is stored on disk; the token is read from the macOS keychain through `gh` each time.
- If `gh auth status` doesn't list `misquamicutgroove`, stop and ask the owner to run `gh auth login` for that account.
- Commit *authorship* is separate and comes from `git config user.name/user.email` (see the identity issue).

## Labels
`content` (listings and copy), `design` (look and layout), `decision` (owner must choose), `needs-verification` (facts or visuals to check), `task` (setup and housekeeping), plus GitHub's defaults (`bug`, `enhancement`, `documentation`, ...).
