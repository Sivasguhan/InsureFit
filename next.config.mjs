/** @type {import('next').NextConfig} */
const nextConfig = {  
    reactStrictMode: false,
    trailingSlash: true,
    output: 'export',
    distDir: 'out',
    images: {
        unoptimized: true
    }
};

export default nextConfig;