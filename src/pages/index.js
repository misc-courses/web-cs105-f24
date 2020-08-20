import Head from "next/head";

import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout currentPage={{ path: "/", title: "Home" }} modified={"2020-08-19"}>
      <Head>
        <title>CS312 Software Development</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>CS312 - Software Development</h1>

          <div>
            <h2>Important Links</h2>

            <div className={styles.linkBox}>
              <a href="course-info">Course Information</a>

              <a href="http://piazza.com/middlebury/fall2020/cs312/home">
                Piazza
              </a>

              <a href="https://classroom.github.com/classrooms/54724585-cs-312-fall-2019">
                Class GitHub
              </a>

              <a href="https://www.gradescope.com/courses/60802">Gradescope</a>
            </div>
          </div>
          <div>
            <h2>Schedule</h2>
            <em>This is a living schedule and subject to change</em>
          </div>
        </main>
      </div>
    </Layout>
  );
}
