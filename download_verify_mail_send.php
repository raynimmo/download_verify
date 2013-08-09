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
$download_verify_body = "A document has been downloaded from your website by:\r\n\n First name: "
 . $download_verify_fname . "\r\n Surname: "
 . $download_verify_sname . "\r\n\n E-mail: "
 . $download_verify_email;
// Set the mail header.
$download_verify_extra_header = $download_verify_sendto . "\r\nContent-Type: text/plain";

// Send it.
$download_verify_mailsend = mail($download_verify_sendto, $download_verify_subject, $download_verify_body, $download_verify_extra_header);

// Echo the result.
if ($download_verify_mailsend) {
  $download_verify_mail_result = 'Mail sent';
}
else {
  $download_verify_mail_result = 'Mail not sent';
}
return $download_verify_mail_result;
