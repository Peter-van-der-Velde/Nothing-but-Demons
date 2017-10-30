<html>

<head>
  <title>PHP Test</title>
</head>

<body>
  <?php 
  echo '<p>Hello World</p>';
  echo "<p>Parameters: <p>";
  foreach ($_GET as $value) {
    echo $value, "<br>";
  }
  ?>
</body>

</html>