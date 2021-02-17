import DraftFlag from './DraftFlag';
import { formatRelative } from 'date-fns'
import { markdownToReact } from "../lib/markdown-utils";

export default function Page({ pageData }) {
  const htmlContents = markdownToReact(pageData.content);
  
  return (
    <>

      {!pageData.published && <DraftFlag />}
      <article>
        <h1>{pageData.title}</h1>

        {htmlContents}
        <hr/>
        <small>Last updated {formatRelative(new Date(pageData.mtime), new Date())}</small>
      </article>
    </>
  );

}
