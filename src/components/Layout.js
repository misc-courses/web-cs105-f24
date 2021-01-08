import React, { useState } from "react";
import PropTypes from "prop-types";

import Head from "next/head";

import Header from "./Header";
import Sidebar from "./Sidebar";
import styles from "./Layout.module.css";

import {useRouter} from 'next/router';
import config from '../../site.config';

const Layout = ({children }) => {
  // this is only relevant when the sidebar is hidden
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();
  let pageName = router.asPath.slice(router.asPath.lastIndexOf('/') + 1);
  pageName = pageName ? `${config.shortName} | ${pageName}` : config.shortName;

  return (
    <>
    <Head>
        <title>{pageName}</title>

      </Head>
      <Header onMenu={() => setShowSidebar(!showSidebar)} />
      <Sidebar unhide={showSidebar} />
      <div className={styles.mainPage}>
        <main>{children}</main>
        <footer className={styles.footer}>
          © {config.author} {new Date().getFullYear()}
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
