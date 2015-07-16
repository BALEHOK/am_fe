export function param(obj) {
  return Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&');
}

export function always(promise, fn) {
  return promise.then(fn, fn);
}
