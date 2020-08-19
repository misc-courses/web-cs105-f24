const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  basePath: isProduction ? "/~candrews/courses/cs312-f20" : "",
  assetPrefix: isProduction ? "http://www.cs.middlebury.edu" : "",
};
