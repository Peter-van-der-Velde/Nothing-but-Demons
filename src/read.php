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
					 LIMIT 10
           ";
	$statement = $connection->prepare($sql);
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
	<h2>Your score:</h2>
	<?php echo '<p>your name: ', $_GET['name'], '</p>'; ?>
	<?php echo '<p>your score: ', $_GET['score'], '</p>'; ?>
	<h2>Leaderboards:</h2>
	<table>
		<thead>
			<tr>
				<th>#</th>		
				<th>Name</th>
				<th>Score</th>
			</tr>
		</thead>
		<tbody>
<?php 
	$counter = 1;
	foreach ($result as $row) 
	{ ?>
		<tr>
			<td><?php echo escape($counter); ?></td>		
			<td><?php echo escape($row["name"]); ?></td>
			<td><?php echo escape($row["score"]); ?></td>
		</tr>
	<?php 
	$counter++;
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

<a href="../index.php">Back to home</a>

<script>
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}
</script>