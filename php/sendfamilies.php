<?php
require_once 'connect_database.php';

$familyId = $_POST['familyId'];
$nameFamilytoBase = $_POST['nameFamilytoBase'];
$childrenInTotal = $_POST['childrenInTotal'];
$mailOtherParent = $_POST['mailOtherParent'];
$parentIncome = $_POST['parnetIncome'];
$yourIncome = $_POST['yourIncome'];

$pdo = new PDO("mysql:host=$host;dbname=$db_name", $db_user, $db_password);

// dodanie danych do tabeli rodziny
$sql = $pdo->prepare("INSERT INTO rodziny (id_glowy, nazwa_rodziny, ilosc_dzieci, email_partnera, dochod_partnera, dochod) 
VALUES (:familyId, :nameFamilytoBase, :childrenInTotal, :mailOtherParent, :parentIncome, :yourIncome)");

$sql->bindParam(':familyId', $familyId);
$sql->bindParam(':nameFamilytoBase', $nameFamilytoBase);
$sql->bindParam(':childrenInTotal', $childrenInTotal);
$sql->bindParam(':mailOtherParent', $mailOtherParent);
$sql->bindParam(':parentIncome', $parentIncome);
$sql->bindParam(':yourIncome', $yourIncome);

$sql->execute();

echo "Dane zostały zapisane do bazy danych.";

// zakończenie połączenia z bazą danych
$pdo = null;
?>