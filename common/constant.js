/**
 * 固定变量
 */
export const USER_SPECICAL_INFO = 'userSpecialInfo' // 存储登录信息,uid,access_token等

export const USER_INFO = 'userInfo' // 存储用户信息，比如头像，昵称

export const SYSTEM_INFO = 'systemInfo' // 存储系统信息，屏幕宽度等

// 开发环境api
export const DEV_URL = 'http://localhost:7071/api'

// 正式环境api
// #ifndef H5-TEST
// #ifndef MP-TEST
export const PROD_URL = 'https://v2.bubumaoapp.com'
// #endif
// #endif
// #ifdef H5-TEST
export const PROD_URL = 'https://v2-test.bubumaoapp.com'
// #endif
// #ifdef MP-TEST
export const PROD_URL = 'https://v2-test.bubumaoapp.com'
// #endif