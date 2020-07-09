window.onload = function(){
    setTimeout(function (){
        nameDrop('KYLE BENNETT');
    }, 1000);
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
            },200);
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
    cursor.style.transform += 'translateX(1.2rem)';

    function typeLetter(){
        var span = document.createElement('span');
        span.innerHTML = stringArray[i];
        document.getElementById('info-title').appendChild(span);
        cursor.style.transform += 'translateX(1.2rem)';
        i++;

        if(i <= totalLetters){
            setTimeout(function(){
                typeLetter();
            },150);
        } else {
            setTimeout(function(){
                cursor.parentNode.removeChild(cursor);
                revealSkills();
            }, 500);
        }
    }

    typeLetter();
}

function revealSkills(){
    console.log('reveal');
}
