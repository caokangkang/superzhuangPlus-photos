/**
 * @description 判断是否为空
 * @param {string} str
 * @returns {boolean}
 */
export function isNullOrEmpty(obj: any) {
  if (typeof obj == "undefined" || obj == null || obj == "") {
    return true
  } else {
    return false
  }
}

/**
 * @description 判断是否是数组
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg: any) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}