<?php
require_once 'connect_database.php';

if (isset($_POST['id'])) {
  $id = $_POST['id'];
  $pdo = new PDO("mysql:host=$host;dbname=$db_name", $db_user, $db_password);

  // pobranie wartości pola "login" dla podanego użytkownika
  $sql = $pdo->prepare("SELECT login FROM uzytkownicy WHERE id = :id");
  $sql->bindParam(':id', $id);
  $sql->execute();
  $row = $sql->fetch(PDO::FETCH_ASSOC);

  if ($row) {
    // jeśli użytkownik istnieje, zwracamy wartość pola "login"
    $login = $row['login'];
    $message = "$login";
    echo $message;
  } else {
    // jeśli użytkownik nie istnieje, zwracamy odpowiedni komunikat
    echo "Nie znaleziono użytkownika o ID $id";
  }

  // zakończenie połączenia z bazą danych
  $pdo = null;
} else {
  echo "Błąd: brak wartości ID w zapytaniu.";
}
?>