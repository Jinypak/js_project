interface HTMLElement {
    classList: DOMTokenList;
}

interface HTMLAnchorElement {
    addEventListener(type: string, listener: (e: Event) => void, options?: boolean | AddEventListenerOptions): void;
}

interface HTMLButtonElement {
    addEventListener(type: string, listener: (e: Event) => void, options?: boolean | AddEventListenerOptions): void;
}

const startBtn: HTMLButtonElement = document.querySelector("#startBtn");
const endBtn: HTMLButtonElement = document.querySelector("#endBtn");
const prevNext: HTMLButtonElement[] = document.querySelectorAll(".prevNext");
const numbers: HTMLAnchorElement[] = document.querySelectorAll(".link");

let currentStep: number = 0;

const updateBtn = () => {
    if (currentStep === 4) {
        endBtn.disabled = true;
        prevNext[1].disabled = true;
    } else if (currentStep === 0) {
        startBtn.disabled = true;
        prevNext[0].disabled = true;
    } else {
        endBtn.disabled = false;
        prevNext[1].disabled = false;
        startBtn.disabled = false;
        prevNext[0].disabled = false;
    }
};

numbers.forEach((number, numIndex) => {
    number.addEventListener("click", (e) => {
        e.preventDefault();
        currentStep = numIndex;
        document.querySelector(".active").classList.remove("active");
        number.classList.add("active");
        updateBtn();
    });
});

prevNext.forEach((button) => {
    button.addEventListener("click", (e) => {
        currentStep += e.target.id === "next" ? 1 : -1;
        numbers.forEach((number, numIndex) => {
            number.classList.toggle("active", numIndex === currentStep);
            updateBtn();
        });
    });
});

startBtn.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    numbers[0].classList.add("active");
    currentStep = 0;
    updateBtn();
    endBtn.disabled = false;
    prevNext[1].disabled = false;
});

endBtn.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    numbers[4].classList.add("active");
    currentStep = 4;
    updateBtn();
    startBtn.disabled = false;
    prevNext[0].disabled = false;
});
