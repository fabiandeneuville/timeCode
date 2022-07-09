"use strict";
const inputs = document.querySelectorAll('input');
const hInputs = document.querySelectorAll('.time-code-h-input');
const mInputs = document.querySelectorAll('.time-code-m-input');
const sInputs = document.querySelectorAll('.time-code-s-input');
const imgInputs = document.querySelectorAll('.time-code-i-input');
const rate = document.querySelector('#rate');
const calculateBtn = document.querySelector('.calculate-btn');
const items = document.querySelectorAll('.time-code-item');
const resultDisplay = document.querySelector('.result');
let rateValue;
rateValue = 24;
inputs.forEach((input) => {
    setPlaceHolder(input);
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
// CALCULATE FUNCTION
