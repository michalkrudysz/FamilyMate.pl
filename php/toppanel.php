<?php
require_once 'connect_database.php';

$id = $_POST['id'];

$pdo = new PDO("mysql:host=$host;dbname=$db_name", $db_user, $db_password);

// pobranie loginu użytkownika o podanym id
$sql = $pdo->prepare("SELECT login FROM uzytkownicy WHERE id = :id");
$sql->bindParam(':id', $id);
$sql->execute();
$user = $sql->fetch(PDO::FETCH_ASSOC);

// pobranie nazwy rodziny, której głowa ma podane id
$sql = $pdo->prepare("SELECT nazwa_rodziny FROM rodziny WHERE id_glowy = :id");
$sql->bindParam(':id', $id);
$sql->execute();
$rodzina = $sql->fetch(PDO::FETCH_ASSOC);

// zwrócenie wyników w formacie tekstu prostego
if ($user && $rodzina) {
  echo json_encode(array("login" => $user['login'], "nazwa_rodziny" => $rodzina['nazwa_rodziny']));
} else {
  echo "Nie znaleziono użytkownika lub jego rodziny";
}

// zakończenie połączenia z bazą danych
$pdo = null;
?>