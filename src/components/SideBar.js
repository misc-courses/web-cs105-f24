import { useState } from "react";
import Link from "next/link";
import PropTypes from "prop-types";

import styles from "./Sidebar.module.css";

// const SideLink = ({ name, path, currentPage }) => {
//   const className =
//     currentPage && currentPage.path && path === currentPage.path
//       ? "sidebar-link active"
//       : "sidebar-link";
//   return (
//     <Link to={path} className={className}>
//       {name}
//     </Link>
//   );
// };

// SideLink.propTypes = {
//   name: PropTypes.string,
//   path: PropTypes.string,
//   currentPage: PropTypes.shape({
//     path: PropTypes.string,
//     title: PropTypes.string,
//   }),
// };

// const Directory = ({ name, children, currentPage }) => {
//   const [hidden, setHidden] = useState(true);

//   const files = children.map((child) => (
//     <li key={`${child.path}`}>
//       <SideLink name={child.name} path={child.path} currentPage={currentPage} />
//     </li>
//   ));

//   // figure out if the current page is in here
//   const notIn = children.every(
//     (child) => currentPage && child.path !== currentPage.path
//   );

//   return (
//     <li>
//       <h4
//         className="sidebar-group-header"
//         onClick={() => {
//           setHidden(!hidden);
//         }}
//       >
//         {name}
//       </h4>
//       {(!hidden || !notIn) && <ul className="sidebar-group">{files}</ul>}
//     </li>
//   );
// };

// Directory.propTypes = {
//   name: PropTypes.string.isRequired,
//   children: PropTypes.array.isRequired,
//   currentPage: PropTypes.shape({
//     path: PropTypes.string,
//     title: PropTypes.string,
//   }),
// };

// const Sidebar = ({ currentPage, unhide }) => {
//   // this should contain all markdown items in directories
//   const pathNodes = useStaticQuery(graphql`
//     {
//       allMarkdownRemark(
//         sort: { order: ASC, fields: [frontmatter___date] }
//         filter: { frontmatter: { path: { regex: "//.+/.+/" } } }
//       ) {
//         edges {
//           node {
//             frontmatter {
//               path
//               name
//               published
//             }
//           }
//         }
//       }
//     }
//   `);

//   const paths = new Map();

//   pathNodes.allMarkdownRemark.edges.forEach(({ node }) => {
//     const { path, name, published } = node.frontmatter;
//     if (published) {
//       // deconstruct the path
//       // the leading / causes an extra field in the result
//       const [, dir] = path.split("/");

//       const record = {
//         name: name,
//         path: path,
//       };

//       if (paths.has(dir)) {
//         paths.get(dir).push(record);
//       } else {
//         paths.set(dir, [record]);
//       }
//     }
//   });

//   let dirs = Array.from(paths);
//   dirs.sort((item1, item2) => item1[0].localeCompare(item2[0]));
//   dirs = dirs.map(([dir, children]) => (
//     <Directory
//       key={`${dir}`}
//       name={dir}
//       children={children}
//       currentPage={currentPage}
//     />
//   ));

//   return (
//     <div className={unhide ? "sidebar open" : "sidebar"}>
//       <ul>
//         <li>
//           <SideLink name="Home" path="/" currentPage={currentPage} />
//         </li>
//         <li>
//           <SideLink
//             name="Course Info"
//             path="/course-info"
//             currentPage={currentPage}
//           />
//         </li>
//         {dirs}
//       </ul>
//     </div>
//   );
// };

function Sidebar({ unhide, currentPage }) {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
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
        </li>
      </ul>
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
