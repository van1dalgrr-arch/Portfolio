# van1dal — portfolio

Personal site of a Go backend developer: projects, live GitHub activity, CV, blog and an interactive terminal.

**Live:** https://van1dalgrr-arch.github.io/Portfolio/

## Stack

React · TypeScript · Vite · Framer Motion · marked

## Run

```sh
npm install
npm run dev
```

## Where things live

- `src/data.ts` — texts, projects, skills, contacts (RU / EN)
- `src/details.ts` — project pages content
- `src/posts/*.md` — blog posts (frontmatter: title, date, summary, tags)
- `src/styles.css` — colors and layout

Every push to `main` is built and deployed to GitHub Pages by `.github/workflows/deploy.yml`.
