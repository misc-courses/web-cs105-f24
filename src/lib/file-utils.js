import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import sitemap from '../../content/sitemap.json';

const contentDirectory = path.join(process.cwd(), "content");


/**
 * Returns all paths found in the sitemap
 * 
 * This is used in getStaticPaths to enumerate valid paths
 */
export function getAllPaths(){
  const extractPaths = (contents)=>{
    const paths = [];

    contents.forEach((p)=>{
      if (p.type === 'directory'){
        paths.push(...extractPaths(p.children));
      }else if (p.path !== '/'){
        paths.push(p.path);
      }
    })

    return paths;
  }

  return extractPaths(sitemap);

}



/**
 * Read in the content file.
 *
 * @param {[string]} routeData - a list of path elements to the resource
 */
export function getPageData(routeData) {
  let fullPath = path.join(contentDirectory, ...routeData) + '.md';
  if (! fs.existsSync(fullPath)){
    fullPath += 'x';
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // get the metadata
  const matterResult = matter(fileContents);
  const stats = fs.statSync(fullPath);
  matterResult.data.mtime = stats.mtime.toISOString();
  matterResult.data.path = path.join('/', ...routeData);

  return {
    content: matterResult.content,
    ...matterResult.data,
  };
}
