// CZY ZALOGOWANY
window.onload = function () {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.replace("index.html");
  }
};

/////STRONA/////
let wrapper; // div (ze wszystkim)
let welcomePanel; //panel powitalny
let startButton; // przycisk zaczynamy, do kolejnych kroków
let firstStep; //pierwszy panel na dane
let nameUser; // imię użytkownika
let nameOfFamily; //pobiera nazwę rodziny
let numberOfChildren; // ilość dzieci
let eMail; //mail partnera
let income; //dochód
let incomePartner; // dochód partnera
let buttonFirstStep; //przycisk dalej w pierwszym kroku z danymi
let addChildren; //panel dodawania dziecka
let photoChild; //zdjęcie dziecka przy tworzeniu
let photo; //zdjecie input
let nameOfChild; //imię podane dla dziecka
let birthOfChild; //data urodzenia dziecka
let height; //wzrost dziecka
let weight; //masa ciała
let saveButton; //przycisk zapisz
let textChildren; // tekst przechowujący utwórz profil
let nameFromDataBase; //imie z bazy danych
let formChild; // zawiera formularz z tworzenia profilu

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
  downloadName();
};
///// POBIERANIE IMIENIA /////
const id = localStorage.getItem("identyfikator");

const downloadName = () => {
  const data = new URLSearchParams();
  data.append("id", id);

  const connect = new XMLHttpRequest();
  connect.open("POST", "php/name.php");
  connect.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  connect.onload = function () {
    if (connect.status === 200) {
      nameFromDataBase = connect.responseText;
      changeUserName(nameFromDataBase);
    } else {
      console.log("Wystąpił błąd podczas przesyłania danych.");
    }
  };
  connect.send(data);
};
const prepareDOMElements = () => {
  wrapper = document.querySelector(".wrapper");
  welcomePanel = wrapper.querySelector(".welcome_panel");
  startButton = welcomePanel.querySelector(".button button");
  firstStep = document.querySelector(".first_step");
  nameUser = firstStep.querySelector(".header .hello .name");
  buttonFirstStep = firstStep.querySelector(".form form button");
  nameOfFamily = firstStep.querySelector(".form form .name_family input");
  numberOfChildren = firstStep.querySelector(
    ".form form .number_children select"
  );
  eMail = firstStep.querySelector(".form form .partner_email input");
  income = firstStep.querySelector(".form form .income input");
  incomePartner = firstStep.querySelector(".form form .income_partner input");
  addChildren = wrapper.querySelector(".add_children");
  photoChild = addChildren.querySelector(".children_photo .childrenPhoto");
  nameOfChild = addChildren.querySelector(".form form .name input");
  birthOfChild = addChildren.querySelector(".form form .birth input");
  height = addChildren.querySelector(".form form .height input");
  weight = addChildren.querySelector(".form form .weight input");
  saveButton = addChildren.querySelector(".form form button");
  photo = document.getElementById("phot");
  textChildren = addChildren.querySelector(".header");
  formChild = addChildren.querySelector(".form form");
};
const prepareDOMEvents = () => {
  startButton.addEventListener("click", clickStartButton);
  buttonFirstStep.addEventListener("click", clickFirstStepButton);
  saveButton.addEventListener("click", clickOnSaveButton);
  photo.addEventListener("change", changePhoto);
};

const changeUserName = (nameOfUser) => {
  nameUser.textContent = nameOfUser;
};
const clickStartButton = () => {
  welcomePanel.style.display = "none";
  firstStep.style.display = "flex";
};
let children; // zadeklarowana ilość dzieci

const clickFirstStepButton = (e) => {
  e.preventDefault();
  let nameFamily, mail, incomeD, incomePartnerD;
  nameFamily = nameOfFamily.value;
  mail = eMail.value;
  children = numberOfChildren.value;
  incomeD = parseFloat(income.value);
  incomePartnerD = parseFloat(incomePartner.value);
  if (nameFamily.trim() === "") {
    if (nameOfFamily.nextElementSibling) {
      nameOfFamily.nextElementSibling.remove();
    }
    const paragraph = document.createElement("p");
    paragraph.classList.add("error");
    paragraph.textContent = "Wprowadź poprawną nazwę rodziny.";
    nameOfFamily.insertAdjacentElement("afterend", paragraph);
  }
  const mailRegex = /^\S+@\S+\.\S+$/;
  if (!mailRegex.test(mail)) {
    if (eMail.nextElementSibling) {
      eMail.nextElementSibling.remove();
    }
    const paragraphSecond = document.createElement("p");
    paragraphSecond.classList.add("error");
    paragraphSecond.textContent = "Wprowadź poprawny adres e-mail.";
    eMail.insertAdjacentElement("afterend", paragraphSecond);
  }
  if (incomeD < 0 || isNaN(incomeD)) {
    if (income.nextElementSibling) {
      income.nextElementSibling.remove();
    }
    const paragraphThird = document.createElement("p");
    paragraphThird.classList.add("error");
    paragraphThird.textContent = "Wprowadź poprawny dochód.";
    income.insertAdjacentElement("afterend", paragraphThird);
  }
  if (incomePartnerD < 0 || isNaN(incomePartnerD)) {
    if (incomePartner.nextElementSibling) {
      incomePartner.nextElementSibling.remove();
    }
    const paragraphFourth = document.createElement("p");
    paragraphFourth.classList.add("error");
    paragraphFourth.textContent = "Wprowadź poprawny dochód.";
    incomePartner.insertAdjacentElement("afterend", paragraphFourth);
  }
  if (
    !nameOfFamily.nextElementSibling &&
    !eMail.nextElementSibling &&
    !income.nextElementSibling &&
    !incomePartnerD.nextElementSibling
  ) {
    sendFamilies(id, children, nameFamily, mail, incomeD, incomePartnerD);
    firstStep.style.display = "none";
    addChildren.style.display = "flex";
  }
};
const sendFamilies = (
  familyId,
  childrenInTotal,
  nameFamilytoBase,
  mailOtherParent,
  parnetIncome,
  yourIncome
) => {
  const data = new URLSearchParams();
  data.append("familyId", parseInt(familyId));
  data.append("nameFamilytoBase", nameFamilytoBase);
  data.append("childrenInTotal", parseInt(childrenInTotal));
  data.append("mailOtherParent", mailOtherParent);
  data.append("parnetIncome", parnetIncome);
  data.append("yourIncome", yourIncome);

  const connect = new XMLHttpRequest();
  connect.open("POST", "php/sendfamilies.php");
  connect.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  connect.onload = function () {
    if (connect.status === 200) {
      // console.log(connect.responseText);
    } else {
      console.log("Wystąpił błąd podczas przesyłania danych.");
    }
  };
  connect.send(data);
};
const clickOnSaveButton = (e) => {
  e.preventDefault();

  const childName = nameOfChild.value;
  const birth = birthOfChild.value;
  const heightChild = height.value;
  const weightChild = weight.value;

  if (childName === "" || childName == null) {
    if (nameOfChild.nextElementSibling) {
      nameOfChild.nextElementSibling.remove();
    }
    const paragraph = document.createElement("p");
    paragraph.classList.add("error");
    paragraph.textContent = "Podaj imię dziecka.";
    nameOfChild.insertAdjacentElement("afterend", paragraph);
  }

  if (birth === "") {
    if (birthOfChild.nextElementSibling) {
      birthOfChild.nextElementSibling.remove();
    }
    const paragraphSecond = document.createElement("p");
    paragraphSecond.classList.add("error");
    paragraphSecond.textContent = "Podaj poprawną datę urodzenia.";
    birthOfChild.insertAdjacentElement("afterend", paragraphSecond);
  }

  if (heightChild === "" || isNaN(heightChild)) {
    if (height.nextElementSibling) {
      height.nextElementSibling.remove();
    }
    const paragraphThird = document.createElement("p");
    paragraphThird.classList.add("error");
    paragraphThird.textContent = "Podaj poprawny wzrost dziecka.";
    height.insertAdjacentElement("afterend", paragraphThird);
  }

  if (weightChild === "" || isNaN(weightChild)) {
    if (weight.nextElementSibling) {
      weight.nextElementSibling.remove();
    }
    const paragraphFourth = document.createElement("p");
    paragraphFourth.classList.add("error");
    paragraphFourth.textContent = "Podaj poprawną wagę dziecka.";
    weight.insertAdjacentElement("afterend", paragraphFourth);
  }
  addChildToDataBase(photo, childName, birth, heightChild, weightChild);
  clearForm();
};

const clearForm = () => {
  textChildren.textContent = "Utwórz profil dla kolejnego dziecka...";
  photoChild.src = "/implementacja/children_photos/user.png";
  formChild.reset();
};

let addChildCount = 1;
const addChildToDataBase = (photo, name, birth, height, weight) => {
  if (addChildCount == children) {
    window.location.replace("dashboard.html");
  }
  const formData = new FormData();
  formData.append("id", id);
  formData.append("photo", photo.files[0]);
  formData.append("name", name);
  formData.append("birth", birth);
  formData.append("height", height);
  formData.append("weight", weight);

  const connect = new XMLHttpRequest();
  connect.open("POST", "php/addchild.php");
  connect.onload = function () {
    if (connect.status === 200) {
      // console.log(connect.responseText);
    } else {
      console.log("Wystąpił błąd podczas przesyłania danych.");
    }
  };
  connect.send(formData);
  addChildCount++;
};

const changePhoto = () => {
  if (photo.files && photo.files[0]) {
    const read = new FileReader();
    read.onload = function (e) {
      photoChild.src = e.target.result;
    };
    read.readAsDataURL(photo.files[0]);
  }
};

document.addEventListener("DOMContentLoaded", main);
