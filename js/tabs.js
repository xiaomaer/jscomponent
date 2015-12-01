/**
 * Created by MMY on 2015/11/27.
 */
var doc=document;
//右侧切换选项卡显示不同的内容
var tabs = function () {
    var tabs = doc.getElementsByClassName("tab"),
        tabctns = doc.getElementsByClassName("tabctn"),
        len = tabs.length;
//切换选项卡显示不同的内容
    function tabschange(event) {
        var e = event || window.event,
            target = e.target || e.srcElement;
        if (target.tagName.toLowerCase() === "a") {
            for (var i = 0; i < len; i++) {
                if(i===len-1){
                    tabs[i].className = "tab";
                }
                else{
                    tabs[i].className = "tab border";
                }
                tabctns[i].className = "tabctn";
            }
            target.className += " activelink";
            target.nextElementSibling.className += " active";
        }

    }

    return {
        tabchange: tabschange
    }
}();
//鼠标悬浮列表项上时切换至对应选项卡
doc.getElementById("tabs").addEventListener("mouseover", tabs.tabchange, false);