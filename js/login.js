let loginButton;
let loginPanel;
let headerSection;
let mainSection;
let closePanelButton;
let leftSide;
let formLeftSide;
///LOGIN OBSŁUGA
let loginButtonToLogin;
let usernameLogin;
let passwordLogin;
///REJESTRACJA OBSŁUGA
let usernameRegister,
  emailRegister,
  passwordRegister,
  confirmPasswordRegister,
  buttonRegister;

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};
const prepareDOMElements = () => {
  //POBIERANIE ELEMENTÓW
  loginButton = document.querySelector(
    ".main .left-side .form .login_text .login"
  );
  loginPanel = document.querySelector(".login_panel");
  headerSection = document.querySelector(".header");
  mainSection = document.querySelector(".main");
  closePanelButton = loginPanel.querySelector(".close img");
  loginButtonToLogin = document.querySelector(".button.login");

  // LOGOWANIE
  usernameLogin = document.querySelector("#username");
  passwordLogin = document.querySelector("#password");

  // REJESTRACJA
  leftSide = mainSection.querySelector(".left-side");
  formLeftSide = leftSide.querySelector(".form");
  usernameRegister = formLeftSide.querySelector("#name");
  emailRegister = formLeftSide.querySelector("#email");
  passwordRegister = formLeftSide.querySelector("#password");
  confirmPasswordRegister = formLeftSide.querySelector("#confirm-password");
  buttonRegister = formLeftSide.querySelector(".button");
};

const prepareDOMEvents = () => {
  //NASŁUCHIWANIE
  loginButton.addEventListener("click", clickLoginButton);
  closePanelButton.addEventListener("click", closeLoginButton);
  loginButtonToLogin.addEventListener("click", clickLoginButtonToLogin);
  passwordLogin.addEventListener("key", clickEnterInLogin);
  buttonRegister.addEventListener("click", clickRegisterButton);
};

const clickLoginButton = () => {
  loginPanel.style.display = "block";
  loginPanel.animate([{ opacity: "0" }, { opacity: "1" }], { duration: 100 });

  mainSection.style.filter = "blur(10px)";
  mainSection.style.userSelect = "none";
  mainSection.style.pointerEvents = "none";

  headerSection.style.filter = "blur(10px)";
  headerSection.style.userSelect = "none";
  headerSection.style.pointerEvents = "none";
};
const closeLoginButton = () => {
  loginPanel.style.display = "none";
  loginPanel.animate([{ opacity: "0" }, { opacity: "1" }], { duration: 100 });
  mainSection.style.filter = "blur(0px)";
  mainSection.style.userSelect = "auto";
  mainSection.style.pointerEvents = "auto";

  headerSection.style.filter = "blur(0px)";
  headerSection.style.userSelect = "auto";
  headerSection.style.pointerEvents = "auto";
};
// do zmiany CSS w login panelu

const clickEnterInLogin = (e) => {
  if (e.key === "Enter") {
    clickLoginButtonToLogin(); //
  }
};

const clickRegisterButton = (e) => {
  e.preventDefault();

  //walidacja imienia
  const usernameInputRegister = usernameRegister.value;
  const emailInputRegister = emailRegister.value;
  const passwordInputRegister = passwordRegister.value;
  const confirmInputPasswordRegister = confirmPasswordRegister.value;
  checkPassword(passwordInputRegister, confirmInputPasswordRegister);
  checkEmail(emailInputRegister);
  checkName(usernameInputRegister);
  checkAll();
};

const clickLoginButtonToLogin = (e) => {
  e.preventDefault();
  const usernameInput = usernameLogin.value;
  const passwordInput = passwordLogin.value;
  const dataLogin = new URLSearchParams();
  dataLogin.append("email", usernameInput);
  dataLogin.append("password", passwordInput);
  const connect = new XMLHttpRequest();
  connect.open("POST", "php/login.php");
  connect.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  connect.onload = function () {
    if (connect.status === 200) {
      infoFromPHP(connect.responseText);
    }
  };
  const infoFromPHP = (result) => {
    if (result === "false") {
      const removep = passwordLogin.nextElementSibling;
      if (removep) {
        removep.remove();
      }
      const paragraph = document.createElement("p");
      paragraph.classList.add("error");
      paragraph.textContent = "Zły e-mail lub hasło.";
      passwordLogin.insertAdjacentElement("afterend", paragraph);
    } else {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("identyfikator", result);
      window.location.replace("creategroup.html");
      console.log(result);
    }
  };
  connect.send(dataLogin);
};

let nAfterVal, pAfterVal, mAfterVal;

const checkName = (nameuser) => {
  const idUsername = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9]{3,50}$/.test(nameuser);
  const paragraphToRemove = usernameRegister.nextElementSibling;
  if (idUsername) {
    if (paragraphToRemove) {
      paragraphToRemove.remove();
    }

    nAfterVal = nameuser;
  } else {
    if (paragraphToRemove) {
    } else {
      const paragraph = document.createElement("p");
      paragraph.classList.add("error");
      paragraph.textContent = "Imię powinno zawierać przynajmniej 3 znaki.";
      usernameRegister.insertAdjacentElement("afterend", paragraph);
    }
  }
};
const checkEmail = (mail) => {
  const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
  const secondParagraphToRemove = emailRegister.nextElementSibling;
  if (emailTest) {
    if (secondParagraphToRemove) {
      secondParagraphToRemove.remove();
    }

    mAfterVal = mail;
  } else {
    if (secondParagraphToRemove) {
    } else {
      const paragraph = document.createElement("p");
      paragraph.classList.add("error");
      paragraph.textContent = "Niepoprawny adres e-mail.";
      emailRegister.insertAdjacentElement("afterend", paragraph);
    }
  }
};
const checkPassword = (first, second) => {
  const passwordTest = /^(?=.*\d).{3,50}$/.test(first);
  const paragraphToRemove = passwordRegister.nextElementSibling;
  if (passwordTest) {
    if (paragraphToRemove) {
      paragraphToRemove.remove();
    }
    checkTheSamePassword(first, second);
  } else {
    if (paragraphToRemove) {
    } else {
      const paragraph = document.createElement("p");
      paragraph.classList.add("error");
      paragraph.textContent =
        "Hasło powinno zawierać przynajmniej trzy znaki w tym cyfrę.";
      passwordRegister.insertAdjacentElement("afterend", paragraph);
    }
  }
};

const checkTheSamePassword = (one, two) => {
  const paragraphToRemove = confirmPasswordRegister.nextElementSibling;
  if (one === two) {
    if (paragraphToRemove) {
      paragraphToRemove.remove();
    }
    pAfterVal = one;
  } else {
    if (paragraphToRemove) {
      paragraphToRemove.remove();
    }
    const paragraph = document.createElement("p");
    paragraph.classList.add("error");
    paragraph.textContent = "Hasła się od siebie różnią.";
    confirmPasswordRegister.insertAdjacentElement("afterend", paragraph);
  }
};
const checkAll = () => {
  if (
    nAfterVal === undefined ||
    pAfterVal === undefined ||
    mAfterVal === undefined
  ) {
    return;
  } else {
    const dataRegister = new URLSearchParams(); // tworzę obiekt do przechowania danych
    dataRegister.append("username", nAfterVal);
    dataRegister.append("password", pAfterVal);
    dataRegister.append("mail", mAfterVal);
    const connect = new XMLHttpRequest(); // tworzy nowy obiekt XMLHttpRequest
    connect.open("POST", "php/register.php");
    connect.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    connect.onload = function () {
      if (connect.status === 200) {
        infoFromPHP(connect.responseText);
      }
    };
    const infoFromPHP = (result) => {
      if (result === "false") {
        const secondParagraphToRemove = emailRegister.nextElementSibling;
        if (secondParagraphToRemove) {
          secondParagraphToRemove.remove();
        }
        const paragraph = document.createElement("p");
        paragraph.classList.add("error");
        paragraph.textContent = "Już istnieje konto z podanym adresem e-mail.";
        emailRegister.insertAdjacentElement("afterend", paragraph);
      }
    };
    connect.send(dataRegister);
    const succes = document.createElement("p");
    succes.textContent = "Pomyśla rejestracja! Zaloguj się.";
    loginButtonToLogin.insertAdjacentElement("afterend", succes);
    clickLoginButton();
  }
};
document.addEventListener("DOMContentLoaded", main);
