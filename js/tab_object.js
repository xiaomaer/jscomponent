/**
 * Created by MMY on 2016/7/8.
 */
//用面向对象的方式重写tab选项卡
function Tab(obj) {
    this._root = obj.root;
    this._currClass = obj.currClass;
    this.tabMenus = GLOBAL.Dom.getElementsByClassName('tab-menu', this._root);
    this.tabContents = GLOBAL.Dom.getElementsByClassName("tab-content", this._root);
    this.currentIndex = 0;
    this.len = this.tabMenus.length;
    var trigger = obj.trigger || "click",
        autoPlay = obj.autoPlay,
        playTime = obj.playTime || 2000,
        that = this;
    if (autoPlay) {
        //注意setInterval中this的指向，setInterval(this.autoHandler, playTime);this执行window。
        setInterval(function(){
            that.autoHandler();
        }, playTime);
    }
    for (var i = 0; i < this.len; i++) {
        //解决i值一直为4，而不是对应的0,1,2,3，方法如下：
        //方法1：闭包
        (function (_i) {
            GLOBAL.Event.on(that.tabMenus[_i], trigger, function () {
                that.showItem(_i);
                that.currentIndex = _i;
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
Tab.prototype = {
    showItem: function (n) {
        for (var j = 0; j < this.len; j++) {
            GLOBAL.Dom.addClass(this.tabContents[j], "hidden");
        }
        // console.log(i);//i一直等于4
        GLOBAL.Dom.removeClass(this.tabContents[n], "hidden");
        //如果有当前选中标签，就去掉currClass类
        if (this._currClass) {
            var currMenu = GLOBAL.Dom.getElementsByClassName(this._currClass, this._root)[0];
            if (currMenu) {
                GLOBAL.Dom.removeClass(currMenu, this._currClass);
            }
            GLOBAL.Dom.addClass(this.tabMenus[n], this._currClass);
        }
    },
    autoHandler: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.len) {
            this.currentIndex = 0;
        }
        this.showItem(this.currentIndex);
    }
};
var tabs = GLOBAL.Dom.getElementsByClassName('tab');
new Tab({
    root: tabs[0]
});
new Tab({
    root: tabs[1],
    currClass: "curr-menu",
    trigger: "mouseover",
    autoPlay: true,
    playTime: 2000
});