// Translation utility for multilingual support
export function getTranslation(locale: string | undefined, key: string): string {
  const translations: Record<string, Record<string, string>> = {
    "read_more": {
      "en": "Read More",
      "fr": "Lire la suite",
      "ar": "اقرأ المزيد",
      "fa": "ادامه مطالعه"
    },
    "read": {
      "en": "Read",
      "fr": "Lire",
      "ar": "اقرأ",
      "fa": "خواندن"
    },
    "latest_articles": {
      "en": "Latest Posts",
      "fr": "Derniers Articles",
      "ar": "أحدث المقالات",
      "fa": "آخرین مطالب"
    },
    "more_articles": {
      "en": "More Articles",
      "fr": "Plus d'Articles",
      "ar": "المزيد من المقالات",
      "fa": "سایر مطالب"
    },
    "discover_posts": {
      "en": "Discover our newest posts and insights",
      "fr": "Découvrez nos derniers articles et analyses",
      "ar": "اكتشف أحدث منشوراتنا ورؤانا",
      "fa": "جدیدترین نوشته‌های ما را مشاهده کنید"
    },
    "recent_posts": {
      "en": "Recent Posts",
      "fr": "Articles Récents",
      "ar": "المقالات الأخيرة",
      "fa": "نوشته‌های اخیر"
    },
    "tags": {
      "en": "Popular Tags",
      "fr": "Tags Populaires",
      "ar": "العلامات الشائعة",
      "fa": "برچسب‌های محبوب"
    },
    "click_tag_info": {
      "en": "Click on any tag to see related articles",
      "fr": "Cliquez sur un tag pour voir les articles associés",
      "ar": "انقر على أي علامة لرؤية المقالات ذات الصلة",
      "fa": "روی هر برچسب کلیک کنید تا مقالات مرتبط را ببینید"
    },
    "view_articles_about": {
      "en": "View articles about",
      "fr": "Voir les articles sur",
      "ar": "عرض المقالات المتعلقة بـ",
      "fa": "مشاهده مقالات مربوط به"
    },
    "total_posts": {
      "en": "Total Posts",
      "fr": "Total des Articles",
      "ar": "إجمالي المقالات",
      "fa": "کل نوشته‌ها"
    },
    "categories": {
      "en": "Categories",
      "fr": "Catégories",
      "ar": "التصنيفات",
      "fa": "دسته‌بندی‌ها"
    },
    "subscribe": {
      "en": "Subscribe",
      "fr": "S'abonner",
      "ar": "اشتراك",
      "fa": "عضویت"
    },
    "enter_email": {
      "en": "Enter your email",
      "fr": "Entrez votre email",
      "ar": "أدخل بريدك الإلكتروني",
      "fa": "ایمیل خود را وارد کنید"
    },
    "newsletter_title": {
      "en": "Stay up to date",
      "fr": "Rester à jour",
      "ar": "ابق على اطلاع",
      "fa": "به‌روز بمانید"
    },
    "newsletter_content": {
      "en": "Stay updated with the latest tools and exclusive deals.",
      "fr": "Restez informé des derniers outils et des offres exclusives.",
      "ar": "كن على اطلاع بأحدث الأدوات والعروض الحصرية.",
      "fa": "از آخرین ابزارها و پیشنهادات ویژه مطلع باشید."
    },
    "posts": {
      "en": "Posts",
      "fr": "Articles",
      "ar": "المقالات",
      "fa": "نوشته‌ها"
    },
    "post": {
      "en": "post",
      "fr": "article",
      "ar": "مقالة",
      "fa": "نوشته"
    },
    "allPosts": {
      "en": "All posts tagged with",
      "fr": "Tous les articles tagués avec",
      "ar": "جميع المقالات المرتبطة بـ",
      "fa": "تمام نوشته‌های برچسب‌خورده با"
    },
    "backToBlog": {
      "en": " Back to Blog",
      "fr": " Retour au Blog",
      "ar": " العودة إلى المدونة",
      "fa": " بازگشت به وبلاگ"
    },
    "noPostsFound": {
      "en": "No posts found for this tag.",
      "fr": "Aucun article trouvé pour ce tag.",
      "ar": "لم يتم العثور على مقالات لهذا التاغ.",
      "fa": "هیچ نوشته‌ای برای این برچسب یافت نشد."
    },
    "search_placeholder": {
      "en": "Search articles...",
      "fr": "Rechercher des articles...",
      "ar": "البحث في المقالات...",
      "fa": "جستجو در مقالات..."
    },
    "search_no_results": {
      "en": "No articles found",
      "fr": "Aucun article trouvé",
      "ar": "لم يتم العثور على مقالات",
      "fa": "مقاله‌ای یافت نشد"
    },
    "search_results": {
      "en": "Search Results",
      "fr": "Résultats de recherche",
      "ar": "نتائج البحث",
      "fa": "نتایج جستجو"
    },
    "showing_results": {
      "en": "Showing results for",
      "fr": "Affichage des résultats pour",
      "ar": "عرض النتائج لـ",
      "fa": "نمایش نتایج برای"
    },
    "clear_search": {
      "en": "Clear search",
      "fr": "Effacer la recherche",
      "ar": "مسح البحث",
      "fa": "پاک کردن جستجو"
    },
    "searching": {
      "en": "Searching...",
      "fr": "Recherche en cours...",
      "ar": "جاري البحث...",
      "fa": "در حال جستجو..."
    },
    "results_count": {
      "en": "results",
      "fr": "résultats",
      "ar": "نتائج",
      "fa": "نتیجه"
    },
    "result_count": {
      "en": "result",
      "fr": "résultat",
      "ar": "نتيجة",
      "fa": "نتیجه"
    }
  };

  const translation = translations[key];
  if (!translation) {
    console.warn(`Translation key "${key}" not found`);
    return key;
  }

  const currentLocale = locale || "en";
  return translation[currentLocale] || translation["en"] || key;
}

// Helper function to get all translations for a language (for tag pages)
export function getTranslations(locale: string) {
  return {
    read: getTranslation(locale, "read"),
    readMore: getTranslation(locale, "read_more"),
    latestArticles: getTranslation(locale, "latest_articles"),
    moreArticles: getTranslation(locale, "more_articles"),
    discoverPosts: getTranslation(locale, "discover_posts"),
    recentPosts: getTranslation(locale, "recent_posts"),
    tags: getTranslation(locale, "tags"),
    clickTagInfo: getTranslation(locale, "click_tag_info"),
    viewArticlesAbout: getTranslation(locale, "view_articles_about"),
    totalPosts: getTranslation(locale, "total_posts"),
    categories: getTranslation(locale, "categories"),
    subscribe: getTranslation(locale, "subscribe"),
    enterEmail: getTranslation(locale, "enter_email"),
    newsletterTitle: getTranslation(locale, "newsletter_title"),
    newsletterContent: getTranslation(locale, "newsletter_content"),
    posts: getTranslation(locale, "posts"),
    post: getTranslation(locale, "post"),
    allPosts: getTranslation(locale, "allPosts"),
    backToBlog: getTranslation(locale, "backToBlog"),
    noPostsFound: getTranslation(locale, "noPostsFound"),
    searchPlaceholder: getTranslation(locale, "search_placeholder"),
    searchNoResults: getTranslation(locale, "search_no_results"),
    searchResults: getTranslation(locale, "search_results"),
    showingResults: getTranslation(locale, "showing_results"),
    clearSearch: getTranslation(locale, "clear_search"),
    searching: getTranslation(locale, "searching"),
    resultsCount: getTranslation(locale, "results_count"),
    resultCount: getTranslation(locale, "result_count")
  };
}
