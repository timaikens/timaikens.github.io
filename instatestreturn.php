<?php

echo "went to PHP";
exit;

if(!isset($_POST['code'])) {
	//This page should not be accessed directly. Need to submit the form.
	// $resp_error_1 = array(0, "ERROR; You need to submit the form!");
	// echo json_encode($resp_error_1);
	$resp_error_1 = "<h1>ERROR; You need to submit the form!</h1><p><a href='http://timmya.com'>Back to TimmyA.com</a></p>";
	echo $resp_error_1;
	exit;
}

$code = $_POST['code'];

//Validate first

echo json_encode($code);
exit;
   
?>