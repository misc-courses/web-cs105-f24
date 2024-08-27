import createMDX from '@next/mdx'

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypePrism from '@mapbox/rehype-prism';
import config from './site.config.mjs';



const isProduction = process.env.NODE_ENV === "production";



const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Other Next.js config below

  basePath: isProduction ? `/~candrews/classes/${config.folder}` : "",
  assetPrefix: isProduction
    ? `https://www.cs.middlebury.edu/~candrews/classes/${config.folder}`
    : undefined,
}


const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypePrism, rehypeKatex],
  },
});



export default withMDX(nextConfig);
