var slideItemArr;
var slideItemWidth;
var currSlideItem = 0;
var sliding = false;

var formatSlider = function(){
    var slider = document.querySelector('.slider');
    slideItemArr = document.querySelectorAll('.slide-item');
    var sliderHeight = 0;

    for(var i=0; i<slideItemArr.length; i++){
        if(slideItemArr[i].offsetHeight > sliderHeight){
            sliderHeight = slideItemArr[i].offsetHeight;
        }
        slideItemArr[i].addEventListener("transitionend", function () { updateSlidePosition(this); }, false);
    }

    slider.style.height = sliderHeight + 'px';
    slider.addEventListener('touchstart', handleTouchStart, false);
    slider.addEventListener('touchmove', handleTouchMove, false);
    slider.addEventListener('mousedown', handleTouchStart, false);
    slider.addEventListener('drag', handleTouchMove, false);
    setSlidePositions();
};

function setSlidePositions(){
    slideItemWidth = slideItemArr[0].offsetWidth;
    var transformDistance = -slideItemWidth;
    for( var i=0; i<slideItemArr.length; i++){
        slideItemArr[i].style.transform = 'translateX('+ transformDistance +'px)';
        transformDistance += slideItemWidth;
    }
}

var updateSlidePosition = function(elem){
    if(elem.classList.contains('last-position') || elem.classList.contains('first-position')){
        elem.className = 'slide-item';
        elem.style.opacity = '1';
        sliding = false;
    }

    var slideTransformPosition = elem.getBoundingClientRect();
    var slidePositionX = slideTransformPosition.x;
    // Find furthest left item and move to furthest right
    if(slidePositionX < -slideItemWidth){
        elem.classList.add('last-position');
        sliding = true;
        elem.style.opacity = '0';
        elem.style.transform = 'translateX('+ (slidePositionX + (slideItemWidth * slideItemArr.length)) +'px)';
        // Find furthest right item and move furthest left
    } else if(slidePositionX > -slideItemWidth + (slideItemWidth * (slideItemArr.length - 1))){
        elem.classList.add('first-position');
        sliding = true;
        elem.style.opacity = '0';
        elem.style.transform = 'translateX('+ -slideItemWidth +'px)';
    }
};

function prevItem(){
    if(!sliding){
        sliding = true;
        for(var i=0; i<slideItemArr.length; i++){
            var slideTransformPosition = slideItemArr[i].getBoundingClientRect();
            var slidePositionX = slideTransformPosition.x;
            slideItemArr[i].style.transform = 'translateX('+ (slidePositionX + slideItemWidth) +'px)';
        }
    }
}

function nextItem(){
    if(!sliding) {
        sliding = true;
        for (var i = 0; i < slideItemArr.length; i++) {
            var slideTransformPosition = slideItemArr[i].getBoundingClientRect();
            var slidePositionX = slideTransformPosition.x;
            slideItemArr[i].style.transform = 'translateX(' + (slidePositionX - slideItemWidth) + 'px)';
        }
    }
}

function handleTouchStart(evt) {
    // console.log(evt);
    xStart = evt.pageX || evt.touches[0].clientX;
    /* starting horizontal position of swipe */
    yStart = evt.pageY || evt.touches[0].clientY;
    /* starting vertical postion of swipe */
}

function handleTouchMove(evt) {
    evt.preventDefault();
    if (!xStart || !yStart) {
        return;
    }

    var xEnd = evt.pageX || evt.touches[0].clientX;
    /* ending horizontal position of swipe */
    var yEnd = evt.pageY || evt.touches[0].clientY;
    /* ending vertical position of swipe */

    var horizontalSwipeDistance = Math.abs(xStart - xEnd);
    var verticalSwipeDistance = Math.abs(yStart - yEnd);

    var horizontalSwipe = horizontalSwipeDistance > verticalSwipeDistance;
    /*most significant*/
    var swipeLeft = xStart > xEnd;
    var swipeDown = yStart < yEnd;

    if (horizontalSwipe) {
        if (swipeLeft) {
            nextItem();
        } else {
            prevItem();
        }
    }

    /* reset values */
    xStart = null;
    yStart = null;
}
