<?php
require_once 'connect_database.php';

$glowa = $_POST['id'];

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db_name", $db_user, $db_password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = $pdo->prepare("SELECT id, nazwa_pliku, imie, data_urodzenia, wzrost, 
    masa FROM dzieci WHERE glowa_rodziny = $glowa");
    $sql->execute();
    $result = $sql->fetchAll(PDO::FETCH_ASSOC);
    $pdo = null;
    echo json_encode($result);

} catch (PDOException $e) {
    echo "Błąd połączenia z bazą danych: " . $e->getMessage();
} catch (Exception $e) {
    echo "Wystąpił błąd: " . $e->getMessage();
}
?>