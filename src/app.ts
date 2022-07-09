const inputs = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>;

const hInputs = document.querySelectorAll('.time-code-h-input') as NodeListOf<HTMLInputElement>
const mInputs = document.querySelectorAll('.time-code-m-input') as NodeListOf<HTMLInputElement>
const sInputs = document.querySelectorAll('.time-code-s-input') as NodeListOf<HTMLInputElement>
const imgInputs = document.querySelectorAll('.time-code-i-input') as NodeListOf<HTMLInputElement>;

const rate = document.querySelector('#rate') as HTMLInputElement;
const calculateBtn = document.querySelector('.calculate-btn') as HTMLButtonElement;
const items = document.querySelectorAll('.time-code-item') as NodeListOf<HTMLDivElement>
const resultDisplay = document.querySelector('.result') as HTMLParagraphElement;

let rateValue : number;
rateValue = 24;

inputs.forEach((input: HTMLInputElement) => {
    setPlaceHolder(input);
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

// CALCULATE FUNCTION
