/**
 * Created by MMY on 2016/7/8.
 */
//使用冒泡优化评分系统
function setRate(elem) {
    var items = elem.getElementsByTagName('img'),
        len = items.length,
        imgs = ["star.png", "star2.png"],
        rateState, i;
    for (i = 0; i < len; i++) {
        items[i]._index = i;
    }
    //把事件绑定在父级元素上
    GLOBAL.Event.on(elem, "mouseover", function (e) {
        if (rateState) return;//已经评分
        var target= e.target|| e.srcElement;
        if(target.tagName.toLowerCase()!=='img') return;
        for (var j = 0; j < len; j++) {
            if (j <= target._index) {
                items[j].src = "img/" + imgs[1];
            }
            else {
                items[j].src = "img/" + imgs[0];
            }
        }
    });
    GLOBAL.Event.on(elem, "mouseout", function () {
        if (rateState) return;
        for (var j = 0; j < len; j++) {
            items[j].src = "img/" + imgs[0];
        }
    });
    GLOBAL.Event.on(elem, "click", function (e) {
        if (rateState) return;
        rateState = true;
        var target= e.target|| e.srcElement;
        alert("您打了" + (target._index + 1) + "分");
    });
}
var rates = GLOBAL.Dom.getElementsByClassName('J-rate'),
    rateLen = rates.length;
for (var k = 0; k < rateLen; k++) {
    setRate(rates[k]);
}