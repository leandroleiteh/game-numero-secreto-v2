
let listOfDrawnNumbers = [];
let numberLimit = 2;
let attempts = 1;

showMessageStart();

const runRandomNumber = () => {
    let number = parseInt(Math.floor(Math.random() * numberLimit) + 1);

    let listOfDrawnNumbersSize = listOfDrawnNumbers.length;

    if (listOfDrawnNumbersSize === numberLimit) {
        listOfDrawnNumbers = [];
    }

    if (listOfDrawnNumbers.includes(number)) {
        return runRandomNumber();
    } else {
        listOfDrawnNumbers.push(number);
        console.log(listOfDrawnNumbers);
        return number;
    }
}

let numberSecret = runRandomNumber();

function showMessageStart() {
    showInDisplay("h1", "Jogo do Número Secreto");
    showInDisplay("p", "Chute um número entre 1 e " + numberLimit);
}

function showInDisplay(tag, text) {
    let element = document.querySelector(tag);
    element.innerHTML = text;
    responsiveVoice.speak(text, "Brazilian Portuguese Female", { rate: 1.1 });
}

function verifyKick() {
    let kick = parseInt(document.querySelector("input").value);

    let wordAttempt = attempts > 1 ? "tentativas" : "tentativa";

    if (kick === numberSecret) {
        showInDisplay("h1", "Parabéns! Você acertou!");
        showInDisplay("p", "Você é bom no Jogo! Acertou em " + attempts + " " + wordAttempt + "!");
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        clearField();
        showInDisplay("h1", "Errou! Tente novamente!");
        displaySecretTips(kick, numberSecret);
        attempts++;
    }
}

function displaySecretTips(a, b) {
    if (a > b) {
        showInDisplay("p", "O número secreto é menor que " + a);
    } else {
        showInDisplay("p", "O número secreto é maior que " + a);
    }
}

function clearField() {
    document.querySelector("input").value = "";
}

function reset() {
    numberSecret = runRandomNumber();
    clearField();
    attempts = 1;
    showMessageStart();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}
