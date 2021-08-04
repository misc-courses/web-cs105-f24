
// const withTM = require('next-transpile-modules')([
//   'rehype-prism',
//   'remark',
//   'unified',
//   'micromark-util-combine-extensions',
//   'micromark-util-symbol',
//   'micromark-util-resolve-all',
//   'micromark-util-html-tag-name'])

const remarkMath = require('remark-math')
const rehypeKatex = require('rehype-katex')
const rehypePrism = require('next-transpile-modules')(["rehype-prism"]);

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options:{
    remarkPlugins:[remarkMath],
    rehypePlugins:[rehypePrism, rehypeKatex]
  }
})

const config = require('./site.config');

const isProduction = process.env.NODE_ENV === "production";




module.exports = //withTM(
    withMDX({
    pageExtensions:['js','jsx','mdx','md'],
    basePath: isProduction ? `/~candrews/classes/${config.folder}` : '',
    assetPrefix: isProduction
      ? `https://www.cs.middlebury.edu/~candrews/classes/${config.folder}`
      : '',
  })
//);
