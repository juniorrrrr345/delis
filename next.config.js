/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: []
  },
  env: {
    CLOUDFLARE_ACCOUNT_ID: '7979421604bd07b3bd34d3ed96222512',
    CLOUDFLARE_API_TOKEN: 'ijkVhaXCw6LSddIMIMxwPL5CDAWznxip5x9I1bNW',
    CLOUDFLARE_DATABASE_ID: 'b52bc539-a06c-4c32-9569-0ea917199a6b'
  }
}

module.exports = nextConfig
