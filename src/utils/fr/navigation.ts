
const navBarLinks = [
  { name: "Accueil", url: "/fr" },
  { name: "Blog", url: "/fr/blog" },
  { name: "Articles Nostr", url: "/fr/nostr-articles" },
  { name: "Contact", url: "/fr/contact" },
];

const footerLinks = [
  {
    section: "Contenu",
    links: [
      { name: "Blog", url: "/fr/blog" },
      { name: "Articles Nostr", url: "/fr/nostr-articles" },
    ],  },  {
    section: "À propos",
    links: [
      { name: "À propos de nous", url: "/fr/about" },
      { name: "Contact", url: "/fr/contact" },
    ],
  },
];

const socialLinks = {
  facebook: "#",
  x: "#",
  github: "https://github.com/block-core/angor",
  google: "#",
  slack: "#",
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
};
