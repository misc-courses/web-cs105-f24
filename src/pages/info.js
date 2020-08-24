import Head from "next/head";
import path from "path";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import { markdownToReact } from "../lib/markdown-utils";
import { getPageData } from "../lib/file-utils";

const contentDirectory = path.join(process.cwd(), "content");

export default function Info({ pageData }) {
  const mainContents = markdownToReact(pageData.content);

  return (
    <Layout
      currentPage={{ path: "/info", title: "Course info" }}
      modified={"2020-08-19"}
    >
      <Head>
        <title>CSXXX - Course Information</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>CSXXX - Course Information</h1>

      <table className={styles.infoTable}>
        <tbody>
          <tr>
            <th>Professor</th>
            <td>Christopher Andrews</td>
          </tr>
          <tr>
            <th>Office</th>
            <td>215 75 Shannon Street </td>
          </tr>
          <tr>
            <th>Email</th>
            <td>candrews@middlebury.edu</td>
          </tr>
          <tr>
            <th>Office hours</th>
            <td>TBD</td>
          </tr>
          <tr>
            <th>Website</th>
            <td>
              <a href="http://go.middlebury.edu/cs312">/go/cs312</a>
            </td>
          </tr>
          <tr>
            <th>Class meetings</th>
            <td>
              TTh 9:35a-10:50a (X), 11:10a-12:25p (Y), 1:40p-2:55p (Z), 224
              75SHS
            </td>
          </tr>
          <tr>
            <th>Discussion forum</th>
            <td>
              <a href="http://piazza.com/middlebury/fall2020/cs312/home">
                Piazza
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      {mainContents}
    </Layout>
  );
}

/**
 * Fetch the data for the page to be rendered.
 */
export async function getStaticProps() {
  const pageData = await getPageData(contentDirectory, "info");
  pageData.path = path.join("/", "info");
  return {
    props: { pageData },
  };
}
