<?php
/**
 * @file
 * Simple mail script for JavaScript mail submission.
 */

// Get the POSTed variables.
$dv_sendto = $_GET['dvsendto'];
$dv_fname = $_GET['dvfname'];
$dv_sname = $_GET['dvsname'];
$dv_email = $_GET['dvemail'];

// Build the email.
$subject = '[FORM SUBMISSION] PDF Download';
$body = "A document has been downloaded from your website by:\r\n\n First name: " . $dv_fname . "\r\n Surname: " . $dv_sname . "\r\n\n E-mail: " . $dv_email;
$extra_header = $dv_sendto . "\r\nContent-Type: text/plain";

// Send it.
$mailsend = mail($dv_sendto, $subject, $body, $extra_header);

// Echo the result.
if ($mailsend) {
  $mail_result = 'Mail sent';
}
else {
  $mail_result = 'Mail not sent';
}
echo $mail_result;
