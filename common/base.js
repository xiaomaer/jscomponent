/**
 * Created by MMY on 2016/7/8.
 */
var GLOBAL = {};
//扩展命名空间，GLOBAL.str1.str2
GLOBAL.namespace = function (str) {
    var arr = str.split("."),
        o = GLOBAL,
        len = arr.length;
    for (var i = (arr[0] === "GLOBAL" ? 1 : 0); i < len; i++) {
        o[arr[i]] = o[arr[i]] || {};
        o = o[arr[i]];
    }
};
//GLOBAL.Dom
GLOBAL.namespace('Dom');
//根据类获取元素
GLOBAL.Dom.getElementsByClassName = function (className, elem) {
    if (!elem) {
        elem = document;
    }
    if (elem.getElementsByClassName) {
        return elem.getElementsByClassName(className);
    } else {
        var result = [],
            elems = elem.getElementsByTagName('*'),
            len = elems.length;
        for (var i = 0; i < len; i++) {
            var classIndex = elems[i].className.indexOf(className);
            if (classIndex != -1) //存在指定类名的元素，放在数组中
            {
                result.push(elem[i]);
            }
        }
        return result;
    }
};
//判断元素是否包含某个类
GLOBAL.Dom.hasClass = function (elem, className) {
    return elem.className.match(new RegExp("(\\s+|^)" + className + "(\\s+|$)"));
};
//给指定元素添加类
GLOBAL.Dom.addClass = function (elem, className) {
    if (!this.hasClass(elem, className)) {
        if (elem.className) {
            elem.className += " " + className;
        } else {
            elem.className = className;
        }
    }
};
//给指定元素删除类
GLOBAL.Dom.removeClass = function (elem, className) {
    if (this.hasClass(elem, className)) {
        elem.className = elem.className.replace(new RegExp("(\\s+|^)" + className + "(\\s+|$)"), "");
    }
};
GLOBAL.namespace('Event');
//绑定不同事件
GLOBAL.Event.on=function(elem,eventType,handler){
    //兼容IE
    if(document.all){
        elem.attachEvent("on"+eventType,handler);
    }else{
        elem.addEventListener(eventType,handler,false);
    }
};