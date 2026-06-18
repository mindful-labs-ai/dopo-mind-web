/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "https://www.notherlife.com/d0po",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
