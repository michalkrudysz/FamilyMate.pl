<?php
require_once 'connect_database.php';

$email = $_POST['email'];
$password = $_POST['password'];

$pdo = new PDO("mysql:host=$host;dbname=$db_name", $db_user, $db_password);

// pobranie hasła i id dla podanego użytkownika
$sql = $pdo->prepare("SELECT id, haslo FROM uzytkownicy WHERE email = :email");
$sql->bindParam(':email', $email);
$sql->execute();
$row = $sql->fetch(PDO::FETCH_ASSOC);

if ($row && password_verify($password, $row['haslo'])) {
  $user_id = $row['id'];
  echo $user_id;
} else {
  echo "false";
}
$pdo = null;
?>
