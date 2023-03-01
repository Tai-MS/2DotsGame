var markBegined = false;
var adyacentes = [];
var idMarcados = [];
var panelSize;
var classMark;
var idInterval;

function fillUserForm(){
    document.getElementById("nick").value = nick;
    document.getElementById("gameAvatar").src = gameAvatar;
    panelSize = parseInt(size);
}


function getRandomInt(max){
    return Math.floor(Math.random() * max);
}

function gameGenerate(){
    document.getElementById("juego").style.gridTemplateColumns = "repeat("+size+", 1fr)";
    document.getElementById("juego").style.gridTemplateRows = "repeat("+size+", 1fr)";
    // let container = document.getElementById("juego");
    // for(i = 1; i <= size**2; i++){
    //     let div = document.createElement('div');
    //     let sDiv = document.createElement('div');
    //     div.classList.add('containerItem');
    //     sDiv.classList.add('item rojo');
    //     container.appendChild(div);
    //     div.appendChild(sDiv)
    // };
    let items = "";
    let colors = ["red", "green"];
    let randomColor =0;
    for(let index = 0; index < (parseInt(size)*parseInt(size)); index++){
        if(index % 2 > 0){
            randomColor = getRandomInt(2);
        }
        items += `<div class="containerItem"><div id="${index}" class="item ${colors[randomColor]}"></div></div>`;
    }
    document.getElementById("juego").innerHTML = items;
}

function calcularAdyacentes(markedId){
    adyacentes = [];
    //Adayacente superior
    if((markedId - panelSize) >= 0){
        adyacentes.push(markedId - panelSize);
    }
    //Adyacente inferior
    if((markedId + panelSize) < panelSize**2){
        adyacentes.push(markedId + panelSize);
    }
    //Adyacente irzquierda
    if(markedId % panelSize > 0){
        adyacentes.push(markedId - 1);
    }
    //Adyacente derecha
    if((markedId + 1) % panelSize > 0){
        adyacentes.push(markedId + 1);
    }

    for(let index = 0; index < adyacentes.length; index++){
        console.log(adyacentes[index]);
    }
}

function cuentaAtras(){
    const time = document.getElementById("tmpo");

    if(time.value > 0){
        time.value -= 1;
    }
    else{
        time.value = 0;
        const allItems = document.getElementsByClassName(`item`);
        for(let item of allItems){
            item.removeEventListener(`mousedown`, beginMark);
            item.removeEventListener("mouseover", continueMark);
        }
        document.removeEventListener("mouseup", endMark);

        document.getElementById("juegoAcabado").classList.add("juegoAcabadoColor");

        document.getElementById("juegoAcabado").style.zIndex = "2"; 
        document.getElementById("juego").style.zIndex = "1";   
        document.getElementById("nuevaPartida").addEventListener("click", (e) => location.reload());
    }
}

/* 
*Add events to the game
*/
function gameEvents(){
    const allItems = document.getElementsByClassName(`item`);
    for(let item of allItems){
        item.addEventListener(`mousedown`, beginMark);
        item.addEventListener("mouseover", continueMark);
        
    }
    document.addEventListener("mouseup", endMark);

    idInterval = setInterval(cuentaAtras, 1000);
}



/*Game functions*/ 
/**
 * desc
 * @date 2023-02-27
 * Start the mark of dots
 * @param { * } event
 */
function beginMark(event){
    let item = event.target;
    let itemContainer = event.target.parentElement;
    if(item.classList.contains(`red`)){
        classMark = `red`;
        itemContainer.classList.add(`red`);
    }
    else{
        classMark = `green`;
        itemContainer.classList.add(`green`);
    }
    if(!markBegined){
        markBegined = true;
    }
    
    idMarcados.push(parseInt(item.id));

    calcularAdyacentes(parseInt(item.id));
    
    console.log("Marked a dot");
}

function continueMark(event){
    console.log("marking dots");
    if(markBegined){
        let item = event.target;
        let newId = parseInt(item.id);

        if(adyacentes.includes(newId) && item.classList.contains(classMark)){
            let itemContainer = event.target.parentElement;
            
            if(item.classList.contains(`red`)){
                itemContainer.classList.add(`red`);
            }
            else{
                itemContainer.classList.add(`green`);
            }

            idMarcados.push(parseInt(item.id));

            calcularAdyacentes(parseInt(item.id));
        }
  
    }
    
}

function endMark(event){
    markBegined = false;  
    adyacentes = [];

    const score = document.getElementById("puntuacion");
    if(idMarcados.length > 1){
        score.value = parseInt(score.value) + idMarcados.length;
    }
    for (let index = 0; index < idMarcados.length; index++) {
        //Capturar el objeto
        let itemMarcado=document.getElementById(idMarcados[index]);
        itemMarcado.parentElement.classList.remove(classMark);
        if(itemMarcado.classList.length > 1){
           itemMarcado.classList.remove(classMark); 
        }
        else {
            itemMarcado.className = '';
        }
        
        //Cambiar el color de los objetos de forma rnd
        let color=["red","green"];
        let colorRnd=getRandomInt(2);
        itemMarcado.classList.remove(classMark);
        itemMarcado.classList.add(color[colorRnd]);
    }
    idMarcados = [];
}





//User data capture
getUserData();
//Check data
if(!dataCheck()){
    location = "index.html";
}
//Fill form
fillUserForm()
//Generate the game panel
gameGenerate()
gameEvents();


