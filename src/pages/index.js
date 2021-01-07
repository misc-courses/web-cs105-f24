
import styles from "../styles/Home.module.css";
import Calendar from "../components/Calendar";
import calendarData from "../../content/calendar.json";
import config from '../../site.config';

export default function Home() {
  return (
    <> 
      <h1 className={styles.title}>{config.name}</h1>

      <div>
        <h2>Important Links</h2>

        <div className={styles.linkBox}>
          <a href="course-info">Course Information</a>

          <a href={config.piazza}>
            Piazza
          </a>
        </div>
      </div>

      <div>
        <h2>Schedule</h2>
        <em>This is a living schedule and subject to change</em>
        <Calendar data={calendarData} />
      </div>

    </>
  );
}
