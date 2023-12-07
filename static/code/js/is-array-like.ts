export function isArrayLike(obj) {
  if (!obj) return false;
  const l = obj.length;
  if (typeof l != "number" || l < 0) return false;
  if (Math.floor(l) != l) return false;
  if (l > 0 && !(l - 1 in obj)) return false;
  for (let i = 0; i < l; ++i) {
    if (!(i in obj)) return false;
  }
  return true;
}
