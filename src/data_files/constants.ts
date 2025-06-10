import ogImageSrc from "@images/social.png";



export const SITE = {
  title: "Angor Blog",
  tagline: "A P2P funding protocol built on Bitcoin and Nostr",
  description: "We're shaking up how Bitcoin crowdfunding works. Angor is a decentralized protocol, uniquely merging the security of Bitcoin with the transparency of Nostr. Investors funds are released in stages through time-lock contracts. Unspent funds can be recovered at any point, ensuring that investors maintain control and aligning the interests of investors and founders.",
  description_short: "A P2P funding protocol built on Bitcoin and Nostr",
  url: "https://angor.io",
  author: "Angor Team",
};

export const SEO = {
  title: SITE.title,
  description: SITE.description,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "en-US",
    "@id": SITE.url,
    url: SITE.url,
    name: SITE.title,
    description: SITE.description,
    isPartOf: {
      "@type": "WebSite",
      url: SITE.url,
      name: SITE.title,
      description: SITE.description,
    },
  },
};

export const OG = {
  locale: "en_US",
  type: "website",
  url: SITE.url,
  title: `${SITE.title}: The Future of Decentralized Finance`,
  description: "Experience the next generation of DeFi with Angor. Built on cutting-edge blockchain technology, offering secure, fast, and innovative decentralized finance solutions with maximum transparency and community governance. Join the revolution today!",
  image: ogImageSrc,
};
