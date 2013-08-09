<?php
/**
 * @file
 * Simple mail script for JavaScript mail submission.
 */

// Get the POSTed variables.
$download_verify_sendto = $_GET['dvsendto'];
$download_verify_fname = $_GET['dvfname'];
$download_verify_sname = $_GET['dvsname'];
$download_verify_email = $_GET['dvemail'];

// Build the email.
$download_verify_subject = '[FORM SUBMISSION] PDF Download';
$download_verifybody = "A document has been downloaded from your website by:\r\n\n First name: "
 . $download_verify_fname . "\r\n Surname: "
 . $download_verify_sname . "\r\n\n E-mail: "
 . $download_verify_email;
// Set the mail header.
$download_verifyextra_header = $download_verify_sendto . "\r\nContent-Type: text/plain";

// Send it.
$download_verifymailsend = mail($download_verify_sendto, $download_verifysubject, $download_verifybody, $download_verifyextra_header);

// Echo the result.
if ($download_verifymailsend) {
  $download_verifymail_result = 'Mail sent';
}
else {
  $download_verifymail_result = 'Mail not sent';
}
echo $download_verifymail_result;
