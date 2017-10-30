<?php

/**
 * Function to query information ordered by score
 *
 */

try 
{	
	require "../config.php";
	require "../common.php";
	$connection = new PDO($dsn, $username, $password, $options);
	$sql = "SELECT * 
					FROM leaderboard
           ORDER BY score DESC
           ";
	$statement = $connection->prepare($sql);
	// $statement->bindParam(':location', $location, PDO::PARAM_STR);
	$statement->execute();
	$result = $statement->fetchAll();
}

catch(PDOException $error) 
{
	echo $sql . "<br>" . $error->getMessage();
}
?>


<?php  
if ($result && $statement->rowCount() > 0) 
{ ?>
	<h2>Leaderboards:</h2>
	<table>
		<thead>
			<tr>
			<th>Name</th>
				<th>Score</th>
			</tr>
		</thead>
		<tbody>
<?php 
	foreach ($result as $row) 
	{ ?>
		<tr>
			<td><?php echo escape($row["name"]); ?></td>
			<td><?php echo escape($row["score"]); ?></td>
		</tr>
	<?php 
	} ?>
	</tbody>
</table>
<?php 
} 
else 
{ ?>
	<blockquote>No results were found.</blockquote>
<?php
} ?> 

<a href="index.php">Back to home</a>
