import NodeCache from "node-cache";

export const DEFAULT_TOKEN_NAME = "ikun";

export const MUSIC_APP_URL =
  "https://netease-cloud-music-api-bay-two.vercel.app";

export const MUSIC_CACHE = new NodeCache();

export const MUSIC_CACHE_STR = "music-cache";

export const ACCOUNT_CACHE_STR = "account-cache";

export const SERVER_ADDRESS = "http://127.0.0.1:8978";

export const DEFAULT_USER_AVATAR = "https://joeschmoe.io/api/v1/random";

export const DEFAULT_ARTICLE_IMAAGE = "https://joeschmoe.io/api/v1/random";

export const GOSSIP_BLOG_TOKEN_KEY = "GOSSIP_BLOG_TOKEN_KEY";


export const WINDOW_SIZE_MODE = {
  lg: 1200,
  md: 992,
  sm: 768,
  xs: 500,
};
