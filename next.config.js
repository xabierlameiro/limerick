/** @type {import('next').NextConfig} */

const withMDX = require("@next/mdx")({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [],
    },
});

const nextConfig = {
    env: {
        google_maps_key: "AIzaSyD_w6ud35ISjEvzQkdddzaUFpdDCDarqEY",
    },
    reactStrictMode: true,
    swcMinify: true,
    productionBrowserSourceMaps: false,
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
    images: {
        domains: ["media.daft.ie", "ss"],
    },
    async redirects() {
        return [
            {
                source: "/landlady_recommendation",
                destination: "/landlady_recommendation.pdf",
                permanent: true,
            },
            {
                source: "/work_recommendation",
                destination: "/work_recommendation.pdf",
                permanent: true,
            },
        ];
    },
};

module.exports = withMDX(nextConfig);
