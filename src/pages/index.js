import Head from "next/head";

import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";

export default function Home({ paths }) {
  return (
    <Layout currentPage={{ path: "/", title: "Home" }} modified={"2020-08-19"}>
      <Head>
        <title>CS312 Software Development</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
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
