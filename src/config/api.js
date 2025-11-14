// config/api.js
// export const API_URL = 'ttps://api-be-psg.pasifiksgroup.com:8443'
// export const API_URL = 'http://localhost:3001'
// export const API_URL = 'compro.pasifiksgroup.com:8443'
// export const API_URL = window.APIS_URL || 'http://localhost:3001';
// export const API_URL = process.env.VUE_APP_API_URL;
export const API_URL = window.APIS_URL;

export const API_ENDPOINTS = {
  siteInfo: () => `${API_URL}/apis/public/site-info`,
  customPages: `${API_URL}/apis/custom-pages/frontend`,
  adminCustomPages: `${API_URL}/api/admin/custom-pages`,
  menuListByGroup: (group) => `${API_URL}/apis/menu-list?group=${group}`,
  FOOTER_MENU: `${API_URL}/apis/footer`,
  websiteSchema: (id) => `${API_URL}/api/admin/themes/${id}/active-theme`,
  activeTheme: (websiteId) => `${API_URL}/api/admin/themes/${websiteId}/active-theme`,
  updateTheme: (id) => `${API_URL}/api/admin/themes/${id}`,
  themes: `${API_URL}/api/admin/themes`,
  setActiveTheme: (id) => `${API_URL}/api/admin/themes/${id}/active`,
  favicon: `${API_URL}/apis/icons/favicon`,
  settingLogoPublic: () => `${API_URL}/apis/public/site-info`,
   siteSettingsPublic: (id) => `${API_URL}/api/admin/websites/public/${id}/settings`,
  // siteSettings: (id) => `${API_URL}/api/admin/websites/${id}/settings`,
  settingLogo: `${API_URL}/api/setting-logo`,
  posts: `${API_URL}/apis/posts`,
  postBySlug: (slug) => `${API_URL}/apis/posts/slug/${slug}`,
  allPosts: () => `${API_URL}/apis/posts`,
  categories: `${API_URL}/apis/categories`,
  pages: `${API_URL}/apis/admin/posts`,
  pageBySlug: (slug) => `${API_URL}/apis/admin/posts/page/${slug}`,
   getCommentsBySlug: (slug) => `${API_URL}/apis/comments/post/${slug}`,
  createComment: `${API_URL}/apis/comments`,
};

export default API_ENDPOINTS;
