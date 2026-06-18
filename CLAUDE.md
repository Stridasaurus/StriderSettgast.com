# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install dependencies
npm run dev       # dev server at localhost:4321
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

## Deploy

Push to `main` — GitHub Actions builds and deploys to GitHub Pages automatically.

## Architecture

Static site built with **Astro**, deployed to GitHub Pages as a project site under `/StriderSettgast.com`.

**Base path handling** — because the site lives at a subpath, all internal links must go through `withBase()` from `src/utils/url.ts` rather than using bare `/` paths. This ensures links work both on GitHub Pages and if the site is ever moved to a custom domain.

**Content collections** — blog posts go in `src/content/blog/` as Markdown files. The schema (title, date, description, tags) is defined in `src/content/config.ts`. Filename convention: `YYYY-MM-DD-short-slug.md`.

**Layouts** — all pages use `BaseLayout.astro`, which includes the `Nav`, global CSS, KaTeX stylesheet, and footer. Pages pass `title` and optionally `description` as props.

**Math** — KaTeX is wired in via `remark-math` + `rehype-katex`. Use `$...$` for inline and `$$...$$` for display math in Markdown.

## Adding a blog post

Drop a `.md` file into `src/content/blog/` with this front matter:

```yaml
---
title: "Post Title"
date: YYYY-MM-DD
description: "One sentence shown on the index and in meta tags."
tags: ["optional", "tags"]
---
```

The blog index updates automatically on the next build — no other files need editing.
