window.onload = function(){
    setTimeout(function (){
        nameDrop('KYLE BENNETT');
    }, 1000);

    var windowWidth = document.body.clientWidth;
    document.querySelector('nav').style.transform += 'translateX('+ windowWidth +'px)';
};

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
            },Math.floor(Math.random() * 150) + 50);
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
    nav.style.display = 'block';

    setTimeout(function(){
        document.querySelector('#info-container button').style.display = 'block';
    }, 1500);

    setTimeout(function(){
        var windowWidth = document.body.clientWidth;
        nav.style.transform += 'translateX(-'+ windowWidth +'px)';
    }, 2250);
}

function toggleMobileMenu(elem){
    var windowWidth = document.body.clientWidth;
    var nav = document.querySelector('nav');

    if(elem.classList.contains('icon-closed')){
        elem.className = 'material-icons icon-open';
        nav.style.transform += 'translateX('+ windowWidth +'px)';
    } else {
        elem.className = 'material-icons icon-closed';
        nav.style.transform += 'translateX(15rem)';
    }
}

function handleMenuState(elem){
    var menuIcon = document.querySelector('.mobile-menu i');

    if(elem.classList.contains('nav-open') && menuIcon.classList.contains('icon-open')){
        return;
    } else if(elem.className === "" && menuIcon.classList.contains('icon-closed')){
        return;
    } else if(menuIcon.classList.contains('icon-open')){
        menuIcon.innerHTML = 'close';
        elem.className = 'nav-open';
        elem.style.transform += 'translateX(-15rem)';
    } else if(menuIcon.classList.contains('icon-closed')){
        menuIcon.innerHTML = 'menu';
        elem.className = '';
        var windowWidth = document.body.clientWidth;
        elem.style.transform += 'translateX(-'+ windowWidth +'px)';
    }
}
