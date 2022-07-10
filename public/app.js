"use strict";
const itemsContainer = document.querySelector('.time-code-items-container');
const inputs = document.querySelectorAll('input');
const hInputs = document.querySelectorAll('.time-code-h-input');
const mInputs = document.querySelectorAll('.time-code-m-input');
const sInputs = document.querySelectorAll('.time-code-s-input');
const imgInputs = document.querySelectorAll('.time-code-i-input');
const rate = document.querySelector('#rate');
const addBtn = document.querySelector('.add-btn');
const calculateBtn = document.querySelector('.calculate-btn');
const clearBtn = document.querySelector('.clear-btn');
const items = document.querySelectorAll('.time-code-item');
const resultDisplay = document.querySelector('.result');
let rateValue;
rateValue = 24;
inputs.forEach((input) => {
    setPlaceHolder(input);
    setDefaultValue(input);
});
hInputs.forEach((input) => setMinMax(input, 0, 24));
mInputs.forEach((input) => setMinMax(input, 0, 60));
sInputs.forEach((input) => setMinMax(input, 0, 60));
imgInputs.forEach((input) => setMinMax(input, 0, rateValue));
rate.addEventListener("change", () => {
    rateValue = parseInt(rate.value);
    imgInputs.forEach((input) => {
        changeMax(input);
    });
});
// ATTRIBUTES (placeholder, min, max) SETTING FUNCTIONS
function setPlaceHolder(input) {
    input.setAttribute("placeholder", "00");
}
;
function setMinMax(input, min, max) {
    input.setAttribute("min", `${min}`);
    input.setAttribute("max", `${max}`);
}
function changeMax(input) {
    input.setAttribute("max", `${rateValue}`);
}
function setDefaultValue(input) {
    input.value = "0";
}
;
// CLEAR FUNCTION
clearBtn.addEventListener('click', clearFields);
function clearFields() {
    inputs.forEach((input) => input.value = "0");
    resultDisplay.textContent = "00:00:00:00";
}
// CALCULATE FUNCTION
function calculate() {
    let resultH, resultM, resultS, resultI;
    let tempResultH = 0, tempResultM = 0, tempResultS = 0, tempResultI = 0;
    imgInputs.forEach((input) => tempResultI += parseInt(input.value));
    sInputs.forEach((input) => tempResultS += parseInt(input.value));
    mInputs.forEach((input) => tempResultM += parseInt(input.value));
    hInputs.forEach((input) => tempResultH += parseInt(input.value));
    if (tempResultI >= rateValue) {
        tempResultI = tempResultI - rateValue;
        if (tempResultI >= rateValue) {
            tempResultI = tempResultI - rateValue;
            tempResultS += 2;
        }
        else {
            tempResultS += 1;
        }
    }
    if (tempResultS >= 60) {
        tempResultS = tempResultS - 60;
        if (tempResultS >= 60) {
            tempResultS = tempResultS - 60;
            tempResultM += 2;
        }
        else {
            tempResultM += 1;
        }
    }
    if (tempResultM >= 60) {
        tempResultM = tempResultM - 60;
        if (tempResultM >= 60) {
            tempResultM = tempResultM - 60;
            tempResultH += 2;
        }
        else {
            tempResultH += 1;
        }
    }
    resultH = renderResult(tempResultH);
    resultM = renderResult(tempResultM);
    resultS = renderResult(tempResultS);
    resultI = renderResult(tempResultI);
    resultDisplay.textContent = `${resultH}:${resultM}:${resultS}:${resultI}`;
}
;
calculateBtn.addEventListener('click', calculate);
function renderResult(value) {
    if (value >= 10) {
        let stringifiedValue = value.toString();
        return stringifiedValue;
    }
    else {
        let stringifiedValue = "0" + value.toString();
        return stringifiedValue;
    }
}
// ERRORS HANDLING
