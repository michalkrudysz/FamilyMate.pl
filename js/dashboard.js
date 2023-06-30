window.onload = function () {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.replace("index.html");
  }
};
const id = localStorage.getItem("identyfikator");

let wrapper; // tutaj powinna być zawartość całej strony
let header; // nagłówek tam gdzie jest logo i przycisk
let logoutButton; // pobrany przycisk wyloguj
let dashboard; // pobrana cała zawartość dashborda
let topPanel; //pobrany top
let helloPanel; // tam gdzie dzień dobry
let nameHead; //przechowuje imię do powitania rodzica
let nameOfFamily; //przechuwje wyświetlaną nazwę rodziny
let middle; //przechowuje panel z dziećmi
let bottom; //przechowuje dolny panel

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
  socialProgram();
  topPanelDownloadData();
  downloadDataAboutChildren();
};

const prepareDOMElements = () => {
  //pobieram tu elementy
  wrapper = document.querySelector(".wrapper");
  header = wrapper.querySelector(".header");
  logoutButton = header.querySelector(".logout");
  dashboard = wrapper.querySelector(".dashboard");
  topPanel = dashboard.querySelector(".top");
  helloPanel = topPanel.querySelector(".hello");
  nameHead = helloPanel.querySelector(".hello_text .name_of_head");
  nameOfFamily = topPanel.querySelector(".family_name .name_of_family");
  middle = dashboard.querySelector(".middle");
  bottom = dashboard.querySelector(".bottom");
};
const logOut = () => {
  localStorage.removeItem("loggedIn");
  window.location.replace("index.html");
};
const socialProgram = () => {
  const data = new URLSearchParams();
  data.append("id", id);

  const connect = new XMLHttpRequest();
  connect.onreadystatechange = function () {
    if (connect.readyState == 4 && connect.status == 200) {
      const response = JSON.parse(connect.responseText);
      const dochodPartnera = response.dochod_partnera;
      const dochod = response.dochod;
      const iloscDzieci = response.ilosc_dzieci;
      createSocialPanel(dochodPartnera, dochod, iloscDzieci);
      createNotePanel();
    }
  };
  connect.open("POST", "php/socialdata.php", true);
  connect.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  connect.send(data);
};

let age;

const downloadDataAboutChildren = () => {
  const childData = new XMLHttpRequest();
  childData.open("POST", "php/downloaddataaboutchildren.php", true);
  childData.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );
  childData.onreadystatechange = () => {
    let response;
    if (
      childData.readyState === XMLHttpRequest.DONE &&
      childData.status === 200
    ) {
      response = JSON.parse(childData.responseText);
      console.log(response);
      console.log(id);
      const size = Object.keys(response).length;
      for (let i = 0; i < size; i++) {
        let file_adress = response[i].nazwa_pliku;
        let birth = response[i].data_urodzenia;
        let nameOfCHildFr = response[i].imie;
        let weightB = Math.round(response[i].masa);
        let heightB = Math.round(response[i].wzrost);
        let birthDate = new Date(birth);
        let todayDate = new Date();
        age = todayDate.getFullYear() - birthDate.getFullYear();
        if (
          todayDate.getMonth() < birthDate.getMonth() ||
          (todayDate.getMonth() == birthDate.getMonth() &&
            todayDate.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        let nextBirthday = new Date(
          todayDate.getFullYear(),
          birthDate.getMonth(),
          birthDate.getDate()
        );
        if (nextBirthday < todayDate) {
          nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
        }
        let remainingDays = Math.ceil(
          (nextBirthday - todayDate) / (1000 * 60 * 60 * 24)
        );
        let grafting;
        if (age <= 1) {
          grafting =
            "Dziecko powinno otrzymać szczepienia przeciwko gruźlicy (BCG), błonicy, tężcowi i krztuścowi (DTPa) oraz polio (IPV) - serie trzech dawek w 2., 3. i 4. miesiącu życia oraz 4. dawkę w 18. miesiącu życia.";
        }
        if (age <= 5 && age >= 1) {
          grafting =
            "Szczepienie przeciwko odrze, śwince i różyczce (MMR) - pierwsza dawka w 13. miesiącu życia dziecka, druga dawka w 10. roku życia.";
        }
        if (age <= 12 && age >= 5) {
          grafting =
            "Szczepienie przeciwko błonicy, tężcowi i krztuścowi (Tdap) - jedna dawka. Szczepienie przeciwko odrze, śwince i różyczce (MMR) - jedna dawka dla dzieci, które nie zostały zaszczepione wcześniej.";
        }
        if (age <= 18 && age >= 12) {
          grafting =
            "Szczepienie przeciwko meningokokom (ACWY) - jedna dawka w wieku 14-18 lat.";
        }
        let descriptionOfAge;

        if (age === 0) {
          descriptionOfAge =
            "0-1 rok to okres niemowlęcy, w którym dziecko rozwija się intensywnie pod względem fizycznym i poznaje otaczający je świat.";
        } else if (age === 1) {
          descriptionOfAge =
            "1 rok to czas intensywnego rozwoju fizycznego, w którym dziecko zaczyna raczkować, siadać i mówić pierwsze słowa.";
        } else if (age === 2) {
          descriptionOfAge =
            "2 lata to wiek, w którym dziecko zaczyna coraz bardziej rozwijać swoją niezależność, a także zdobywa umiejętności społeczne, takie jak dzielenie się zabawkami czy nawiązywanie kontaktów z rówieśnikami.";
        } else if (age === 3) {
          descriptionOfAge =
            "3 lata to czas, w którym dziecko zaczyna odkrywać swoje zainteresowania i pasje, a także uczy się coraz bardziej wyrażać swoje emocje i potrzeby.";
        } else if (age === 4) {
          descriptionOfAge =
            "4 lata to wiek, w którym dziecko intensywnie rozwija swoje zdolności językowe i poznaje podstawowe pojęcia matematyczne, takie jak liczenie i rozumienie pojęć matematycznych.";
        } else if (age === 5) {
          descriptionOfAge =
            "5 lat to czas, w którym dziecko zaczyna bardziej interesować się światem i zdobywa umiejętności potrzebne do rozpoczęcia nauki w szkole.";
        } else if (age === 6) {
          descriptionOfAge =
            "6 lat to wiek, w którym dziecko rozpoczyna naukę w szkole podstawowej i zaczyna poznawać nowych przyjaciół oraz kształtować swoją wiedzę i umiejętności.";
        } else if (age === 7) {
          descriptionOfAge =
            "7 lat to czas, w którym dziecko rozwija swoje zdolności do myślenia abstrakcyjnego i logicznego, a także zaczyna rozwijać swoją kreatywność.";
        } else if (age === 8) {
          descriptionOfAge =
            "8 lat to wiek, w którym dziecko zaczyna uczyć się o wartościach społecznych i zasadach współżycia z innymi ludźmi, a także zdobywa umiejętności potrzebne do samodzielnego rozwiązywania problemów.";
        } else if (age === 9) {
          descriptionOfAge =
            "9 lat to czas, w którym dziecko zaczyna rozwijać swoją ciekawość i dociekliwość, a także uczy się jak korzystać z dostępnych mu źródeł wiedzy.";
        } else if (age === 10) {
          descriptionOfAge =
            "10 lat to wiek, w którym zazwyczaj dziecko kończy edukację w szkole podstawowej i przygotowuje się do nowego etapu w życiu, jakim jest edukacja w szkole średniej.";
        } else if (age === 11) {
          descriptionOfAge =
            "11 lat to czas, w którym dziecko rozwija swoją wiedzę i umiejętności, a także kształtuje swoją tożsamość i samoocenę.";
        } else if (age === 12) {
          descriptionOfAge =
            "12 lat to wiek, w którym zazwyczaj dziecko rozpoczyna edukację w szkole średniej i zaczyna planować swoją przyszłość edukacyjną i zawodową.";
        } else if (age === 13) {
          descriptionOfAge =
            "13 lat to czas, w którym dziecko zaczyna intensywnie rozwijać swoje zdolności społeczne i emocjonalne, a także kształtuje swoją osobowość.";
        } else if (age === 14) {
          descriptionOfAge =
            "14 lat to wiek, w którym zazwyczaj dziecko uczęszcza do szkoły średniej i rozwija swoje zainteresowania, a także uczy się planować swoje czas i zadania.";
        } else if (age === 15) {
          descriptionOfAge =
            "15 lat to czas, w którym dziecko zaczyna kształtować swoją tożsamość, a także rozwija swoją niezależność i samodzielność.";
        } else if (age === 16) {
          descriptionOfAge =
            "16 lat to wiek, w którym zazwyczaj dziecko zdaje egzamin na prawo jazdy, a także zaczyna podejmować pierwsze decyzje dotyczące swojej przyszłości zawodowej i edukacyjnej.";
        } else if (age === 17) {
          descriptionOfAge =
            "17 lat to czas, w którym dziecko zaczyna przygotowywać się do egzaminów maturalnych i decyduje się na kierunek studiów lub pracę.";
        } else if (age === 18) {
          descriptionOfAge =
            "18 lat to wiek, w którym zazwyczaj dziecko kończy edukację w szkole średniej, staje się pełnoletnie i może podejmować samodzielne decyzje życiowe.";
        } else {
          descriptionOfAge = "Podany wiek nie mieści się w zakresie 0-18 lat.";
        }

        createChildPanel(
          file_adress,
          age,
          remainingDays,
          grafting,
          nameOfCHildFr,
          descriptionOfAge,
          weightB,
          heightB
        );
      }
    }
  };
  childData.send(`id=${id}`);
};

const topPanelDownloadData = () => {
  const data = new URLSearchParams();
  data.append("id", id);

  const connect = new XMLHttpRequest();
  connect.open("POST", "php/toppanel.php");
  connect.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  connect.onload = function () {
    if (connect.status === 200) {
      const response = JSON.parse(connect.responseText);
      const user = response.login;
      const family = response.nazwa_rodziny;
      nameHead.textContent = user;
      nameOfFamily.textContent = family;
    } else {
      console.log("Wystąpił błąd podczas przesyłania danych.");
    }
  };
  connect.send(data);
};
const createChildPanel = (
  nameOfPhoto,
  age,
  remainingDays,
  graftingContent,
  nameOfCHildFr,
  descriptionOfAge,
  weightB,
  heightB
) => {
  const child = document.createElement("div");
  child.classList.add("child");

  const childHeader = document.createElement("div");
  childHeader.classList.add("child_header");
  const childImg = document.createElement("img");
  childImg.setAttribute("src", `children_photos/${nameOfPhoto}`);
  childImg.setAttribute("alt", "zdjecie");
  childImg.classList.add("child_img");

  childHeader.appendChild(childImg);
  child.appendChild(childHeader);

  const nameOfChild = document.createElement("div");
  nameOfChild.classList.add("name_of_child");
  nameOfChild.textContent = nameOfCHildFr;
  child.appendChild(nameOfChild);

  const ageOfChild = document.createElement("div");
  ageOfChild.classList.add("age_of_child");
  ageOfChild.innerHTML = `<span class='number'>${age}</span> lat(a)`;
  child.appendChild(ageOfChild);

  const remain = document.createElement("div");
  remain.classList.add("remain");
  remain.innerHTML = `Urodziny za <span class='days'>${remainingDays}</span> dni`;
  child.appendChild(remain);

  const grafting = document.createElement("div");
  grafting.classList.add("grafting");
  grafting.textContent = "Zbliżające się szczepienie (opis):";
  child.appendChild(grafting);

  const description = document.createElement("div");
  description.classList.add("description");
  description.textContent = graftingContent;
  child.appendChild(description);

  const notes = document.createElement("div");
  notes.classList.add("notes");
  notes.textContent = descriptionOfAge;
  child.appendChild(notes);

  const vital = document.createElement("div");
  vital.classList.add("vital");
  vital.textContent = "Pomiary";
  child.appendChild(vital);

  const vitalParametr = document.createElement("div");
  vitalParametr.classList.add("viatal_parametr");

  const weight = document.createElement("div");
  weight.classList.add("weight");
  weight.textContent = `${weightB} kg`;
  vitalParametr.appendChild(weight);

  const height = document.createElement("div");
  height.classList.add("height");
  height.textContent = `${heightB} cm`;
  vitalParametr.appendChild(height);

  child.appendChild(vitalParametr);

  const editButton = document.createElement("div");
  editButton.classList.add("edit_button");
  editButton.textContent = "Edytuj";
  child.appendChild(editButton);

  const middle = document.querySelector(".middle");
  middle.appendChild(child);
};
const createSocialPanel = (dochodPartnera, dochod, iloscDzieci) => {
  let sum = dochodPartnera + dochod;

  const plus =
    "Program Rodzina 500+ - program wsparcia dla rodzin z dziećmi do 18 roku życia.";
  const plusSecond =
    "Program Dobry Start - jednorazowe wsparcie finansowe na zakup podręczników i przyborów szkolnych.";

  if (
    iloscDzieci >= 3 ||
    (iloscDzieci < 3 && iloscDzieci + 1 >= 3 && sum <= 6000)
  ) {
    support =
      "Mieszkanie Plus to program rządowy, który oferuje preferencyjne warunki kredytowe na zakup mieszkań lub domów dla rodzin z co najmniej trójką dzieci.";
  } else if (sum / (iloscDzieci + 2) < 764) {
    support =
      "Aktywny samorząd to program wsparcia dla dzieci i młodzieży, który oferuje dofinansowanie zajęć pozalekcyjnych organizowanych przez samorządy lokalne.";
  } else if (
    (iloscDzieci === 1 && sum <= 1600) ||
    (iloscDzieci === 2 && sum <= 2400) ||
    (iloscDzieci >= 3 && sum <= iloscDzieci * 800 + 800)
  ) {
    support =
      "Program Opieka wakacyjna - dofinansowanie opieki dla dzieci w czasie wakacji.";
  } else if (iloscDzieci >= 1 && sum <= 1200 * iloscDzieci) {
    support =
      "Program Równać szanse - wsparcie dla uczniów z rodzin o niższych dochodach.";
  } else {
    support = "Nie znaleziono więcej programów dla Waszego modelu rodziny.";
  }

  const socialPanel = document.createElement("div");
  socialPanel.classList.add("social");

  const socialHead = document.createElement("div");
  socialHead.classList.add("head");
  socialHead.innerText = "Proponowane programy socjalne";
  socialPanel.appendChild(socialHead);

  const socialCont = document.createElement("div");
  socialCont.classList.add("cont");

  const socialProgram1 = document.createElement("div");
  socialProgram1.classList.add("social_program");
  socialProgram1.innerText = `1. ${plus}`;
  socialCont.appendChild(socialProgram1);

  const socialProgram2 = document.createElement("div");
  socialProgram2.classList.add("social_program");
  socialProgram2.innerText = `2. ${plusSecond}`;
  socialCont.appendChild(socialProgram2);

  const socialProgram3 = document.createElement("div");
  socialProgram3.classList.add("social_program");
  socialProgram3.innerText = `3. ${support} `;
  socialCont.appendChild(socialProgram3);

  socialPanel.appendChild(socialCont);

  const socialContInc = document.createElement("div");
  socialContInc.classList.add("cont_inc");

  const socialInc1 = document.createElement("div");
  socialInc1.classList.add("inc");
  socialInc1.innerHTML = `Twój dochód: <br />${dochod} zł`;
  socialContInc.appendChild(socialInc1);

  const socialInc2 = document.createElement("div");
  socialInc2.classList.add("inc");
  socialInc2.innerHTML = `Dochód partnera: <br />${dochodPartnera} zł`;
  socialContInc.appendChild(socialInc2);

  const socialInc3 = document.createElement("div");
  socialInc3.classList.add("inc");
  socialInc3.innerHTML = `Suma dochodów:<br />${sum} zł`;
  socialContInc.appendChild(socialInc3);

  const socialInc4 = document.createElement("div");
  socialInc4.classList.add("inc");
  socialInc4.innerHTML = `Ilość dzieci:<br />${iloscDzieci}`;
  socialContInc.appendChild(socialInc4);

  socialPanel.appendChild(socialContInc);

  bottom.appendChild(socialPanel);
};
const createNotePanel = () => {
  const notePanel = document.createElement("div");
  notePanel.classList.add("notes_data");

  const noteTitle = document.createElement("div");
  noteTitle.classList.add("title");
  noteTitle.innerText = "Notatki";
  notePanel.appendChild(noteTitle);

  const noteContent = document.createElement("div");
  noteContent.classList.add("content");
  noteContent.innerText =
    "Dzisiaj nasze dziecko po raz pierwszy samo zrobiło kanapki na śniadanie i byliśmy z niego bardzo dumni.";
  notePanel.appendChild(noteContent);

  const noteButton = document.createElement("div");
  noteButton.classList.add("button");
  noteButton.innerText = "Edytuj notatkę";
  notePanel.appendChild(noteButton);

  bottom.appendChild(notePanel);
};

const prepareDOMEvents = () => {
  logoutButton.addEventListener("click", logOut);
};

document.addEventListener("DOMContentLoaded", main);
