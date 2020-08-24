import Head from "next/head";

import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Calendar from "../components/Calendar";
import calendarData from "../../content/calendar.json";

export default function Home() {
  return (
    <Layout currentPage={{ path: "/", title: "Home" }} modified={"2020-08-19"}>
      <Head>
        <title>CSXXX - Classname</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>CSXXX - Classname</h1>

          <div>
            <h2>Important Links</h2>

            <div className={styles.linkBox}>
              <a href="course-info">Course Information</a>

              <a href="http://piazza.com/middlebury/fall2020/cs312/home">
                Piazza
              </a>
            </div>
          </div>
          <div>
            <h2>Schedule</h2>
            <em>This is a living schedule and subject to change</em>
            <Calendar data={calendarData} />
          </div>
        </main>
      </div>
    </Layout>
  );
}
