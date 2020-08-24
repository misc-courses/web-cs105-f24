import Head from "next/head";
import Layout from "./Layout";
import Date from "./date";
import { markdownToReact } from "../lib/markdown-utils";

export default function Page({ pageData }) {
  const htmlContents = markdownToReact(pageData.content);

  return (
    <Layout currentPage={pageData} modified={pageData.date}>
      <Head>
        <title>{pageData.title}</title>
      </Head>
      <article>
        <h2>{pageData.title}</h2>

        {htmlContents}
      </article>
    </Layout>
  );
}
