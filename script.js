var cor;
var score = {
    totalScore: 0,
    goalOrNot: 0,
    penultimateScore: 0,
    lastScore: 0,
    goalStreak:3,
    wrongStreak:-1,
};

window.addEventListener('load', function(){
    addDivscolors(6);
    initAll(6);
    hiddenShowBtnDifficult();
    hiddenShowElement(document.getElementById('lbl-tex-difficult'));
})

function initAll(sizeColor){
    putColors(sizeColor);
    cor = setChosenColor(sizeColor);
    addTextColor(cor);
    addEventClickInColors();
    showScore();
}


function addScore(goal){
    if(goal){
        score.wrongStreak=-1;
        if(score.lastScore==score.penultimateScore && score.lastScore>0){
            score.goalStreak++;
            updateScore(score.goalStreak)
        }else{
            updateScore(score.goalStreak)
        }
    }else{
        score.goalStreak=3
        if(score.lastScore==score.penultimateScore && score.lastScore<0){
            score.wrongStreak--;
            updateScore(score.wrongStreak)
        }else{
            updateScore(score.wrongStreak)
        }
    }
    showScore();
}

function showScore(){
    let getScore = document.getElementById('score');
    getScore.innerHTML = "Placar: " + score.totalScore;
}

function updateScore(valor){
    score.penultimateScore = score.lastScore;
    score.lastScore = valor;
    score.totalScore += valor;
    if(score.totalScore<0){
        score.totalScore=0;
    }

}


function addEventClickInColors(){
    let cores = document.getElementsByClassName('ball');
    let positionColor;
    for( positionColor = 0; positionColor < cores.length; positionColor++ ){
        addClickResponseForAnswer( cores[positionColor], cores.length )//Função que adiciona o evento de click
    }
}

function desmarcarCores(){
    let cores = document.getElementsByClassName('ball');
    let positionColor;
    for( positionColor = 0; positionColor < cores.length; positionColor++ ){
        removeClickEventFromCores( cores[positionColor] )
    }
}

function marcarClick(elemento){
    elemento.style.border = "2px solid blue"
}


function removeClickEventFromCores(elemento){
    elemento.style.border = "";
}


function addClickResponseForAnswer(elemento,sizeColor){
    elemento.addEventListener('click', function (){
        if(score.goalOrNot == 0){
            desmarcarCores();
            let colorSelected = returnColorElement(this);
            let resposta = verifyResponse(colorSelected,cor);
            changeTextResponse(resposta,sizeColor)
            marcarClick(this);
        }else{
            alert('Já  Acertou!!! Clique no botão novas cores para continuar')
        }
    })
}

function returnColorElement(elemento){
    return elemento.style.backgroundColor;
}

function verifyResponse(clicado,respostaCerta){
    if(clicado == respostaCerta){
        addScore(true);
        score.goalOrNot = 1;
        return true;
    }else{
        addScore(false);
        return false
    }
}

function restartInicioText(){
    let textResposta = document.getElementById('answer');
    let textColor = document.getElementById('rgb-color');
    textResposta.innerHTML = "";
    textColor.innerHTML = "";
}

function returnInitText(){
    let textResposta = document.getElementById('answer');
    textResposta.innerHTML = "Escolha uma cor";
}

function changeTextResponse( goal,sizeColor ){
    let textResposta = document.getElementById('answer');
    if( goal){
        textResposta.innerHTML = "Acertou! Novas cores!";
    }else{
        textResposta.innerHTML = "Errou! Tente novamente";
    }
}

function addTextColor(textColor){
    let txt = document.getElementById('rgb-color');
    textColor = textColor.substring(3);
    txt.innerText = textColor;
}

function setChosenColor(sizeColor){
    let color = document.getElementById('cor_' + positionColorChosen(sizeColor)).style.backgroundColor;
    return color;
}


function positionColorChosen(sizeColor){
    return Math.floor(Math.random()*sizeColor);
}


function putColors(num){
    let i;
    for( i = 0; i < num; i++ ){
        let divcor = document.getElementById("cor_" + i);
        divcor.style.backgroundColor = "rgb(" + randomColor() + "," + randomColor() + "," + randomColor() + ")";
    }
}

function randomColor(){
    let num;
    num = Math.floor(Math.random() * 255);
    return num;
}

function createElementDivcolor(num){
    let divcolor = document.createElement('div');
    divcolor.className = "ball";
    divcolor.id = "cor_"+num;
    return divcolor;
}

function getFatherDivColors(){
    let divfather = document.getElementsByClassName('boxColor')[0];
    return divfather;
}

function addDivscolors(colorsNumber){
    let i;
    for( i = 0; i < colorsNumber; i++ ){
        getFatherDivColors().appendChild(createElementDivcolor(i))
    }
}


function eventBtnDifficult(btn,num){
    btn.addEventListener('click', function(){
        addDivscolors(num);
        initAll(num);
        hiddenShowBtnDifficult();
        returnInitText();
        hiddenShowElement(document.getElementById('btn-change-difficult'));
        hiddenShowElement(document.getElementById('reset-game'));
    })
}


function addFunctionClickBtnCustomDifficult(){
    let btn = document.getElementsByClassName('btn-difficult')[3];
    btn.addEventListener('click',function (){
        hiddenShowElement(document.getElementById('text-difficult'))
        hiddenShowElement(document.getElementById('lbl-tex-difficult'))
        hiddenShowBtnDifficult();

    })
}
addFunctionClickBtnCustomDifficult();

function addEventlistenerBtnDifficult(){
    let i;
    let number = 1;
    for( i = 0; i < 3; i++ ){
        let btn = document.getElementsByClassName('btn-difficult')[i];
        eventBtnDifficult(btn,number*3);
        number++;
    }
}
addEventlistenerBtnDifficult();

function removeColors(sizeColor){
    let i;
    for( i = 0;i < sizeColor; i++ ){
        getFatherDivColors().removeChild(getFatherDivColors().firstElementChild);
    }
}

function addEventChangeInTextDifficult(){
    let txt = document.getElementById('text-difficult');
    txt.addEventListener('blur',function(){
        if( txt.value == 1 || txt.value > 20 ){
            alert("Numero deve ser entre 1 ou 20")
        }else{
            addDivscolors(txt.value);
            initAll(txt.value);
            hiddenShowElement(txt);
            hiddenShowElement(document.getElementById('lbl-tex-difficult'))
            returnInitText();
            hiddenShowElement(document.getElementById('reset-game'));
            hiddenShowElement(document.getElementById('btn-change-difficult'));
        }
    })
}
addEventChangeInTextDifficult();

function hiddenShowBtnDifficult(){
    let i;
    for( i = 0; i < 4; i++ ){
        hiddenShowElement(document.getElementsByClassName('btn-difficult')[i]);
    }
}

function hiddenShowElement(elemento){
    if(elemento.style.visibility == "hidden"){
        elemento.style.visibility = "visible";
    }else{
        elemento.style.visibility = "hidden";
    }
}

function addEventBtnNewColor(){
    document.getElementById('reset-game').addEventListener('click', function(){
        restartColor();
    })
}
addEventBtnNewColor();

function restartColor(){
    let cores = document.getElementsByClassName('ball');
    let saveSize = cores.length;
    if(cores.length != 0){
        removeColors(cores.length);
        restartInicioText();
        returnInitText();
        addDivscolors(saveSize);
        initAll(saveSize);
        score.goalOrNot = 0;
    }
}

function restartGame(){
    let btnChangeDifficult = document.getElementById('btn-change-difficult');
    let cores = document.getElementsByClassName('ball');
    btnChangeDifficult.addEventListener('click',function (){
        removeColors(cores.length);
        hiddenShowBtnDifficult();
        restartInicioText();
        score.goalOrNot = 0;
        score.totalScore = 0;
        score.penultimateScore=0;
        score.lastScore=0;
        score.goalStreak=3;
        score.wrongStreak=-1;
        showScore();
        hiddenShowElement(btnChangeDifficult);
        hiddenShowElement(document.getElementById('reset-game'));
    })
}
restartGame();