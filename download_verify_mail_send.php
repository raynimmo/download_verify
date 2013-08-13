<?php
/**
 * @file
 * Simple mail script for JavaScript mail submission.
 */

/**
 * Copy of check_plain() for local use.
 */
function check_plain($text) {
  return htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
}

// Get the POSTed variables.
// Sanitize all user submitted variables in case of spoofed request.
$download_verify_sendto = $_GET['dvsendto'];
$download_verify_fname = check_plain($_GET['dvfname']);
$download_verify_sname = check_plain($_GET['dvsname']);
$download_verify_email = check_plain($_GET['dvemail']);

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
echo $download_verify_mail_result;
