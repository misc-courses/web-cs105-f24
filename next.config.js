


const remarkMath = import('remark-math')
const rehypeKatex = import('rehype-katex')
const rehypePrism = import('@mapbox/rehype-prism')


const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options:{
    remarkPlugins:[remarkMath],
    rehypePlugins:[rehypePrism, rehypeKatex]
  }
})

const config = require('./site.config');

const isProduction = process.env.NODE_ENV === "production";




module.exports = 
    withMDX({
    pageExtensions:['js','jsx','mdx','md'],
    basePath: isProduction ? `/~candrews/classes/${config.folder}` : '',
    assetPrefix: isProduction
      ? `https://www.cs.middlebury.edu/~candrews/classes/${config.folder}`
      : '',
  })

