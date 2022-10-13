/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || "https://couplelookinghomeinlimerick.com/",
    generateRobotsTxt: true,
    priority: 1,
    sitemapSize: 7000,
};
