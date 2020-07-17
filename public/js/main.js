var windowWidth;

window.onload = function(){
    setTimeout(function (){
        nameDrop('KYLE BENNETT');
    }, 1000);

    windowWidth = document.body.clientWidth;
    document.querySelector('nav').style.transform = 'translateX('+ windowWidth +'px)';

    window.addEventListener("resize", resizeFunction);

    formatSlider();
};

var resizeFunction = function(){
    windowWidth = document.body.clientWidth;
    formatSlider();
}

function nameDrop(name){
    var letterArray = name.split('');
    var i = 0;
    var totalLetters = letterArray.length - 1;

    function dropLetter(){
        var span = document.createElement('span');
        span.innerHTML = letterArray[i];
        document.getElementById('info-name').appendChild(span);
        i++;

        if(i <= totalLetters){
            setTimeout(function(){
                dropLetter();
            },150);
        } else {
            setTimeout(function(){
                typeString('FULL STACK WEB DEVELOPER');
            }, 500);
        }
    }

    dropLetter();
}

function typeString(string){
    var stringArray = string.split('');
    var i = 0;
    var totalLetters = stringArray.length - 1;
    var cursor = document.querySelector('.cursor');
    var cursorRight = (((cursor.offsetWidth)/2) * 0.1).toFixed(2);
    cursor.style.transform += 'translateX('+ cursorRight +'rem)';

    function typeLetter(){
        var span = document.createElement('span');
        span.innerHTML = stringArray[i];
        document.getElementById('info-title').appendChild(span);
        cursor.style.transform += 'translateX('+ cursorRight +'rem)';
        i++;

        if(i <= totalLetters){
            setTimeout(function(){
                typeLetter();
            },Math.floor(Math.random() * 100) + 40);
        } else {
            setTimeout(function(){
                // cursor.parentNode.removeChild(cursor);
            }, 500);
            revealSkills();
        }
    }

    typeLetter();
}

function revealSkills(){
    document.querySelector('#skill-container p').style.opacity = '1';
    var nav = document.querySelector('nav');
    nav.style.transform = 'translateX('+ windowWidth +'px)';

    setTimeout(function(){
        document.querySelector('#info-container button').style.display = 'block';
        nav.style.display = 'block';
    }, 1000);

    setTimeout(function(){
        nav.style.transform = 'translateX(0)';
    }, 1750);
}

function toggleMobileMenu(){
    var menuIcon = document.querySelector('.mobile-menu i');
    var nav = document.querySelector('nav');

    if(menuIcon.classList.contains('icon-closed')){
        menuIcon.className = 'material-icons icon-open';
        nav.style.transform += 'translateX('+ windowWidth +'px)';
    } else {
        menuIcon.className = 'material-icons icon-closed';
        nav.style.transform += 'translateX(15rem)';
    }
}

function handleMenuState(){
    var menuIcon = document.querySelector('.mobile-menu i');
    var nav = document.querySelector('nav');

    if(nav.classList.contains('nav-open') && menuIcon.classList.contains('icon-open')){
        return;
    } else if(nav.className === "" && menuIcon.classList.contains('icon-closed')){
        return;
    } else if(menuIcon.classList.contains('icon-open')){
        menuIcon.innerHTML = 'close';
        nav.className = 'nav-open';
        nav.style.transform += 'translateX(-15rem)';
    } else if(menuIcon.classList.contains('icon-closed')){
        menuIcon.innerHTML = 'menu';
        nav.className = '';
        nav.style.transform += 'translateX(-'+ windowWidth +'px)';
    }
}
