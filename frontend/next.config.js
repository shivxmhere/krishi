/** @type {import('next').NextConfig} */
const nextConfig = {
    // Removed experimental: { appDir: true } as it is default in Next.js 14
    images: {
        domains: ['localhost', 'krishi-backend.onrender.com'],
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
