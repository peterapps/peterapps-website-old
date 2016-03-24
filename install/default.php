<?php
$url = 'http://' . $_SERVER['HTTP_HOST'] . '/install/install.mobileconfig' ;
header( 'Location: ' . $url ) ;
?>
<!DOCTYPE html>
<html>
<head>
<title>Redirecting...</title>
<script>
     var arr = location.href.split("/");
     arr.pop();
     var url = arr.join("/") + '/install.mobileconfig';
</script>
</head>
<body>
Redirecting to <a href=""></a>
<script>
    document.querySelector("a").href = document.querySelector("a").innerHTML = url;
    location.replace(url);
</script>
</body>
</html>