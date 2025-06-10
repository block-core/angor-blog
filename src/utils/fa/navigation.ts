const navBarLinks = [
  { name: "خانه", url: "/fa" },
  { name: "وبلاگ", url: "/fa/blog" },
  { name: "مقالات نوستر", url: "/fa/nostr-articles" },
  { name: "تماس با ما", url: "/fa/contact" },
];

const footerLinks = [
  {
    section: "محتوا",
    links: [
      { name: "وبلاگ", url: "/fa/blog" },
      { name: "مقالات نوستر", url: "/fa/nostr-articles" },
    ],  },  {
    section: "درباره",
    links: [
      { name: "درباره ما", url: "/fa/about" },
      { name: "تماس با ما", url: "/fa/contact" },
    ],
  },
];

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
