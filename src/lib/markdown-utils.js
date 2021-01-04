import React from "react";
import unified from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import highlightCode from "rehype-prism";
import stringify from "rehype-stringify";
import raw from "rehype-raw";
import slug from "rehype-slug";
import rehype2react from "rehype-react";

import Collapsable from "../components/Collapsable";

/**
 * [Obsolete] Convert the Markdown to HTML.
 * This includes the remark-prism plugin to make code blocks look better.
 *
 * I got guidance from
 * https://unifiedjs.com/learn/guide/using-unified/
 * https://developer.aliyun.com/mirror/npm/package/rehype-prism
 *
 * @param {*} directory
 * @param {*} id
 */
export function markdownToHtml(contents) {
  // convert the markdown to html
  const processedContent = unified()
    .use(markdown)
    .use(remark2rehype, { allowDangerousHtml: true })
    .use(raw)
    .use(slug)
    .use(highlightCode)
    .use(stringify)
    .processSync(contents);

  const contentHtml = processedContent.toString();

  return contentHtml;
}

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
    .use(remark2rehype, { allowDangerousHtml: true }) // create the AST
    .use(raw) // pick up the raw HTML blocks and convert them into the AST as well
    .use(highlightCode) // use Prism to highlight the code
    .use(slug) // add ids for anchor links to headers
    .use(rehype2react, {
      createElement: React.createElement,
      components: { "hidden-block": Collapsable },
    }) // convert to a React component, replaces custom tags with React components
    .processSync(contents);

  return processedContent.result;
}
