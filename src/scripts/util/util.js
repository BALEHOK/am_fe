export function param(obj) {
  return Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&');
}

export function always(promise, fn) {
  return promise.then(fn, fn);
}

export function flatObject(ob, ckey) {
  if(typeof ob !== 'object') {
    return {[ckey]: ob};
  }
  return Object.keys(ob).reduce((key, acc) => ({
    ...acc,
    ...flatObject(ob[key], ckey ? `${ckey}[${key}]` : key)
  }), {})
}
