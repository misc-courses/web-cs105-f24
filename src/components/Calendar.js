import MarkdownFragment from './MarkdownFragment';
import styles from './Calendar.module.css';

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

  return (
    <li key={key} className={styles.entry}>
      {item.date && <strong>{item.date}</strong>} {contents}
    </li>
  );
};

function Week({ weekData }) {
  const dated = [];
  const undated = [];

  weekData.entries.forEach((item) => {
    // make sure we have a list of text items
    const entries = typeof item.text === 'string' ? [item.text] : item.text;
    item.fragments = entries.map(
      (fragment) => <MarkdownFragment text={fragment} />
    );

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
      <div className={styles.entries}>
        <ul>{undated.map(itemToHTML)}</ul>
        {dated.length > 0 && undated.length > 0 ? <hr /> : <></>}
        <ul>{dated.map(itemToHTML)}</ul>
      </div>
    </div>
  );
}

export default function Calendar({ data }) {
  const weeks = data.map((week) => <Week key={week.week} weekData={week} />);

  return <div className={styles.calendar}>{weeks}</div>;
}
