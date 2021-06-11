import {parse, format} from "date-fns/fp";
import {compareAsc, isToday, differenceInCalendarDays} from "date-fns";
import MarkdownFragment from './MarkdownFragment';
import styles from './Calendar.module.css';



const displayDate = format("iiii, MMM d");

const collapseText = (text) =>
  typeof text === 'string' ? text : text.join('  \n');

const itemToHTML = (item) => {
  const key = collapseText(item.text);
  const contents = (
    <ul>
      {item.fragments.map((fragment, index) => (
        <li key={key + index}>{fragment}</li>
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

function Week({ weekData, number }) {
  const dated = [];
  const undated = [];

  const weekStart = new Date(weekData.week);
  const difference = differenceInCalendarDays(new Date(), weekStart);
  const thisWeek = difference > 0 && difference < 7;

  const findDate = parse(weekStart, "iii"); // partial function for parsing days of the week

  weekData.entries.forEach((item) => {
    // make sure we have a list of text items
    const entries = typeof item.text === 'string' ? [item.text] : item.text;
    item.fragments = entries.map(
      (fragment) => <MarkdownFragment text={fragment} />
    );

    if (item.day) {
      item.date = findDate(item.day);
      dated.push(item);
    } else {
      undated.push(item);
    }
  });

  dated.sort((a, b) => compareAsc(a.date, b.date));

  const weekStyle = thisWeek ? `${styles.weekBlock} ${styles.weekBlockCurrent}` : styles.weekBlock;
  const weekHeaderStyle = thisWeek ? `${styles.weekHeader} ${styles.weekHeaderCurrent}` : styles.weekHeader;


  return (
    <div className={weekStyle}>
      <div className={weekHeaderStyle}>
        <div>Week</div>
    <div className={styles.weekNumber}>{number}</div>
      </div>
      <div className={styles.entries}>
        <ul>{undated.map(itemToHTML)}</ul>
        {dated.length > 0 && undated.length > 0 ? <hr /> : <></>}
        <ul>{dated.map(itemToHTML)}</ul>
      </div>
    </div>
  );
}

export default function Calendar({ data }) {
  const weeks = data.map((week, index) => <Week key={week.week} weekData={week} number={index+1}/>);

  return <div className={styles.calendar}>{weeks}</div>;
}
