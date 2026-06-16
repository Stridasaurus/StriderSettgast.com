# StriderSettgast.com

Personal site built with [Astro](https://astro.build), deployed to GitHub Pages.

## Adding a blog post

Drop a single Markdown file into `src/content/blog/`. That's it — the blog index updates automatically on the next build.

### Filename convention

```
YYYY-MM-DD-short-slug.md
```

Example: `2024-09-01-fourier-analysis-notes.md`

### Front matter template

```yaml
---
title: "Your Post Title"
date: 2024-09-01
description: "One sentence shown on the blog index and in meta tags."
tags: ["mathematics", "signal processing"]   # optional
---
```

- `title` and `date` are required. `description` is strongly recommended. `tags` is optional.
- `date` must be in `YYYY-MM-DD` format.

### Writing math

Inline math: wrap in single dollar signs — `$e^{j\theta} = \cos\theta + j\sin\theta$`

Display math: wrap in double dollar signs on their own lines:

```
$$
\begin{aligned}
X[k] &= \sum_{n=0}^{N-1} x[n]\, e^{-j 2\pi kn / N}
\end{aligned}
$$
```

Both `$...$` (inline) and `$$...$$` (display) work. All standard LaTeX environments are supported via KaTeX — `aligned`, `cases`, `bmatrix`, etc.

### Writing code

Use fenced code blocks with a language tag:

````
```python
import numpy as np
x = np.fft.fft([1, 2, 3, 4])
```
````

Supported languages include `python`, `javascript`, `bash`, `julia`, `r`, `matlab`, and [everything else Shiki handles](https://shiki.style/languages).

## Dev

```bash
npm install
npm run dev       # localhost:4321
npm run build     # production build → dist/
```

## Deploy

Push to `main`. GitHub Actions builds and deploys automatically.
