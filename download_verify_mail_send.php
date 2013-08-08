<?php
/**
 * @file
 * Simple mail script for JavaScript mail submission.
 */
$sendto = $_GET['address'];
$fname = $_GET['fname'];
$sname = $_GET['sname'];
$email = $_GET['email'];

$subject = '[FORM SUBMISSION] PDF Download';
$body = "A document has been downloaded from your website by:\r\n\n First name" . $fname . "\r\n Second name: " . $sname . "\r\n\n Email: " . $email;
$extra_header = "From: website@jhbathrooms.com\r\nContent-Type: text/plain";
$mailsend = mail($address, $subject, $body, $extra_header);

if($mailsend) {
	return TRUE;
}else{
	return TRUE;
}
