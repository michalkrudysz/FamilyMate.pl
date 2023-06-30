<?php
require_once "connect_database.php";

	$polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);
	
	if ($polaczenie->connect_errno!=0)
	{
		echo "Error: ".$polaczenie->connect_errno;
	}
    else{
        echo "Git";
    }
    $polaczenie->close();
    ?>