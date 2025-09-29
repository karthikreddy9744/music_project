//music-project/server/utils/helpers.js
exports.pick = (obj, keys) =>
  keys.reduce((acc, k) => (obj[k] !== undefined ? ((acc[k] = obj[k]), acc) : acc), {});
