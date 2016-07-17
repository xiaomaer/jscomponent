/**
 * Created by MMY on 2016/7/8.
 */
function setRate(elem) {
    var items = elem.getElementsByTagName('img'),
        len = items.length,
        imgs = ["star.png", "star2.png"],
        rateState, i;
    for (i = 0; i < len; i++) {
        items[i]._index = i;
        GLOBAL.Event.on(items[i], "mouseover", function () {
            if (rateState) return;//已经评分
            for (var j = 0; j < len; j++) {
                if (j <= this._index) {
                    items[j].src = "img/" + imgs[1];
                }
                else {
                    items[j].src = "img/" + imgs[0];
                }
            }
        });
        GLOBAL.Event.on(items[i], "mouseout", function () {
            if (rateState) return;
            for (var j = 0; j < len; j++) {
                items[j].src = "img/" + imgs[0];
            }
        });
        GLOBAL.Event.on(items[i], "click", function () {
            if (rateState) return;
            rateState = true;
            alert("您打了" + (this._index + 1) + "分");
        });
    }
}
var rates = GLOBAL.Dom.getElementsByClassName('J-rate'),
    rateLen = rates.length;
for (var k = 0; k < rateLen; k++) {
    setRate(rates[k]);
}