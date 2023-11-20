const inputName = document.querySelector("#name");
const inputNumber = document.querySelector("#number-card");
const inputMonth = document.querySelector("#expiration-month");
const inputYear = document.querySelector("#expiration-year");
const inputCvc = document.querySelector("#cvc");
const cardName = document.querySelector(".card-name");
const cardNumber = document.querySelector(".card-number");
const cardMonth = document.querySelector(".card-expiration-month");
const cardYear = document.querySelector(".card-expiration-year");
const cardCvc = document.querySelector(".back-number");
const formSubmit = document.querySelector("form");
const wrongName = document.querySelector(".wrong-name");
const emptyName = document.querySelector(".empty-name");
const emptyNumber = document.querySelector(".empty-number");
const wrongNumber = document.querySelector(".wrong-number");
const emptyDate = document.querySelector(".empty-date");
const wrongYear = document.querySelector(".wrong-year");
const emptyCvc = document.querySelector(".empty-cvc");
const regexNumber = /^\d{0,4}(\s\d{0,4}){0,3}$/;
const confirmThanks = document.querySelector(".confirm-thanks");
let CurentYear = Number(new Date().getFullYear().toString().slice(-2));
function cc_format(value) {
  let v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  let matches = v.match(/\d{4,16}/g);
  let match = (matches && matches[0]) || "";
  let parts = [];
  for (i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
}
inputName.addEventListener("input", (e) => {
  const regexString = /^[A-z\s]+$/;
  if (!regexString.test(inputName.value)) {
    inputName.value = "";
    wrongName.style.display = "block";
    e.target.classList.add("error");
  } else if (inputName.value.length > 30) {
    inputName.value = inputName.value.slice(0, 30);
  } else {
    emptyName.style.display = "none";
    wrongName.style.display = "none";
    cardName.textContent = e.target.value;
    e.target.classList.remove("error");
  }
});
inputNumber.addEventListener("input", (e) => {
  if (!/^[0-9\s]*$/.test(e.target.value)) {
    e.target.value = e.target.value.replace(/[^0-9\s]/g, "");
    wrongNumber.style.display = "block";
    e.target.classList.add("error");
  } else if (!regexNumber.test(e.target.value)) {
    e.target.value = cc_format(e.target.value);
    cardNumber.textContent = e.target.value;
  } else {
    e.target.classList.remove("error");
    e.target.value = cc_format(e.target.value);
    wrongNumber.style.display = "none";
    emptyNumber.style.display = "none";
  }
});

inputMonth.addEventListener("input", (e) => {
  if (inputMonth.value > 12 || inputMonth.value.length > 2) {
    cardMonth.textContent = 12;
    inputMonth.value = 12;
  } else if (inputMonth.value < 0) {
    cardMonth.textContent = "01";
    inputMonth.value = 1;
  } else if (inputMonth.value.length === 1) {
    cardMonth.textContent = `0${e.target.value}`;
    inputMonth.classList.remove("error");
  } else {
    cardMonth.textContent = e.target.value;
  }
});
inputYear.addEventListener("input", (e) => {
  if (inputYear.value.length > 2) {
    inputYear.value = inputYear.value.slice(0, 2);
  } else if (inputYear.value > CurentYear + 5 || inputYear.value < CurentYear) {
    inputYear.classList.add("error");
    emptyDate.style.visibility = "hidden";
    wrongYear.style.visibility = "visible";
    wrongYear.textContent = `Can be blank & should be between ${CurentYear} - ${
      CurentYear + 5
    }`;
  } else {
    cardYear.textContent = e.target.value;
    inputYear.classList.remove("error");
    emptyDate.style.visibility = "hidden";
    wrongYear.style.visibility = "hidden";
  }
});
inputCvc.addEventListener("input", (e) => {
  if (inputCvc.value.length > 3) {
    inputCvc.value = inputCvc.value.slice(0, 3);
  } else if (inputCvc.value.length < 3) {
    emptyCvc.style.visibility = "visible";
  } else {
    cardCvc.textContent = e.target.value;
    emptyCvc.style.visibility = "hidden";
    e.target.classList.remove("error");
  }
});
formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputName.value.trim() === "") {
    inputName.classList.add("error");
    emptyName.style.display = "block";
  }
  if (inputNumber.value.trim().length !== 19) {
    inputNumber.classList.add("error");
    emptyNumber.style.display = "block";
  }

  if (inputMonth.value.trim() === "" || inputYear.value.trim() === "") {
    emptyDate.style.visibility = "visible";
    inputMonth.classList.add("error");
    inputYear.classList.add("error");
  }

  if (inputCvc.value.trim() === "") {
    inputCvc.classList.add("error");
    emptyCvc.style.visibility = "visible";
  }
  if (
    inputName.value.trim() !== "" &&
    inputNumber.value.trim() !== "" &&
    inputNumber.value.trim().length === 19 &&
    inputMonth.value.trim() !== "" &&
    inputYear.value.trim() !== "" &&
    inputYear.value <= CurentYear + 5 &&
    inputYear.value >= CurentYear &&
    inputCvc.value.trim() !== "" &&
    inputCvc.value.trim().length === 3
  ) {
    formSubmit.classList.add("invisible");
    confirmThanks.classList.add("visible");
  }
});
