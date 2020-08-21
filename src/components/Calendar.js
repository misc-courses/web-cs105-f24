import React from "react";
import remark from "remark";
import remark2react from "remark-react";
import styles from "./Calendar.module.css";

function Week({ weekData }) {
  const dated = [];
  const undated = [];

  weekData.entries.forEach((item) => {
    item.html = remark()
      .use(remark2react, { fragment: React.Fragment })
      .processSync(item.text).result;
    if (item.date) {
      dated.push(item);
    } else {
      undated.push(item);
    }
  });

  dated.sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className={styles.weekBlock}>
      <div className={styles.weekHeader}>
        <strong>{weekData.week}</strong>
      </div>
      <div>
        <ul className={styles.entries}>
          {dated.map((item) => (
            <li key={item.text}>
              <strong>{item.date}</strong> {item.html}
            </li>
          ))}
        </ul>
        <ul className={styles.entries}>
          {undated.map((item) => (
            <li key={item.text}>{item.html}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Calendar({ data }) {
  const weeks = data.map((week) => <Week key={week.week} weekData={week} />);

  return <div className={styles.calendar}>{weeks}</div>;
}
