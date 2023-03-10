/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // async redirects() {
  //   return[
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://127.0.0.1:8000/:path*',
  //       permanent: true
  //     }
  //   ]
  // }
}

module.exports = nextConfig
