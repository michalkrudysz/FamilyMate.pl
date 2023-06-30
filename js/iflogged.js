window.onload = function () {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.replace("index.html");
  } else {
    const ID = localStorage.getItem("identyfikator");
    console.log(ID);
    return;
  }
};
