let order = [];
let clickedOrder = []
let score = 0;

// 0 = verde
// 1 = vermelho
// 2 = amarelo
// 3 = azul

const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");
const btn = document.querySelector(".btn");

const startSound = new Audio("../assets/start.wav");
const gameoverSound = new Audio("../assets/gameover2.wav");
const backgroundSound = new Audio("../assets/musicaDeFundo.wav");

let shufferOder = () => {
    backgroundSound.volume = 0.2;
    backgroundSound.play();
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    colorOrder = [];

    for(let i in order){
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

// acende o próxima cor
let lightColor = (element, number) => {
    number = number * 500;

    setTimeout(() => {
        element.classList.add("selected");
    }, number - 250);

    setTimeout(() => {
        element.classList.remove("selected");
    }, number);
}

// checa se os botões clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for (let i in clickedOrder){
        if(clickedOrder[i] != order[i]){
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length){
        nextLevel();
    }
}

// função para o click do usuário
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add("selected");

    setTimeout(() => {
        createColorElement(color).classList.remove("selected");    
        checkOrder();
    }, 250);
}

// função que retornar a cor 
let createColorElement = (color) =>{
    if(color == 0){
        return green;
    }else if(color == 1){
        return red;
    }else if(color == 2){
        return yellow;
    }else if(color == 3){
        return blue;
    }
}

let nextLevel = () => {
    score++;
    shufferOder();
}

let gameOver = () => {
    gameoverSound.play();
    alert(`Pontuação: ${score}\nVocê perdeu o jogo! Clique em OK para iniciar um novo jogo!`);
    order = [];
    clickedOrder = [];
}

let playGame = () => {
    startSound.play();  
    alert("Bem vindo ao jogo!");
    score = 0;
    nextLevel();
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

btn.onclick = () => playGame();
