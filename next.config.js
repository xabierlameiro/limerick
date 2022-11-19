/** @type {import('next').NextConfig} */
const withMDX = require("@next/mdx")({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [],
    },
});

const withPWA = require("next-pwa")({
    dest: "public",
});

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    productionBrowserSourceMaps: false,
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
    images: {
        domains: ["media.daft.ie", "ss", "gstatic.com"],
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

module.exports = withBundleAnalyzer(withPWA(withMDX(nextConfig)));
