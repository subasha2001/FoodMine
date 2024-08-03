const BASE_URL = 'http://localhost:5000';  //it is shared btw all the apis

export const FOODS_URL = BASE_URL + '/api/foods';     //api urls, food url - gives all foods
export const FOODS_TAGS_URL = FOODS_URL + '/tags';
export const FOODS_BY_SEARCH_URL = FOODS_URL + '/search/';
export const FOODS_BY_TAG_URL = FOODS_URL + '/tag/';
export const FOODS_BY_ID_URL = FOODS_URL + '/';