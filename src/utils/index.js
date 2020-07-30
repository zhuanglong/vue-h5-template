/**
 * @param {string} path
 * @return {Boolean}
 */
export function isExterbal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
