

import MarkdownFragment from './MarkdownFragment';
import styles from './InfoTable.module.css';


export default function InfoTable({data}){
  const rows = data.map((item)=>(
    <tr key={item[0]}>
      <th>{item[0]}</th>
      <td><MarkdownFragment text={item[1]} /></td>
    </tr>
  ))
  return (<table className={styles.infoTable}>
            <tbody>
              {rows}
            </tbody>
        </table>
  );


}