/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
}

// 转译指定node_modules依赖为ES6
const withTM = require('next-transpile-modules')(['react-syntax-highlighter']); // pass the modules you would like to see transpiled


const semi = require('@douyinfe/semi-next').default({})
module.exports = withTM(semi({
    reactStrictMode: true,
    images: {
        domains: ["joeschmoe.io", "bing.ioliu.cn", "sf6-cdn-tos.douyinstatic.com", "dummyimage.com", "localhost"]
    },
    swcMinify: true,
    experimental: {
        forceSwcTransforms: true,
    },
    generateBuildId: async function () {
        return "next-blog-vast-010101"
    }
}));
