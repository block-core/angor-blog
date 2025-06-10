const navBarLinks = [
  { name: "الرئيسية", url: "/ar" },
  { name: "المدونة", url: "/ar/blog" },
  { name: "مقالات نوستر", url: "/ar/nostr-articles" },
  { name: "اتصل بنا", url: "/ar/contact" },
];

const footerLinks = [
  {
    section: "المحتوى",
    links: [
      { name: "المدونة", url: "/ar/blog" },
      { name: "مقالات نوستر", url: "/ar/nostr-articles" },
    ],  },  {
    section: "حول",
    links: [
      { name: "عنا", url: "/ar/about" },
      { name: "اتصل بنا", url: "/ar/contact" },
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
