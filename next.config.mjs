/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    output: 'export',
    distDir: 'out',
    images: {
        unoptimized: true
    }
};

export default nextConfig;