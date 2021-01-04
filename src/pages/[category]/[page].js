import path from "path";
import fs from "fs";

import Page from "../../components/Page";
import { getAllPageIds, getPageData } from "../../lib/file-utils";

const contentDirectory = path.join(process.cwd(), "content");

export default function Resource({ pageData }) {
  return <Page pageData={pageData} />;
}

/**
 * Specifies which dynamic routes should be pre-rendered
 */
export async function getStaticPaths() {
  const paths = [];
  const fileNames = fs.readdirSync(contentDirectory);
  const contentDirectories = fileNames.filter((name) =>
    fs.lstatSync(path.join(contentDirectory, name)).isDirectory()
  );
  contentDirectories.forEach((category) => {
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
  const pageData = await getPageData(
    path.join(contentDirectory, params.category),
    params.page
  );
  pageData.path = path.join("/", params.category, params.page);
  return {
    props: { pageData },
  };
}
