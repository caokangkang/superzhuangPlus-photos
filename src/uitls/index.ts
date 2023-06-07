import { isArray, isNullOrEmpty } from './validate';
/**
 * 查询key值是否存在与数组中，并返回当前行的整个对象
 * @param {原始数组} arr      [必须]原数组
 * @param {寻找的值} keyValue [必须]数组中需要寻找的值
 * @param {对象名称} keyName  [可选]如果数组行是对象则必须填写keyName
 */
export function queryKeyArrayItem(arr: any, keyValue: any, keyName: any) {
  var obj = null;
  if (isArray(arr) && arr.length > 0 && !isNullOrEmpty(keyValue)) {
    for (var i = 0; i < arr.length; i++) {
      var key = !isNullOrEmpty(keyName) ? arr[i][keyName] : arr[i];
      if (!isNullOrEmpty(key) && key == keyValue) {
        return arr[i];
      }
    }
  }
  return obj;
}

/**
 * 获取url参数名内容
 * @param {原始数组} name    [必须]url中的参数名
 */
export function getUrlParameter(name: string) {
	name = name.replace(/[]/, "\[").replace(/[]/, "\[").replace(/[]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.href);
	if (results == null) return "";
	else {
		return results[1];
	}
};