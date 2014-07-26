<?php
//Initialize logging clases
include('logInit.php');
//
if(isset($_POST['subDelete'])){ //Deletion form submitted:
	$pass = $database->clean($_POST['pass']);
	$log->emptyLog($pass);
	$_SESSION['delete_msg'] = 'New message was logged';
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>PHP logging class - Log emptying:</title>
<link href="/blog/wp-content/themes/altruism/style.css" rel="stylesheet" type="text/css" />
<link href="styles.css" rel="stylesheet" type="text/css" />
<style type="text/css">
<!--
#topH1{
	border-bottom-color:#C7D082;
	border-bottom-style:inset;
	border-bottom-width:5px;
}
p{
	font-size:1.2em;
}
label {
display: block;
width: 150px;
float: left;
margin-bottom: 10px;
}
.btn{
	width:150px;
	height:25px;
}
 
label {
text-align: right;
width: 75px;
padding-right: 20px;
}
 
br {
clear: left;
}
-->
</style>
</head>

<body>
<table width="480" border="0" align="center" cellpadding="0" cellspacing="0" id="page">
  <tr>
    <td><div align="center" id="header"><a href="http://urbanoalvarez.es"><img src="/img/blog/small_logo.jpg" alt="Urbano Alvarez Foundation" width="480" height="75" border="0" /></a></div></td>
  </tr>
  <tr>
    <td><div class="entry">
    	<h1 id="topH1">PHP logging class - Log emptying:</h1>
    	<p>This action is reserved to the site admin, and unless you hack the following form, (Its ok if you try to, but if you do, tell me how and I'll blog it!) , only I will be able to empty the log...</p>
        <?php $log->displayMsg('delete'); ?>
    	<form id="deleteForm" name="deleteForm" method="post" action="deleteLog.php">
          <input name="subDelete" type="hidden" value="true" />
    	  <label for="pass">Password:</label>
    	  <input type="password" name="pass" id="textfield" />
          <br />
          <input name="deleteBtn" type="submit" class="btn" value="Empty" />
    	  
        </form>
    	<p>&nbsp;</p>
    </div></td>
  </tr>
  <tr>
  <td></td>
  </tr>
 </table>
</body>
</html>
