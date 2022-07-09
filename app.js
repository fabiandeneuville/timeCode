"use strict";
const inputs = document.querySelectorAll('input');
const imgRateInputs = document.querySelectorAll('.time-code-i-input');
const rate = document.querySelector('#rate');
const calculateBtn = document.querySelector('.calculate-btn');
const items = document.querySelectorAll('.time-code-item');
const resultDisplay = document.querySelector('.result');
let rateValue;
rateValue = 24;
inputs.forEach((input) => {
    setPlaceHolder(input);
});
imgRateInputs.forEach((input) => {
    setMinMax(input);
});
rate.addEventListener("change", () => {
    rateValue = parseInt(rate.value);
    imgRateInputs.forEach((input) => {
        changeMax(input);
    });
});
// ATTRIBUTES SETING FUNCTIONS
function setPlaceHolder(input) {
    input.setAttribute("placeholder", "00");
}
;
function setMinMax(input) {
    input.setAttribute("min", "0");
    input.setAttribute("max", `${rateValue}`);
}
function changeMax(input) {
    input.setAttribute("max", `${rateValue}`);
}
// CALCULATE FUNCTION
function calculate(items) {
    let tempResultH, tempResultM, tempResultS, tempResultI;
    tempResultH = 0;
    tempResultM = 0;
    tempResultS = 0;
    tempResultI = 0;
    let resultH, resultM, resultS, resultI;
    items.forEach((item) => {
        let errorMsg = item.querySelector('.error-msg');
        let hoursInput = item.querySelector('.time-code-h-input');
        let minutesInput = item.querySelector('.time-code-m-input');
        let secondsInput = item.querySelector('.time-code-s-input');
        let imagesInput = item.querySelector('.time-code-i-input');
        let tempH, tempM, tempS, tempI;
        if (parseInt(hoursInput.value) < 0 || parseInt(hoursInput.value) > 24 || parseInt(minutesInput.value) < 0 || parseInt(minutesInput.value) > 60 || parseInt(secondsInput.value) < 0 || parseInt(secondsInput.value) > 60 || parseInt(imagesInput.value) < 0 || parseInt(imagesInput.value) > rateValue) {
            errorMsg.textContent = "Please set a valid value !";
        }
        else {
            errorMsg.textContent = "";
            tempH = parseInt(hoursInput.value) | 0;
            tempM = parseInt(minutesInput.value) | 0;
            tempS = parseInt(secondsInput.value) | 0;
            tempI = parseInt(imagesInput.value) | 0;
            tempResultH += tempH;
            tempResultM += tempM;
            tempResultS += tempS;
            tempResultI += tempI;
        }
    });
    if (tempResultI < 10) {
        resultI = "0" + tempResultI;
    }
    else if (tempResultI >= rateValue) {
        tempResultS += 1;
        tempResultI = tempResultI - rateValue;
        resultI = "0" + tempResultI.toString();
    }
    else {
        resultI = tempResultI.toString();
    }
    if (tempResultS < 10) {
        resultS = "0" + tempResultS;
    }
    else if (tempResultS >= 60) {
        tempResultM += 1;
        tempResultS = tempResultS - 60;
        resultS = "0" + tempResultS.toString();
    }
    else {
        resultS = tempResultS.toString();
    }
    if (tempResultM < 10) {
        resultM = "0" + tempResultM;
    }
    else if (tempResultM >= 60) {
        tempResultH += 1;
        tempResultM = tempResultM - 60;
        resultM = "0" + tempResultM.toString();
    }
    else {
        resultM = tempResultM.toString();
    }
    if (tempResultH < 10) {
        resultH = "0" + tempResultH;
    }
    else {
        resultH = tempResultH.toString();
    }
    if (Number(resultH) > 24) {
        resultDisplay.textContent = 'Limit reached for hours value !';
    }
    else {
        resultDisplay.textContent = `${resultH}:${resultM}:${resultS}:${resultI}`;
    }
}
calculateBtn.addEventListener('click', () => {
    calculate(items);
});
