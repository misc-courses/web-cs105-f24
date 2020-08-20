import { useState } from "react";
import Link from "next/link";
import PropTypes from "prop-types";

import styles from "./Sidebar.module.css";

import contents from "../../content/sitemap.json";

const SideLink = ({ name, path, currentPage }) => {
  const className =
    currentPage && currentPage.path && path === currentPage.path
      ? "sidebar-link active"
      : "sidebar-link";

  return (
    <Link href={path}>
      <a>{name}</a>
    </Link>
  );
};

SideLink.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
  currentPage: PropTypes.shape({
    path: PropTypes.string,
    title: PropTypes.string,
  }),
};

const Directory = ({ name, children, currentPage }) => {
  const [hidden, setHidden] = useState(true);

  const files = children.map((child) => (
    <li key={`${child.path}`} className={styles.sidebarSubItem}>
      <SideLink name={child.name} path={child.path} currentPage={currentPage} />
    </li>
  ));

  // figure out if the current page is in here
  const notIn = children.every(
    (child) => currentPage && child.path !== currentPage.path
  );

  return (
    <>
      <h4
        className={styles.groupHeader}
        onClick={() => {
          setHidden(!hidden);
        }}
      >
        {name}
      </h4>
      {(!hidden || !notIn) && <ul className={styles.sidebarGroup}>{files}</ul>}
    </>
  );
};

Directory.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
  currentPage: PropTypes.shape({
    path: PropTypes.string,
    title: PropTypes.string,
  }),
};

function Sidebar({ unhide, currentPage }) {
  console.log(contents);

  const items = contents.map((item) => {
    if (item.type === "directory") {
      return (
        <li key={item.name} className={styles.sidebarItem}>
          <Directory
            name={item.name}
            children={item.children}
            currentPage={currentPage}
          />
        </li>
      );
    } else {
      return (
        <li key={item.name} className={styles.sidebarItem}>
          <SideLink
            name={item.name}
            path={item.path}
            currentPage={currentPage}
          />
        </li>
      );
    }
  });

  return (
    <div className={styles.sidebar}>
      <ul>{items}</ul>
    </div>
  );
}

Sidebar.propTypes = {
  unhide: PropTypes.bool,
  currentPage: PropTypes.shape({
    path: PropTypes.string,
    title: PropTypes.string,
  }),
};

Sidebar.defaultProps = {
  unhide: false,
};

export default Sidebar;

{
  /* <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <h4>Resources</h4>
          <ul>
            <li>
              <Link href="/resources/tools">
                <a>Tools</a>
              </Link>
            </li>
            <li>
              <Link href="/resources/getting-started">
                <a>Getting Started</a>
              </Link>
            </li>
          </ul>
        </li> */
}
