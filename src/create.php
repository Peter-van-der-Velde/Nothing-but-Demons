<?php

/**
 * Use an HTML GET to create a new entry in the
 * leaderboards table.
 *
 */

	require "../config.php";
	require "../common.php";

	try 
	{
		$connection = new PDO($dsn, $username, $password, $options);
		
		$new_score = array(
			"name" => $_GET['name'],
			"score"  => $_GET['score']
		);

		$sql = sprintf(
				"INSERT INTO %s (%s) values (%s)",
				"leaderboard",
				implode(", ", array_keys($new_score)),
				":" . implode(", :", array_keys($new_score))
		);
		
		$statement = $connection->prepare($sql);
		$statement->execute($new_score);
	}

	catch(PDOException $error) 
	{
		echo $sql . "<br>" . $error->getMessage(), '<br>';
		echo $_GET['name'], '<br>';
		echo $_GET['score'], '<br>';
		
	}
	
?>
<script>
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}

window.location.replace('read.php?name=' + getUrlVars()["name"] + '&score=' + getUrlVars()["score"]);
</script>

