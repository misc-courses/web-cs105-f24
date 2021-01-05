import React, { useState } from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import Sidebar from "./Sidebar";
import styles from "./Layout.module.css";

const Layout = ({ currentPage, modified, children }) => {
  // this is only relevant when the sidebar is hidden
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Header onMenu={() => setShowSidebar(!showSidebar)} />
      <Sidebar currentPage={currentPage} unhide={showSidebar} />
      <div className={styles.mainPage}>
        <main>{children}</main>
        <footer className={styles.footer}>
          © Christopher Andrews {new Date().getFullYear()},
          Last updated {modified}
        </footer>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  currentPage: PropTypes.shape({
    path: PropTypes.string,
    title: PropTypes.string,
  }),
  modified: PropTypes.string,
};

export default Layout;
