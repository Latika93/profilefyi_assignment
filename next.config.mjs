/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '**',
            },
        ],
    },
    // images: {
    //     domains: ['encrypted-tbn3.gstatic.com']
    // },
};

export default nextConfig;
