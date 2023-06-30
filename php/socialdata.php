<?php
require_once 'connect_database.php';

$pdo = new PDO("mysql:host=$host;dbname=$db_name", $db_user, $db_password);

$id_glowy = $_POST['id'];

$sql = $pdo->prepare("SELECT dochod_partnera, dochod, ilosc_dzieci FROM rodziny WHERE id_glowy = :id_glowy");
$sql->execute(array(':id_glowy' => $id_glowy));
$row = $sql->fetch(PDO::FETCH_ASSOC);

if ($row) {
  $dochod_partnera = $row['dochod_partnera'];
  $dochod = $row['dochod'];
  $ilosc_dzieci = $row['ilosc_dzieci'];
  $response = array('dochod_partnera' => $dochod_partnera, 'dochod' => $dochod, 'ilosc_dzieci' => $ilosc_dzieci);
  header('Content-Type: application/json');
  echo json_encode($response);
} else {
  $response = array('error' => 'Nie znaleziono rodziny z głową o id=' . $id_glowy);
  header('Content-Type: application/json');
  echo json_encode($response);
}

$pdo = null;
?>