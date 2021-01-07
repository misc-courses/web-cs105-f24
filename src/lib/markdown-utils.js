import React from "react";
import unified from "unified";
import markdown from "remark-parse";
import math from 'remark-math';
import remark2rehype from "remark-rehype";
import highlightCode from "rehype-prism";
import raw from "rehype-raw";
import slug from "rehype-slug";
import katex from 'rehype-katex';
import rehype2react from "rehype-react";

import Collapsable from "../components/Collapsable";



/**
 * Convert the Markdown to React. This avoids setting the html directly by creating a React element.
 *
 * I got guidance from
 * https://unifiedjs.com/learn/guide/using-unified/
 * https://developer.aliyun.com/mirror/npm/package/rehype-prism
 * https://github.com/rehypejs/rehype-react
 * https://github.com/rehypejs/rehype-raw
 *
 * Note that because of the way rehype-raw works, there needs to be a space before markdown blocks
 * inside of html tags, otherwise it is seen as html.
 *
 * @param {*} directory
 * @param {*} id
 */
export function markdownToReact(contents) {
  // convert the markdown to a React component
  const processedContent = unified()
    
    
    .use(markdown) // read the markdown
    .use(math) // capture latex escapes
    .use(remark2rehype, { allowDangerousHtml: true }) // create the AST
    .use(katex) // render the math
    .use(raw) // pick up the raw HTML blocks and convert them into the AST as well
    .use(highlightCode) // use Prism to highlight the code
    .use(slug) // add ids for anchor links to headers
    .use(rehype2react, {
      createElement: React.createElement,
      components: { "hiddenBlock": Collapsable },
    }) // convert to a React component, replaces custom tags with React components
     
     
    .processSync(contents);

  return processedContent.result;
}
