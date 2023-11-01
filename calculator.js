const displayFirstRow = document.querySelector("#firstRow");
const displaySecondRow = document.querySelector("#secondRow");
const buttonsNumbers = document.querySelectorAll(".numbers")
const buttonMath = document.querySelectorAll(".math")
const buttonClear = document.querySelector(".controls-btnClear")
const buttonDelete = document.querySelector(".controls-btnDelete")
let text

function initialSetup() {
    displayFirstRow.textContent = "0";
}

buttonClear.addEventListener('click', () =>{
    displayFirstRow.textContent = "0";
    displaySecondRow.textContent = "";
    text = 0;
})

buttonDelete.addEventListener('click', () =>{

    let string = DomToText(displayFirstRow.innerHTML);

    string = string.slice(0, string.length-1);
    text = string;

    string === "" ?  displayFirstRow.textContent = "0" :  displayFirstRow.textContent = string;
})

function DomToText(string) {
    let start = -1, end = -1;

    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let i = 0; i < string.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
            if (string[i].toString() === numbers[j].toString() && start === -1) start = i;

            if (string[i].toString() === numbers[j].toString()) end = i + 1;
        }
    }
    return string.slice(start, end);
}

function FindSymbol(string) {
    let symbols = ["÷", "*", "-", "+"]
    let symbol;

    for (let i = 0; i < string.length; i++) {
        for (let j = 0; j < symbols.length; j++) {
            if (string[i].toString() === symbols[j].toString()) {
                symbol = string[i];
                break;
            }
        }
    }

    return symbol;
}

buttonsNumbers.forEach((item) => {
    item.addEventListener('click', () => {

        text = document.querySelector("#firstRow").outerHTML;
        text = DomToText(text);
        if (text === "0") displayFirstRow.textContent = `${item.id}`;
        else if (text.length <= 21) {
            displayFirstRow.textContent += item.id;
            text = displayFirstRow.textContent;
        } else alert("Max length is 21");


    })
})

function Math(numberOne, numberTwo, operator) {

    switch (operator) {
        case "*":
            return numberOne * numberTwo;
        case "÷":
            return (numberOne / numberTwo).toFixed(2);
        case "-":
            return numberOne - numberTwo;

        case "+":
            return numberOne + numberTwo;
    }

}


buttonMath.forEach((item) => {
    item.addEventListener('click', () => {

        let result;

        switch (item.id) {
            case "*":
                text = DomToText(displayFirstRow.textContent);
                displaySecondRow.textContent = text + " *";
                displayFirstRow.textContent = "0";
                break;
            case "÷":
                text = DomToText(displayFirstRow.textContent);
                displaySecondRow.textContent = text + " ÷";
                displayFirstRow.textContent = "0";
                break;
            case "-":
                text = DomToText(displayFirstRow.textContent);
                displaySecondRow.textContent = text + " -";
                displayFirstRow.textContent = "0";
                break;
            case "+":
                text = DomToText(displayFirstRow.textContent);
                displaySecondRow.textContent = text + " +";
                displayFirstRow.textContent = "0";
                break;
            case "=":

                let first = document.querySelector("#firstRow").outerHTML;
                let second = document.querySelector("#secondRow").outerHTML;

                if (DomToText(second) === "" && DomToText(first) !== "") {
                    result = Math(parseFloat(DomToText(first)), 0, "+");
                }
                else if((DomToText(second) !== "" && DomToText(first) !== "" && !FindSymbol(document.querySelector("#secondRow").outerHTML))){
                    result = Math(parseFloat(DomToText(first)), 0, "+");
                }
                else result = Math(parseFloat(DomToText(second)), parseFloat(DomToText(first)), FindSymbol(document.querySelector("#secondRow").outerHTML));

                displaySecondRow.textContent = result;
                displayFirstRow.textContent = "0";
                text = displaySecondRow.textContent;
                break;

            case ".":
                break;
        }

    })
})


initialSetup();