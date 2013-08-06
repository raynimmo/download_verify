<?php
/**
 * @file
 * Generate configuration form and save settings.
 */

/**
 * Form Builder.
 *
 * @ingroup forms
 * @see system_settings_form()
 */
function download_verify_configuration_form($form, &$form_state) {
  // Get the path to the module.
  $path = drupal_get_path('module', 'download_verify');
  // Attach the CSS to the form.
  $form['#attached'] = array(
    'css' => array(
      'type' => 'file',
      'data' => $path . '/css/download_verify.css',
    ),
  );

  // Set up the mail field container.
  $form['download_verify_mail_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('Mail configuration'),
    '#description' => t('Enter the e-mail address to be used for form submission configuration.'),
    '#weight' => 1,
    '#collapsible' => FALSE,
  );
  // Single text field for email address entry.
  $form['download_verify_mail_settings']['download_verify_email'] = array(
    '#type' => 'textfield',
    '#default_value' => variable_get('download_verify_email', 'yourname@example.com'),
    '#title' => t('Address to receive form mail.'),
    '#weight' => 2,
    '#collapsible' => FALSE,
  );

  // Set up the CSS reference container.
  $form['download_verify_css_target_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('CSS target configuration'),
    '#description' => t('Enter the CSS class name to be used for attaching the form to.'),
    '#weight' => 3,
    '#collapsible' => FALSE,
  );
  // Single text field for CSS target reference entry.
  $form['download_verify_css_target_settings']['download_verify_css_target'] = array(
    '#type' => 'textfield',
    '#default_value' => variable_get('download_verify_css_target', 'download-link-container'),
    '#title' => t('CSS class name.'),
    '#weight' => 4,
    '#collapsible' => FALSE,
  );

  // Form element for setting intro text.
  // Set up the intro text container.
  $form['download_verify_intro_text_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('Intro text content'),
    '#description' => t('Enter the text you wish to be shown at the top of the form'),
    '#weight' => 5,
    '#collapsible' => FALSE,
  );
  // Single text field for intro text entry.
  $form['download_verify_intro_text_settings']['download_verify_intro_text'] = array(
    '#type' => 'textfield',
    '#default_value' => variable_get('download_verify_intro_text', 'Please complete your details to continue the download.'),
    '#title' => t('The text to display'),
    '#weight' => 6,
    '#collapsible' => FALSE,
  );

  // Form element for setting footer text.
  // needs placeholder for link to privacy policy.
  // opt in to display link
  $form['download_verify_footer_text_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('Footer text content'),
    '#description' => t('Enter the text you wish to be shown at the bottom of the form'),
    '#weight' => 7,
    '#collapsible' => FALSE,
  );
  // Single text field for footer text entry.
  $form['download_verify_footer_text_settings']['download_verify_footer_text'] = array(
    '#type' => 'textfield',
    '#default_value' => variable_get('download_verify_footer_text', 'Emails are collected for marketing purposes in line with our <a href="#" title="">privacy policy</a>.'),
    '#title' => t('The text to display'),
    '#weight' => 8,
    '#collapsible' => FALSE,
  );

  // Textarea element for setting the body of the email sent.
     //TODO: Use placeholder tokens for details.

  return system_settings_form($form);
}
