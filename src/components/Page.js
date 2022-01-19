import { useEffect} from 'react';
import DraftFlag from './DraftFlag';
import { formatRelative } from 'date-fns';
// import { useRemark,Remark } from 'react-remark';
// import remarkMath from 'remark-math';
// import rehypeKatex from 'rehype-katex';
// import remarkGfm from 'remark-gfm';

import useMarkdownProcessor from '../hooks/useMarkdownProcessor';

import Collapsable from "./Collapsable";


export default function Page({ pageData }) {

  const reactContent = useMarkdownProcessor(pageData.markdown)


  return (
    <>

      {!pageData.published && <DraftFlag />}
      <article>
        <h1>{pageData.title}</h1>
{reactContent}
        <hr/>
        <small>Last updated {formatRelative(new Date(pageData.mtime), new Date())}</small>
      </article>
    </>
  );

}
