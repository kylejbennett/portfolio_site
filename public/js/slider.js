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
