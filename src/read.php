<html>
  <head>
    <meta charset="UTF-8">
		<title>Leaderboards</title>

		<link rel="stylesheet" href="css/main.css">
  </head>
  <body class="scoreBoardBody">
	  <div class="scoreBoardWrapper">
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
    <hr>
	<?php echo '<h2>your name: ', $_GET['name'], '</h2>'; ?>
	<?php echo '<h2>your score: ', $_GET['score'], '</h2>'; ?>
	<hr>
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

<div class="button" id="button1">
					<a href="../index.php">Return to home<span class="shift">?</span></a>
					<div class="mask"></div>
				</div>

<script>
			function getUrlVars() {
				var vars = {};
				var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
					vars[key] = value;
				});
				return vars;
			}
			var name = getUrlVars()['name'];
			console.log(name);

			</script>
	  </div>
  </body>
</html>