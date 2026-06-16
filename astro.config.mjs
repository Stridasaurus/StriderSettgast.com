import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  // GitHub Pages project site. To move to a custom domain later:
  //   1. set site to 'https://yourdomain.com' and base to '/'
  //   2. add a public/CNAME file containing the domain
  //   3. point DNS at GitHub and update the Pages setting
  // All internal links use import.meta.env.BASE_URL, so no link edits are needed.
  site: 'https://stridasaurus.github.io',
  base: '/StriderSettgast.com',
  output: 'static',
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
