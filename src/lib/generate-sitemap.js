const path = require('path');
const matter = require('gray-matter');
const fs = require('fs');

const config = require('../..//site.config');


const contentDirectory = path.join(process.cwd(), 'content');


const sitemapLocation = path.join(process.cwd(), 'content', 'sitemap.json');

function getOrderedPageList(directory) {
  // Get file names under the directory
  const fileNames = fs.readdirSync(directory);
  let allPageData = fileNames.map((fileName) => {
    // Remove '.md' from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(directory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });

  // allPageData = allPageData.filter((page) => page.published);

  // Sort posts by date
  return allPageData.sort((a, b) => {
    if (a.date > b.date) {
      return 1;
    } else if (a.date === b.date) {
      return a.name.localeCompare(b.name);
    } else {
      return -1;
    }
  });
}

const makeNode = (name, path, published) => ({ name, type: 'node', path, published });

const makeDirectory = (name, children) => ({
  name,
  type: 'directory',
  children,
});

function generateSitemap() {
  const sitemap = [];
  const {content} = config;

  Object.entries(content).forEach(([route, name])=>{
    const filePath = path.join(contentDirectory, route);
    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isDirectory()){
      const contents = getOrderedPageList(filePath).map((sp) => makeNode(sp.name, path.join('/', route, sp.id), sp.published));
    if (contents.length > 0) {
      sitemap.push(makeDirectory(name, contents));
    }
    }else{
      sitemap.push(makeNode(name, route ==='index' ? '/':`/${route}`, true));
    }
  });

  const data = JSON.stringify(sitemap);
  fs.writeFileSync(sitemapLocation, data);
}

generateSitemap();
