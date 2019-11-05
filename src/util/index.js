import { Base64 } from 'js-base64';

const toStr = Object.prototype.toString;
export function isUndef(v) {
  return v === undefined || v === null;
}

export function isDef(v) {
  return v !== undefined && v !== null;
}

export function isTrue(v) {
  return v === true;
}

export function isFalse(v) {
  return v === false;
}
export function isRegExp(v) {
  return toStr.call(v) === '[object RegExp]';
}
export function isArray(v) {
  return toStr.call(v) === '[object Array]';
}
export function isString(v) {
  return toStr.call(v) === '[object String]';
}
export function isObject(v) {
  return toStr.call(v) === '[object Object]';
}
export function isFunction(v) {
  return toStr.call(v) === '[object Function]';
}
export function isNumber(v) {
  return toStr.call(v) === '[object Number]';
}
/**
 * 移除数组项
 */
export function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
  return arr;
}
/**
 */
export function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  return false;
}

export function replacePlaceholder(str = '', pattern, handleCallback) {
  return str.replace(pattern, (v) => {
    const key = v.slice(1);
    return handleCallback(key);
  });
}

export function replaceUrlPlaceholder(url, handleCallback) {
  return replacePlaceholder(url, /:[a-zA-Z]+/g, handleCallback);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0) + string.slice(1);
}
export function handleRequireContext(requireContext, handle) {
  requireContext.keys().forEach((key) => {
    const context = requireContext(key);
    // 因为得到的file格式是: `./filename.js`, 所以这里我们去掉头和尾，只保留真正的文件名: `filename`
    const name = capitalizeFirstLetter(key.replace(/^\.\//, '').replace(/\.\w+$/, ''));
    if (handle) handle(name, context);
  });
}
export function isExternal(path) {
  return /^[a-z|A-Z]*:\/\//.test(path);
}


export const requestAnimFrame = (
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function raf(callback) {
    return setTimeout(callback, 1000 / 60);
  }
);
export const cancelAnimFrame = (
  window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.msCancelAnimationFrame ||
  function raf(timer) {
    window.clearTimeout(timer);
  }
);
export const scrollToTop = (el, animation = false) => {
  if (!animation) {
    el.scrollTop = 0;
    return;
  }
  const anim = () => {
    if (el.scrollTop <= 0) return;
    el.scrollTop -= 30;
    requestAnimFrame(anim);
  };
  requestAnimFrame(anim);
};
export const parseJWT = (jwt) => {
  if (!jwt) return null;
  const jwtArr = jwt.split('.');
  if (!jwtArr[1]) return null;
  const payload = JSON.parse(Base64.decode(jwtArr[1]));
  if (!isObject(payload)) return null;
  return payload;
};

/**
* 前端错误捕获
* 使用方法： 根目录下调用方法
* params  fn 回调函数
* return  fn(type, params)
*         [type]    错误类型
*         [params]  错误信息
*/
export const recordJavaScriptError = (fn) => {
  var type = '',
      params = {},
      date = new Date(),
      loaction = window.loaction.href;

  // JS运行错误
  window.onerror = function(msg, url, lineNo, columnNo, error){
    type = 'onerror';
    params = {
      msg: msg,
      url: url,
      lineNo: lineNo,
      columnNo: columnNo,
      error: error
    };
    console.log("----------------------------------------------------")
    console.log("JS运行错误:")
    console.log("msg: " + msg);
    console.log("url: " + url);
    console.log("date: " + date);
    console.log("loaction: " + loaction);
    console.log("lineNo: " + lineNo);
    console.log("columnNo: " + columnNo);
    console.log("error: " + error);
    console.log("----------------------------------------------------");
  };

  // 资源加载错误
  window.addEventListener('error', event => {
    type = 'listenerError';
    params = {
      event: event
    };
    console.log("----------------------------------------------------")
    console.log("资源加载错误:")
    console.log("event: ", event);
    console.log("date: " + date);
    console.log("loaction: " + loaction);
    console.log("----------------------------------------------------");
  }, true);

  // console.error
  var consoleError = window.console.error; 
  window.console.error = function() {
    type = 'consoleError';
    params = {
      arguments: JSON.stringify(arguments)
    };
    console.log("----------------------------------------------------")
    console.log("consoleError:")
    console.log(JSON.stringify(arguments));
    console.log("date: " + date);
    console.log("loaction: " + loaction);
    console.log("----------------------------------------------------");
    consoleError && consoleError.apply(window, arguments);
  }

  if(fn) fn(type, params)
};

/**
* 权限计算
* params  permission 需要的权限
* return  Boolean    是否有当前组件权限
* (根据项目情况添加权限算法)
*/
export const permissionCalculate = function (permission) {
  return true;
};

/**
* 用户操作统计
* 
*/
export const UserOperationStatistics = function (fn) {
  var is = !!window.addEventListener;
  var fn = fn || function(){ console.log('UserOperationStatistics') };

  if(is){
    window.removeEventListener('click', fn, false);
    window.addEventListener('click', fn, false);
  }else{
    window.detachEvent('onclick', fn);
    window.attachEvent('onclick', fn);
  }
};