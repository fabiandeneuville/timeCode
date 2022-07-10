const itemsContainer = document.querySelector('.time-code-items-container') as HTMLDivElement;

const inputs = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>;

const hInputs = document.querySelectorAll('.time-code-h-input') as NodeListOf<HTMLInputElement>
const mInputs = document.querySelectorAll('.time-code-m-input') as NodeListOf<HTMLInputElement>
const sInputs = document.querySelectorAll('.time-code-s-input') as NodeListOf<HTMLInputElement>
const imgInputs = document.querySelectorAll('.time-code-i-input') as NodeListOf<HTMLInputElement>;

const rate = document.querySelector('#rate') as HTMLInputElement;

const addBtn = document.querySelector('.add-btn') as HTMLButtonElement;
const calculateBtn = document.querySelector('.calculate-btn') as HTMLButtonElement;
const clearBtn = document.querySelector('.clear-btn') as HTMLButtonElement;

const items = document.querySelectorAll('.time-code-item') as NodeListOf<HTMLDivElement>
const resultDisplay = document.querySelector('.result') as HTMLParagraphElement;

let rateValue : number;
rateValue = 24;

inputs.forEach((input: HTMLInputElement) => {
    setPlaceHolder(input);
    setDefaultValue(input);
})

hInputs.forEach((input: HTMLInputElement) => setMinMax(input, 0, 24));
mInputs.forEach((input: HTMLInputElement) => setMinMax(input, 0, 60));
sInputs.forEach((input: HTMLInputElement) => setMinMax(input, 0, 60));
imgInputs.forEach((input: HTMLInputElement) => setMinMax(input, 0, rateValue));

rate.addEventListener("change", () => {
    rateValue = parseInt(rate.value);
    imgInputs.forEach((input: HTMLInputElement) => {
        changeMax(input)
    })
})

// ATTRIBUTES (placeholder, min, max) SETTING FUNCTIONS

function setPlaceHolder(input : HTMLInputElement){
    input.setAttribute("placeholder", "00")
};

function setMinMax(input: HTMLInputElement, min : number, max: number){
    input.setAttribute("min", `${min}`);
    input.setAttribute("max", `${max}`)
}

function changeMax(input: HTMLInputElement){
    input.setAttribute("max", `${rateValue}`);
}

function setDefaultValue(input : HTMLInputElement){
    input.value = "0";
};

// CLEAR FUNCTION

clearBtn.addEventListener('click', clearFields);

function clearFields(){
    inputs.forEach((input) => input.value = "");
    resultDisplay.textContent = "00:00:00:00";
}

// CALCULATE FUNCTION

function calculate(){
    let resultH : string, resultM : string, resultS : string, resultI : string;

    let tempResultH : number = 0, tempResultM : number = 0, tempResultS : number = 0, tempResultI : number = 0;

    imgInputs.forEach((input : HTMLInputElement) => tempResultI += parseInt(input.value));
    sInputs.forEach((input : HTMLInputElement) => tempResultS += parseInt(input.value));
    mInputs.forEach((input : HTMLInputElement) => tempResultM += parseInt(input.value));
    hInputs.forEach((input : HTMLInputElement) => tempResultH += parseInt(input.value));

    if(tempResultI >= rateValue){
        tempResultI = tempResultI - rateValue;
        tempResultS += 1;
    }
    if(tempResultS >= 60){
        tempResultS = tempResultS - 60;
        tempResultM + 1;
    }
    if(tempResultM >= 60){
        tempResultM = tempResultM - 60;
        tempResultH + 1;
    }

    resultH = renderResult(tempResultH);
    resultM = renderResult(tempResultM);
    resultS = renderResult(tempResultS);
    resultI = renderResult(tempResultI);

    resultDisplay.textContent = `${resultH}:${resultM}:${resultS}:${resultI}`

};

calculateBtn.addEventListener('click', calculate);

function renderResult(value: number){
    if(value >= 10){
        let stringifiedValue = value.toString();
        return stringifiedValue;
    } else {
        let stringifiedValue = "0" + value.toString();
        return stringifiedValue;
    }
}

// ERRORS HANDLING

