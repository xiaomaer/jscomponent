/**
 * Created by MMY on 2015/11/27.
 */
 //自写JQ animate()实现无缝动画轮播图。
//注意：结合transition实现图片切换动画时无法实现无缝轮播图
var doc = document;
var horse = function () {
    var imgslist = doc.getElementById("imgs"),
        imgs = imgslist.getElementsByTagName("li"),
        circlelist = doc.getElementById("circles"),
        circles = circlelist.getElementsByTagName("li"),
        len = imgs.length,
        imgwidth = imgs[0].offsetWidth,
        totalwidth = imgwidth * (len - 1) * (-1),
        varyleft = imgslist.offsetLeft,
        j = 0,//用于记录原点的位置
        timer;

    //实现jq animate()动画效果
    function animate(elem, varywidth) {
        var curleft = imgslist.offsetLeft,
            time = 20,//无动画切换一张图片所需时间
            animatetime = 400,//有动画时切换一张图片所需时间
            intervaltime = animatetime / time,//每次切换speed距离所需的时间，
            speed = (varywidth - curleft) / 20,//每次定时切换的距离
            i = 0,//判断是否切换完成
            t = setInterval(function () {
                curleft += speed;
                elem.style.left = curleft + "px";
                i++;
                if (i === time) {
                    clearInterval(t);
                }
            }, intervaltime);//每隔intervaltime时间移动speed距离，总共移动20次，即总时间为animatetime
    }

    //动画切换下一张图片
    function nextImg() {
         circles[j].className = "circle";
        if (varyleft <= totalwidth) {//显示最后一张时，瞬间切换到第二张
            imgslist.style.left = -imgwidth + "px";
            varyleft = -imgwidth;
            j++;
        }
        else {
            j++;
            if (j == 4) {
                j = 0;
            }
        }
        varyleft -= imgwidth;//每次移动后的left的值
        animate(imgslist, varyleft);
        circles[j].className = "currimg";
    }

    //动画切换上一张图片
    function prevImg() {
         circles[j].className = "circle";
        if (varyleft >= -imgwidth) {
            imgslist.style.left = totalwidth + "px";
            varyleft = totalwidth;
            j = 3;
        }
        else {
            j--;
            if (j < 0) {
                j = 3;
            }
        }
        varyleft += imgwidth;//每次移动后的left的值
        animate(imgslist, varyleft);
        circles[j].className = "currimg";
    }

    //开启自动切换
    function startAutochange() {
        timer = setInterval(nextImg, 3000);
    }

    //停止自动切换
    function stopAutochange() {
        clearInterval(timer);
    }

    //点击圆点切换图片
    function dotimg(event) {
        var e = event || window.event,
            target = e.target || e.srcElement,
            num;
        if (target.tagName.toLowerCase() === "li") {
            num = parseInt(target.getAttribute("data-num"));
            varyleft = imgwidth * (num + 1) * (-1);
            animate(imgslist, varyleft);
            for (var k = 0; k < len - 2; k++) {
                circles[k].className = "circle";
            }
            target.className = "currimg";
            j = num;
        }
    }

    return {
        previmg: prevImg,
        nextimg: nextImg,
        dotclick: dotimg,
        startauto: startAutochange,
        stopauto: stopAutochange

    }
}();
window.onload = function () {
    //启动定时轮播图片
    horse.startauto();
};
//点击右箭头切换到下一张图片
doc.getElementById("arrR").addEventListener("click", horse.nextimg, false);
//点击左箭头切换到上一张图片
doc.getElementById("arrL").addEventListener("click", horse.previmg, false);
//点击圆点切换对应图片
doc.getElementById("circles").addEventListener("click", horse.dotclick, false);
//鼠标悬浮图片上时停止自动轮播
doc.getElementById("turnimg").addEventListener("mouseover", horse.stopauto, false);
//鼠标离开图片时自动轮播
doc.getElementById("turnimg").addEventListener("mouseout", horse.startauto, false);
