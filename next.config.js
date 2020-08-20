const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  basePath: isProduction ? "/~candrews/classes/cs312-f20" : "",
  assetPrefix: isProduction
    ? "https://www.cs.middlebury.edu/~candrews/classes/cs312-f20"
    : "",
};
