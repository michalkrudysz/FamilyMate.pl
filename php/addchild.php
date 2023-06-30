<?php
require_once 'connect_database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $allowed_mime_types = array('image/png', 'image/jpeg', 'image/gif');
  $id = $_POST['id'];
  $name = $_POST['name'];
  $birth = $_POST['birth'];
  $height = $_POST['height'];
  $weight = $_POST['weight'];
  if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
    if (in_array($_FILES['photo']['type'], $allowed_mime_types)) {
      $upload_dir = '../children_photos/';
      $file_ext = strtolower(pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION));
      $file_name = $name . '_' . uniqid() . '.' . $file_ext;
      $file_path = $upload_dir . $file_name;
      if (move_uploaded_file($_FILES['photo']['tmp_name'], $file_path)) {
        echo "Plik został zapisany jako: $file_path";
        $pdo = new PDO("mysql:host=$host;dbname=$db_name", $db_user, $db_password);

        $sql = $pdo->prepare("INSERT INTO dzieci (glowa_rodziny, nazwa_pliku, imie, data_urodzenia, wzrost, masa) VALUES (:glowa_rodziny, :nazwa_pliku, :imie, :data_urodzenia, :wzrost, :masa)");
        $sql->bindParam(':glowa_rodziny', $id);
        $sql->bindParam(':nazwa_pliku', $file_name);
        $sql->bindParam(':imie', $name);
        $sql->bindParam(':data_urodzenia', $birth);
        $sql->bindParam(':wzrost', $height);
        $sql->bindParam(':masa', $weight);
        $sql->execute();

        echo "Dane zostały zapisane do bazy danych.";
      } else {
        echo "Wystąpił błąd podczas zapisywania pliku.";
      }
    } else {
      echo "Przesłany plik nie jest zdjęciem.";
    }
  } else {
    echo "Nie przesłano żadnego pliku.";
  }
}
?>