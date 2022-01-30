const cursor = document.querySelector('#dynamic');
const showStr = '오늘의 할 일'
const showArr = showStr.split('');

function typo(temp){
    if(temp.length > 0 ){
        cursor.innerHTML += temp[0];
        setTimeout(() => {
            typo(temp.slice(1));
        }, 180);
    }
}

function blink(){
    cursor.classList.toggle('active');
}

function setText(){
    typo(showArr);
    setInterval(() => {
        cursor.innerHTML=''
        typo(showArr)
    }, 5000);
}

window.addEventListener('focus', () => {
    cursor.innerHTML=showStr;
});

setText();
setInterval(blink, 500);