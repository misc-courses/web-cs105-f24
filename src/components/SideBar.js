import { useState, useEffect } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import {useRouter} from 'next/router';

import styles from "./Sidebar.module.css";

import contents from "../../content/sitemap.json";

const SideLink = ({ name, path, currentPage, published }) => {
  const className =
    currentPage && path.endsWith(currentPage)
      ? styles.selected
      : undefined;
  const draft = published ? undefined: <span style={{color:'red'}}>DRAFT</span>;
  return (
    <Link href={path} >
      <a className={className}>• {name} {draft}</a>
    </Link>
  );
};

SideLink.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
  currentPage: PropTypes.string,
  published: PropTypes.bool
};

const DirectoryIcon = ({open})=>{
  const shape = <path d="M1.4 8.56L4.67 5M1.4 1.23L4.66 4.7" stroke="#999" strokeLinecap="square"></path>;
  if (open){
    return (<svg width="10" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(90)">
        {shape}    
      </svg>);
  }else{
    return (<svg width="10" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        {shape}    
      </svg>);
  }
}

const Directory = ({ name, items, currentPage }) => {
  const [open, setOpen] = useState(false);
  const isProduction = process.env.NODE_ENV === "production";

  useEffect(()=>{
    if (currentPage){
      setOpen(true);
    }
  },[currentPage]);

  if (isProduction){
    items = items.filter((child)=>child.published);
  }

  const files = items.map((child) => (
    <li key={`${child.path}`} className={styles.sidebarSubItem}>
      <SideLink 
        name={child.name}
        path={child.path}
        currentPage={currentPage}
        published={child.published} />
    </li>
  ));

  const className = currentPage ? `${styles.groupHeader} ${styles.selected}`: styles.groupHeader;

  return (
    <>
      <p
        className={className}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <DirectoryIcon open={open} /> {name}
      </p>
      {(open) && <ul className={styles.sidebarGroup}>{files}</ul>}
    </>
  );
};

Directory.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  currentPage: PropTypes.string,
};

function Sidebar({ unhide }) {
  const router = useRouter();
  
  const currentPath = router.asPath;
  const currentDirectory = currentPath.slice(1, currentPath.indexOf('/',1)).toLocaleLowerCase();


  const entries = contents.map((item) => {
    if (item.type === "directory") {
      return (
        <li key={item.name} className={styles.sidebarItem}>
          {item.name.toLocaleLowerCase() === currentDirectory ? 
          <Directory
            name={item.name}
            items={item.children}
            currentPage={currentPath}
          />
          :
          <Directory
            name={item.name}
            items={item.children}
          />
        }
        </li>
      );
    } else {
      return (
        <li key={item.name} className={styles.sidebarItem}>
          <SideLink
            name={item.name}
            path={item.path}
            published={item.published}
            currentPage={currentPath}
          />
        </li>
      );
    }
  });

  return (
    <div className={`${styles.sidebar} ${unhide ? styles.open : ''}`}>
      <ul>{entries}</ul>
    </div>
  );
}

Sidebar.propTypes = {
  unhide: PropTypes.bool,
};

Sidebar.defaultProps = {
  unhide: false,
};

export default Sidebar;
