import Head from "next/head";
import path from "path";
import { useState, useEffect, useContext } from "react";
import PageContext from "../components/PageContext";
import { getAllPageIds, getOrderedPageList } from "../lib/markdown-utils";

import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";

export default function Home() {
  const { setSections } = useContext(PageContext);

  // useEffect(() => {
  //   setSections(paths);
  // }, [paths]);

  return (
    <Layout currentPage={{ path: "/", title: "Home" }} modified={"2020-08-19"}>
      <div className={styles.container}>
        <Head>
          <title>CS312 Software Development</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>CS312 - Software Development</h1>

          <h2>Important Links</h2>

          <div>
            <a href="course-info">Course Information</a>
            <br />
            <a href="https://piazza.com/class/jzyj6cmx2x04vh?cid=3">Piazza</a>
            <br />
            <a href="https://classroom.github.com/classrooms/54724585-cs-312-fall-2019">
              Class GitHub
            </a>
            <br />
            <a href="https://www.gradescope.com/courses/60802">Gradescope</a>
            <br />
          </div>

          <h2>Schedule</h2>
        </main>
      </div>
    </Layout>
  );
}

/**
 * Fetch the data for the page to be rendered.
 *
 * @param {*} param0
 */
// export function getStaticProps({ params }) {
//   const sections = [
//     "assignments",
//     "lectures",
//     "practicals",
//     "project",
//     "resources",
//   ];

//   const paths = sections.map((section) => {
//     const sectionPaths = getOrderedPageList(
//       path.join(process.cwd(), "content", section)
//     ).map((sp) => sp.id);

//     return {
//       section,
//       paths: sectionPaths,
//     };
//   });

//   return {
//     props: { paths },
//   };
// }
