const path = require('path');

const eleventyEnv = process.env.ELEVENTY_ENV;
const envPath = path.resolve(
  __dirname,
  eleventyEnv === 'ci' ? '../.env.ci' : '../.env'
);
const envFileName = eleventyEnv === 'ci' ? '.env.ci' : '.env';
const { error } = require('dotenv').config({ path: envPath });

if (error) {
  console.warn(`
  ----------------------------------------------------
  Warning: ${envFileName} file not found.
  ----------------------------------------------------
  Please copy sample.env to ${envFileName}
  You can ignore this warning if using a different way
  to set up this environment.
  ----------------------------------------------------
  `);
}

const locales = [
  'english',
  'espanol',
  'chinese',
  'italian',
  'portuguese',
  'japanese',
  'arabic',
  'urdu',
  'bengali'
];

/* These strings set the i18next language. It needs to be the two character
 * string for the language to take advantage of available functionality.
 * Use a 639-1 code here https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
 */
const localeCodes = {
  english: 'en',
  espanol: 'es',
  chinese: 'zh',
  italian: 'it',
  portuguese: 'pt-BR',
  japanese: 'ja',
  arabic: 'ar',
  urdu: 'ur',
  bengali: 'bn'
};

const algoliaIndices = {
  english: 'news',
  espanol: 'news-es',
  chinese: 'news-zh',
  italian: 'news-it',
  portuguese: 'news-pt-br',
  japanese: 'news-ja',
  arabic: 'news-ar',
  urdu: 'news-ur',
  bengali: 'news-bn'
};

const {
  LOCALE_FOR_UI: localeForUI,
  LOCALE_FOR_GHOST: localeForGhost,
  SITE_DOMAIN: siteDomain,
  POSTS_PER_PAGE: postsPerPage,
  ALGOLIA_APP_ID: algoliaAppId,
  ALGOLIA_API_KEY: algoliaAPIKey,
  ADS_ENABLED: adsEnabled,
  GOOGLE_ADSENSE_DATA_AD_CLIENT: googleAdsenseDataAdClient,
  GOOGLE_ADSENSE_DATA_AD_SLOT: googleAdsenseDataAdSlot
} = process.env;

// Validations
const lang = locales.find(e => e === localeForUI);
if (!lang) {
  throw new Error(`Unsupported locale: ${localeForUI}`);
}
if (lang !== localeForGhost && localeForGhost !== 'local') {
  console.warn(`
    ----------------------------------------------------
    Warning: Mismatch between UI locale and Ghost locale.
    ----------------------------------------------------
    You have set the LOCALE_FOR_UI and LOCALE_FOR_GHOST
    to different values. This is not recommended.
    ----------------------------------------------------
  `);
}

// Config Computations
const computedDomain = siteDomain || 'freecodecamp.org';
const computedPath =
  lang === 'english' || lang === 'chinese' ? 'news' : `${lang}/news`;
let siteURL;

if (computedDomain.startsWith('localhost')) {
  siteURL = `http://${computedDomain}/${computedPath}`;
} else if (lang === 'chinese') {
  siteURL = `https://chinese.${computedDomain}/${computedPath}`;
} else {
  siteURL = `https://www.${computedDomain}/${computedPath}`;
}

module.exports = Object.assign(
  {},
  {
    locales,
    localeCodes,
    algoliaIndices,
    currentLocale_i18n: localeForUI || 'italian',
    currentLocale_i18nISOCode: !localeCodes[localeForUI]
      ? localeCodes['italian']
      : localeCodes[localeForUI],
    currentLocale_ghost: localeForGhost || 'italian',
    siteURL,
    postsPerPage: postsPerPage || 25,
    algoliaAppId:
      !algoliaAppId || algoliaAppId === 'app_id_from_algolia_dashboard'
        ? ''
        : algoliaAppId,
    algoliaAPIKey:
      !algoliaAPIKey || algoliaAPIKey === 'api_key_from_algolia_dashboard'
        ? ''
        : algoliaAPIKey,
    algoliaIndex: algoliaIndices[localeForUI] || 'news',
    adsEnabled: adsEnabled || 'false',
    googleAdsenseDataAdClient:
      !googleAdsenseDataAdClient ||
      googleAdsenseDataAdClient === 'pub-1234567890'
        ? ''
        : googleAdsenseDataAdClient,
    googleAdsenseDataAdSlot:
      !googleAdsenseDataAdSlot || googleAdsenseDataAdSlot === '1234567890'
        ? ''
        : googleAdsenseDataAdSlot,
    eleventyEnv: eleventyEnv || 'dev'
  }
);
