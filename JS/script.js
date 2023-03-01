var nickInput;
var select;
var logIn;
var error;
var avatarItems;
var itemImg;
var avatarContainer;


/**
 * desc
 * @date 2023-02-23
 * @param {EventObject} event
 */
function checkForm(event){
    if(nickInput.value.match(/(?<!\S)[0-9]/)){
        nickInput.focus();
        event.preventDefault();
        error.innerText = "The name must begin with a letter"
        return false;
    }
    else if(select.value == "0"){
        select.focus();
        event.preventDefault();
        error.innerText = "Select a Size"
        return false;
    }

    userData(nickInput, select,avatarContainer)
    userHistory(nickInput);
    return true;
}

function movingImg(event){
    itemImg = event.target;
    console.log(itemImg.src);
}

function changeImg(event){
    avatarContainer.src = itemImg.src;
}

/**
 * desc
 * @date 2023-02-23
 * Load DOM objects, verifications and form events
 */
function loadedDom(){
    nickInput = document.getElementById("nick");
    select = document.getElementById("size");
    logIn = document.getElementById("log-in");
    error = document.getElementById("error");

    if(sessionStorage.getItem('error') != null){
        error.innerText = sessionStorage.getItem("error");
        sessionStorage.removeItem("error");
    }

    logIn.addEventListener("submit", checkForm);


    avatarItems = document.getElementsByClassName("avatarImgItem");
    for(let item of avatarItems){
        item.addEventListener("dragstart", movingImg);
    }

    avatarContainer = document.getElementById("avatarImg");
    avatarContainer.addEventListener("dragover", e => {
        e.preventDefault()
    })
    avatarContainer.addEventListener("drop", changeImg);
}

document.addEventListener("DOMContentLoaded", loadedDom);
geolocationData();