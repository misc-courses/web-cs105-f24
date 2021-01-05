
const remarkMath = require('remark-math')
const rehypeKatex = require('rehype-katex')
const rehypePrism = require("rehype-prism");

const className = 'cs312-f20';

const isProduction = process.env.NODE_ENV === "production";

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options:{
    remarkPlugins:[remarkMath],
    rehypePlugins:[rehypePrism, rehypeKatex]
  }
})





module.exports = withMDX({
  pageExtensions:['js','jsx','mdx','md'],
  basePath: isProduction ? `/~candrews/classes/${className}` : '',
  assetPrefix: isProduction
    ? `https://www.cs.middlebury.edu/~candrews/classes/${className}`
    : '',
});
