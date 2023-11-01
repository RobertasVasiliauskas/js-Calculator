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

function DomToText(text) {
    let start = -1, end = -1;

    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let i = 0; i < text.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
            if (text[i].toString() === numbers[j].toString() && start === -1) start = i;

            if (text[i].toString() === numbers[j].toString()) end = i + 1;
        }
    }
    return text.slice(start, end);
}

function FindSymbol(text) {
    let symbols = ["÷", "*", "-", "+"]
    let symbol;

    for (let i = 0; i < text.length; i++) {
        for (let j = 0; j < symbols.length; j++) {
            if (text[i].toString() === symbols[j].toString()) {
                symbol = text[i];
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
                displaySecondRow.textContent = text + " *";
                displayFirstRow.textContent = "0";
                break;
            case "÷":
                displaySecondRow.textContent = text + " ÷";
                displayFirstRow.textContent = "0";
                break;
            case "-":
                displaySecondRow.textContent = text + " -";
                displayFirstRow.textContent = "0";
                break;
            case "+":
                displaySecondRow.textContent = text + " +";
                displayFirstRow.textContent = "0";
                break;
            case "=":

                let first = document.querySelector("#firstRow").outerHTML;
                let second = document.querySelector("#secondRow").outerHTML;

                result = Math(parseFloat(DomToText(second)), parseFloat(DomToText(first)), FindSymbol(document.querySelector("#secondRow").outerHTML));

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