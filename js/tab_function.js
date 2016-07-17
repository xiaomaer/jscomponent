/**
 * Created by MMY on 2016/7/8.
 */
//处理不同tab,使得他们之间相互独立
/**
 *obj:配置参数对象
 * root:tab父级元素,必须属性
 *currClass:控制tab高亮的类名
 * trigger:时间类型
 * autoPlay:是否自动切换tab选项卡
 * playTime:自动切换选项卡的间隔时间
 * 如果一个函数内某个因素很不稳定，我们可以将它从函数内部分离出来，以参数的形式传入，从而将不稳定因素和函数解耦
 */
function setTab(obj) {
    var root = obj.root,
        currClass = obj.currClass,
        trigger = obj.trigger || "click",
        autoPlay = obj.autoPlay,
        playTime = obj.playTime || 2000,
        tabMenus = GLOBAL.Dom.getElementsByClassName('tab-menu', root),
        tabContents = GLOBAL.Dom.getElementsByClassName("tab-content", root),
        len = tabMenus.length,
        currentIndex = 0,
        i, j;

    function showItem(n) {
        for (j = 0; j < len; j++) {
            GLOBAL.Dom.addClass(tabContents[j], "hidden");
        }
        // console.log(i);//i一直等于4
        GLOBAL.Dom.removeClass(tabContents[n], "hidden");
        //如果有当前选中标签，就去掉currClass类
        if (currClass) {
            var currMenu = GLOBAL.Dom.getElementsByClassName(currClass, root)[0];
            if (currMenu) {
                GLOBAL.Dom.removeClass(currMenu, currClass);
            }
            GLOBAL.Dom.addClass(tabMenus[n], currClass);
        }
    }

    function autoHandler() {
        currentIndex++;
        if (currentIndex >= len) {
            currentIndex = 0;
        }
        showItem(currentIndex);
    }

    if (autoPlay) {
        setInterval(autoHandler, playTime);
    }
//运行程序后，初始化不同tab选项的点击事件，初始完成后，
// 因为javascript没有块级作用域，这时i=4，所以当点击tab响应点击事件时，i仍为4，而不是我们想要的0，1，2，3...
    for (i = 0; i < len; i++) {
        //解决i值一直为4，而不是对应的0,1,2,3，方法如下：
        //方法1：闭包
        (function (_i) {
            GLOBAL.Event.on(tabMenus[_i], trigger, function () {
                showItem(_i);
                currentIndex = _i;
            });
        })(i);
        //方法2：给元素添加属性，使属性值等于索引值i
        //tabMenus[i]._index = i; //把i的值存储于tab元素对象属性中,i，1，2，3...
        //tabMenus[i].onclick = function () {
        //    for (j = 0; j < len; j++) {
        //        addClass(tabContents[j], "hidden");
        //    }
        //    // console.log(i);//i一直等于4
        //    removeClass(tabContents[this._index], "hidden");
        //};
        // console.log(i);//i=0,1,2,3
    }
}
var tabs = GLOBAL.Dom.getElementsByClassName('tab');
setTab({
    root: tabs[0]
});
setTab({
    root: tabs[1],
    currClass: "curr-menu",
    trigger: "mouseover",
    autoPlay: true,
    playTime: 2000
});

