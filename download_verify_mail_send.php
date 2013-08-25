<?php
$path = $_SERVER['DOCUMENT_ROOT'];
//chdir($path."/dev/drupal-7-dev");
chdir($path);
define('DRUPAL_ROOT', getcwd()); //the most important line
require_once './includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);

//$cwd = getcwd();


/**
 * @file
 * Simple mail script for JavaScript mail submission.
 */

/**
 * Copy of check_plain() for local use.
 */
/*
function check_plain($text) {
  return htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
}
*/
// Get the POSTed variables.
// Sanitize all user submitted variables in case of spoofed request.
$download_verify_sendto = $_GET['dvsendto'];
$download_verify_fname = check_plain($_GET['dvfname']);
$download_verify_sname = check_plain($_GET['dvsname']);
$download_verify_email = check_plain($_GET['dvemail']);

$module = 'download_verify';
$key = 'download_verify_submission';



// Build the email.
/*
$download_verify_subject = '[FORM SUBMISSION] PDF Download';
$download_verify_body = "A document has been downloaded from your website by:\r\n\n First name: "
 . $download_verify_fname . "\r\n Surname: "
 . $download_verify_sname . "\r\n\n E-mail: "
 . $download_verify_email;
 */
//$download_verify_subject = '[FORM SUBMISSION] PDF Download';
//$download_verify_body = "A document has been downloaded from your website by:\r\n\n First name: "
// . $download_verify_fname . "\r\n Surname: "
// . $download_verify_sname . "\r\n\n E-mail: "
// . $download_verify_email;
// Set the mail header.
//$download_verify_extra_header = $download_verify_sendto . "\r\nContent-Type: text/plain";

$language = language_default();
//$params = $form_values;
//$params = $download_verify_body;
$params = array(
//	'body' => $download_verify_body, 
//	'subject' => $download_verify_subject,
	'firstname' => $download_verify_fname,
	'surname' => $download_verify_sname,
	'email' => $download_verify_email
	);
$from = variable_get('site_mail', 'admin@example.com');
$send = TRUE;
// Send it.
//$download_verify_mailsend = mail($download_verify_sendto, $download_verify_subject, $download_verify_body, $download_verify_extra_header);
$download_verify_mailsend = drupal_mail($module, $key, $download_verify_sendto, $language, $params, $from, $send);
// Echo the result.
if ($download_verify_mailsend['result'] == TRUE) {
  $download_verify_mail_result = 'Mail sent';
  //drupal_set_message(t('Your message has been sent.'));
}
else {
  $download_verify_mail_result = 'Mail not sent';
  //drupal_set_message(t('There was a problem sending your message and it was not sent.'), 'error');
}
echo $download_verify_mail_result . "-" . $download_verify_mailsend['result'];
