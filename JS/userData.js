/*
*User data management JS
*@author Taiel Sagretti <taiels94@gmail.com>
*@link https://github.com/Tai-MS GitHub
*/

var nick;
var size;
var geolocationTxt;
var gameAvatar;

/**
 * desc
 * @date 2023-02-23
 * @param {HTMLElement} nick user name
 * @param {HTMLElement} size avatar size
 */
function userData(nick, size, avatarContainer){
    sessionStorage.setItem('nick', nick.value);
    sessionStorage.setItem('size', size.value);
    sessionStorage.setItem('geolocationTxt', geolocationTxt);
    sessionStorage.setItem('gameAvatar', avatarContainer.src);
}

function getUserData(){
    nick = sessionStorage.getItem('nick');
    size = sessionStorage.getItem("size");
    gameAvatar = sessionStorage.getItem("gameAvatar");
}

function dataCheck(){
    if(nick == null){
        sessionStorage.setItem('error',"Complete form needed");
        return false;
    }
    return true;
}

function geolocationData(){
    if(!navigator.geolocation){
        geolocationTxt = "Your browser isn´t compatible with geolocation API";
    }
    else{
        navigator.geolocation.getCurrentPosition(
            (position) => {
                geolocationTxt = "Latitud:" + position.coords.latitude + ", longitud:" + position.coords.longitude;
            },
            () => {
                geolocationTxt = "Can´t complete geolocation";
            }
        )
    }
}

function userHistory(nick){
    let historicalStorage = localStorage.getItem('historical');
    let historical;

    if(historicalStorage == null){
        historical = [];
    }
    else{
        historical =JSON.parse(historicalStorage);
    }

    let userRegister = {
        user: nick.value,
        date: Date.now()
    }
    
    historical.push(userRegister)
    localStorage.setItem('historical', JSON.stringify(historical));
}