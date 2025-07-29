// An array of links for navigation bar
const navBarLinks = [
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog" },
  { name: "Angor Articles", url: "/nostr-articles" },
  { name: "Contact", url: "/contact" },
];
// An array of links for footer
const footerLinks = [  {
    section: "Content",
    links: [
      { name: "Blog", url: "/blog" },
      { name: "Angor Articles", url: "/nostr-articles" },
    ],  },  {
    section: "About",
    links: [
      { name: "About us", url: "/about" },
      { name: "Contact", url: "/contact" },
    ],
  },
];
// An object of links for social icons
const socialLinks = {
  facebook: "https://www.facebook.com/",
  x: "https://twitter.com/",
  github: "https://github.com/block-core/angor",
  google: "https://www.google.com/",
  slack: "https://slack.com/",
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
};
