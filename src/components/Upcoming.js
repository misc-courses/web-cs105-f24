import Link from "next/link";
import {differenceInCalendarDays, formatRelative, } from "date-fns";
import style from "./Upcoming.module.css";


export default function Upcoming({ assignments }) {
    const today = new Date();

    // show assignments for the next 1.5 weeks
    const upcoming = assignments.filter((assign)=>{
        const difference = differenceInCalendarDays(assign.dueDate, today);
        return difference >= 0 && difference < 11;
    });
    
    upcoming.sort((d1, d2) =>{
        return differenceInCalendarDays(d1.dueDate, d2.dueDate);
    });
    
    const assignmentList = upcoming.map((assign)=>(
        <li key={assign.name}><Link href={`.${assign.path}`}><a>{assign.name}</a></Link> - Due {formatRelative(assign.dueDate, new Date())}</li>
    ));

    const content = assignmentList.length > 0 ? <ul>{assignmentList}</ul> : <p>Nothing on the radar!</p>

    return (
        <div className={style.box}>
            <h2>Upcoming Due Dates</h2>
            <hr />
            {content}
        </div>
    );

}