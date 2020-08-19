import Head from "next/head";
import Layout from "./Layout";
import Date from "./date";

export default function Page({ pageData }) {
  return (
    <Layout currentPage={pageData} modified={pageData.date}>
      <Head>
        <title>{pageData.title}</title>
      </Head>
      <article>
        <h2>{pageData.title}</h2>
        {/* {pageData.title}
        <br />
        {pageData.id}
        <br /> */}
        {/* <Date dateString={pageData.date} />
        <br />
        {pageData.dueDate ? <Date dateString={pageData.dueDate} /> : ""} */}

        <div dangerouslySetInnerHTML={{ __html: pageData.contentHtml }} />
      </article>
    </Layout>
  );
}
