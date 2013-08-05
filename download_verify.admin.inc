<?php
/**
 * @file
 *
 * Generate configuration form and save settings.
 */

/**
 * Form Builder.
 *
 * @ingroup forms
 * @see system_settings_form().
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
  $form['download_verify_mail_settings']['send_to_address'] = array(
    '#type' => 'textfield',
    '#default_value' => variable_get('send_to_address', 'yourname@example.com'),
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
  $form['download_verify_css_target_settings']['attach_to_css'] = array(
    '#type' => 'textfield',
    '#default_value' => variable_get('attach_to_css', 'yourname@example.com'),
    '#title' => t('CSS class name.'),
    '#weight' => 4,
    '#collapsible' => FALSE,
  );

  //form element for setting intro text

  //form element for setting footer text
     // needs placeholder for link to privacy policy
     // opt in to display link

  // textarea element for setting the body of the email sent
     // use placeholder tokens for details

  return system_settings_form($form);
}
