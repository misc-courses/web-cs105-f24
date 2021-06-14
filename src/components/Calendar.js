import {isToday} from "date-fns";
import MarkdownFragment from './MarkdownFragment';
import styles from './Calendar.module.css';
import {displayDate, inWeek} from "../lib/date-utils"; 




const collapseText = (text) =>
  typeof text === 'string' ? text : text.join('  \n');

const itemToHTML = (item) => {
  const key = item.date? item.date.toLocaleString() : collapseText(item.entries);

  const contents = (
    <ul>
      {item.entries.map((fragment, index) => (
        <li key={fragment}><MarkdownFragment text={fragment} /></li>
      ))}
    </ul>
  );
  let label = "";
  if (item.date){
    if (isToday(item.date)){
      label = <strong>Today</strong>
    }else{
      label = <strong>{displayDate(item.date)}</strong>
    }

  }

  return (
    <li key={key} className={styles.entry}>
      {label} {contents}
    </li>
  );
};

function Week({ week, number }) {
  const thisWeek = inWeek(new Date(), week.startDate);

  const weekStyle = thisWeek ? `${styles.weekBlock} ${styles.weekBlockCurrent}` : styles.weekBlock;
  const weekHeaderStyle = thisWeek ? `${styles.weekHeader} ${styles.weekHeaderCurrent}` : styles.weekHeader;


  return (
    <div className={weekStyle}>
      <div className={weekHeaderStyle}>
        <div>Week</div>
    <div className={styles.weekNumber}>{number}</div>
      </div>
      <div className={styles.entries}>
        <ul>{week.undated.map(itemToHTML)}</ul>
        {week.dated.length > 0 && week.undated.length > 0 ? <hr /> : <></>}
        <ul>{week.dated.map(itemToHTML)}</ul>
      </div>
    </div>
  );
}

export default function Calendar({ data }) {

  const weeks = data.map((week, index) => <Week key={week.startDate.toLocaleString()} week={week} number={index+1}/>);

  return <div className={styles.calendar}>{weeks}</div>;
}
