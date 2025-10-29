export function createPageUrl(page) {
  const routes = {
    Garden: '/',
    AddThought: '/addthought',
    Analytics: '/analytics'
  };
  return routes[page] || '/';
}