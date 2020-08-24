import path from "path";

import Page from "../../components/Page";
import { getAllPageIds, getPageData } from "../../lib/file-utils";

const contentDirectory = path.join(process.cwd(), "content");
const categories = [
  "assignments",
  "lectures",
  "practicals",
  "project",
  "resources",
];

export default function Resource({ pageData }) {
  return <Page pageData={pageData} />;
}

/**
 * Specifies which dynamic routes should be pre-rendered
 */
export async function getStaticPaths() {
  const paths = [];
  categories.forEach((category) => {
    const subpaths = getAllPageIds(contentDirectory, category);

    paths.push(...subpaths);
  });

  return {
    paths,
    fallback: false,
  };
}

/**
 * Fetch the data for the page to be rendered.
 *
 * @param {*} param0
 */
export async function getStaticProps({ params }) {
  console.log(params);
  const pageData = await getPageData(
    path.join(contentDirectory, params.category),
    params.page
  );
  pageData.path = path.join("/", params.category, params.page);
  return {
    props: { pageData },
  };
}
