$(document).ready(function (e) {
    $("body").css("opacity", "1");
    $("html")[0].scrollLeft = 0;

    var elem = document.querySelector('.container');
    var scroll = 0;
    var heroInABoat = false;
    if (elem.addEventListener) {
        if ('onwheel' in document) {
            // IE9+, FF17+, Ch31+
            elem.addEventListener("wheel", onWheel);
        } else if ('onmousewheel' in document) {
            // устаревший вариант события
            elem.addEventListener("mousewheel", onWheel);
        } else {
            // Firefox < 17
            elem.addEventListener("MozMousePixelScroll", onWheel);
        }
    } else { // IE8-
        elem.attachEvent("onmousewheel", onWheel);
    }

    function onWheel(e) {
        e = e || window.event;

        // wheelDelta не дает возможность узнать количество пикселей
        var delta = e.deltaY || e.detail || e.wheelDelta;

        //var info = document.getElementById('delta');
        if (!heroInABoat) {
            delta = delta > 0 ? delta : 0;
        }
        scroll = scroll + delta;
        console.log(scroll);
        if ((scroll > 1900) && (!heroInABoat)) {
            heroInABoat = true;
            scroll = 1300;
            $(".boat").addClass("boat--whth-hero");
            return
        }
        if ((scroll > 1300) && (scroll < 2100) && (!heroInABoat)) {
           var a = scroll - 1300;
            $(".hero").css("transform", "translateY(" + (a * 0.05) +"px)");
            return
        }
        if (heroInABoat && scroll < 1300) {
            scroll = 1300;
        }
        if (heroInABoat && scroll >= 10000) {
            scroll = 10000;
        }
        if (heroInABoat && scroll >= 4800) {
            $(".text").fadeOut();
            $("html")[0].scrollLeft = (scroll - 4800) * 0.3;
        }

        if (!heroInABoat) {
            $(".boat").css("transform", "translateX(-" + (scroll * 0.18) +"px)");
        }
        if (heroInABoat) {
            $(".boat").css("transform", "translateX(" + (- 468 + (scroll * 0.18)) +"px)");
            $(".hero").css("transform", "translate(" + (-234 + (scroll * 0.18)) +"px, 30px)");
        }

        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }
});
$(window).load(function() {

   
    $("html")[0].scrollLeft = 0;
})
window.onbeforeunload = function() {
    $("html")[0].scrollLeft = 0;
};