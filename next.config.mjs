/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/home",
                permanent: true,
            },
        ];
    },
    productionBrowserSourceMaps: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.ytimg.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "yt3.ggpht.com",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
