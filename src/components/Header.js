/* eslint-disable @next/next/link-passhref */
import Link from "next/link";
import PropTypes from "prop-types";
import config from '../../site.config';
import styles from "./Header.module.css";

const Header = ({ onMenu }) => (
  <header className={styles.navbar}>
    <div className={styles.container}>
      <div className={styles.sidebarButton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          viewBox="0 0 448 512"
          className="icon"
          width="20px"
          height="20px"
          onClick={onMenu}
        >
          <path
            fill="currentColor"
            d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"
          ></path>
        </svg>
      </div>

      <Link href="/">
        <h1 className={styles.mainTitle}>{config.name}</h1>
      </Link>
    </div>
  </header>
);

Header.propTypes = {
  onMenu: PropTypes.func,
};

export default Header;
