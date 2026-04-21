// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://stefumies.com',
  redirects: {
    '/blog': '/',
  },
  integrations: [mdx(), sitemap()],

  fonts: [
      {
          provider: fontProviders.google(),
          name: 'Plus Jakarta Sans',
          cssVariable: '--font-body',
          fallbacks: ['sans-serif'],
          options: {
              subsets: ['latin'],
              display: 'swap',
          },
      },
	],

  adapter: vercel(),
});