export function param(obj) {
  return Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&');
}
