/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  // GitHub Pages serves project repos at /<repo-name>/
  basePath: isProd ? "/akymic-design-system" : "",
  assetPrefix: isProd ? "/akymic-design-system/" : "",
  // Generates /page/index.html instead of /page.html — required for GH Pages routing
  trailingSlash: true,
  images: { unoptimized: true },
};

module.exports = nextConfig;
