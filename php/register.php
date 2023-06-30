<?php
require_once 'connect_database.php';

$username = $_POST['username'];
$password = $_POST['password'];
$mail = $_POST['mail'];

$pdo = new PDO("mysql:host=$host;dbname=$db_name", $db_user, $db_password);

// sprawdzenie, czy istnieje użytkownik o podanym adresie e-mail
$sql = $pdo->prepare("SELECT COUNT(*) FROM uzytkownicy WHERE email = :mail");
$sql->bindParam(':mail', $mail);
$sql->execute();
$count = $sql->fetchColumn();

if ($count > 0) {
  // jeśli użytkownik o podanym adresie e-mail już istnieje, zwracamy false
  echo "false";
  return false;
} else {
  // hashowanie hasła przed zapisaniem do bazy danych
  $hashed_password = password_hash($password, PASSWORD_DEFAULT);

  // dodanie użytkownika do bazy danych z zahaszowanym hasłem
  $sql = $pdo->prepare("INSERT INTO uzytkownicy (haslo, login, email) VALUES (:password, :username, :mail)");
  $sql->bindParam(':password', $hashed_password);
  $sql->bindParam(':username', $username);
  $sql->bindParam(':mail', $mail);
  $sql->execute();

  echo "Dane zostały zapisane do bazy danych.";
}

// zakończenie połączenia z bazą danych
$pdo = null;
?>