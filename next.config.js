module.exports = {
  images: {
    domains: ["links.papareact.com", "fakestoreapi.com", "pngimg.com"], // whitelists these domains
  },
  /* only for public keys */
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
};
