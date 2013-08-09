/**
 * @file
 * Javascript functions for Download Verify module.
 */

(function ($) {
  // Intro section of text on slide-out panel.
  Drupal.theme.prototype.download_verify_intro_text_wrapper = function(download_verify_intro_text) {
    return '<p class="small">' + download_verify_intro_text + '</p>';
  }

  // Footer section of text on slide-out panel with optional link.
  // TODO : use token replacement for {privacy-policy} link.
  Drupal.theme.prototype.download_verify_footer_text_wrapper = function(download_verify_footer_text) {
    return '<p class="small">' + download_verify_footer_text + '</p>';
  }

  // Form textfield for first name.
  Drupal.theme.prototype.download_verify_form_fname = function() {
    return '<div class="form-item form-type-textfield form-item-fname"><label for="edit-fname">First name <span title="This field is required." class="form-required">*</span></label><input type="text" class="form-text required" maxlength="60" size="20" value="" name="fname" id="edit-fname" /></div>';
  }

  // Form textfield for surname.
  Drupal.theme.prototype.download_verify_form_sname = function() {
    return '<div class="form-item form-type-textfield form-item-sname"><label for="edit-sname">Surname <span title="This field is required." class="form-required">*</span></label><input type="text" class="form-text required" maxlength="60" size="20" value="" name="sname" id="edit-sname" /></div>';
  }

  // Form textfield for email address.
  Drupal.theme.prototype.download_verify_form_email = function() {
    return '<div class="form-item form-type-textfield form-item-email"><label for="edit-email">E-mail <span title="This field is required." class="form-required">*</span></label><input type="text" class="form-text required" maxlength="60" size="20" value="" name="email" id="edit-email" /></div>';
  }

  // Form action buttons.
  Drupal.theme.prototype.download_verify_form_actions = function() {
    return '<div id="edit-actions" class="form-actions form-wrapper"><a class="button form-submit" id="edit-submit" onclick="validateForm();">Download</a><a class="button form-cancel" id="edit-cancel"  onclick="verifyClose();">Cancel</a></div>';
  }

  // Form UI feedback.
  Drupal.theme.prototype.download_verify_form_feedback = function() {
    return '<p class="msgbox"><b>Selected Download:</b><br /><span class="filename-display"></span><span class="filepath-display"></span></p>';
  }
  // Form constructor.
  Drupal.theme.prototype.download_verify_ui_form = function() {
    var the_form = '<div>'
             + Drupal.theme('download_verify_form_fname')
             + Drupal.theme('download_verify_form_sname')
             + Drupal.theme('download_verify_form_email')
             + Drupal.theme('download_verify_form_actions')
             + Drupal.theme('download_verify_form_feedback')
             + '</div>';
    return the_form;
  }

  // Onload function.
  Drupal.behaviors.download_verify = {

    attach: function (context, settings) {
      // Get the settings.
      var download_verify_css_target = Drupal.settings.download_verify.download_verify_css_target;
      var download_verify_email = Drupal.settings.download_verify.download_verify_email;
      var download_verify_intro_text = Drupal.settings.download_verify.download_verify_intro_text;
      var download_verify_footer_text = Drupal.settings.download_verify.download_verify_footer_text;
      var download_verify_cookie_display = Drupal.settings.download_verify.download_verify_cookie_display;
      var download_verify_cookie_expiry = Drupal.settings.download_verify.download_verify_cookie_expiry;

      // set up the form.
      var introtext = Drupal.theme('download_verify_intro_text_wrapper', download_verify_intro_text);
      var footertext = Drupal.theme('download_verify_footer_text_wrapper', download_verify_footer_text);
      var theform = Drupal.theme('download_verify_ui_form');
      var verifyForm = '<div id="download-verify-form-wrapper">' + introtext + theform + footertext + "</div>";
      var isOpen;
      var filepath;

      // Hijack the pdf clicks.
      $('.' + download_verify_css_target +' a', context).click(function(event){
        filepath = $(this).attr('href');
        // Check for cookie on users machine.
        if(download_verify_cookie_display ==1) {
          var existing_cookie = jQuery.cookie("downloadverifyform");
        }
        // User already has cookie set indicating previous form completion.
        if(existing_cookie && download_verify_cookie_display!=0){
          console.log("pass to dl: L83 -> filepath="+filepath);
          download_verify_begin_download(filepath);
        }else{
          // No cookie found on the users system.
          event.preventDefault();
          // Check if the form is open.
          if($('#download-verify-form-wrapper').length > 0){
            isOpen = true;
          }else{
            isOpen = false;
          }

          if(!isOpen) {
            // Get the target file.
            filepath = $(this).attr('href');
            filename = $(this).html();

            // Attach form content to link container element.
            $('.' + download_verify_css_target).append(verifyForm);

            // Display selected.
            $('span.filename-display').append(filename);
            $('span.filepath-display').append(filepath);
            // Slide out the form.
            $('#download-verify-form-wrapper').slideDown(600, function(){
              isOpen = true;
            });

          }else if(isOpen) {
            // Clear the target file.
            $('span.filename-display').empty();
            $('span.filepath-display').empty();

            // Change the PDF target filepath.
            filepath = $(this).attr('href');
            filename = $(this).html();

            // Display selected.
            $('span.filename-display').append(filename);
            $('span.filepath-display').append(filepath);
          }
        }
      });
    }
  }
  
  // Called by 'cancel' button
  /*
  Drupal.behaviors.download_verify_close = function(context) {
    var isOpen = true;
    jQuery('#verify-form').slideUp(600, function() {
      jQuery('#verify-form').remove();
      isOpen = false;
    });
  }
  */

}(jQuery));

// Called by 'cancel' btn to close the form.
function verifyClose(){
  var isOpen=true;
  jQuery('#download-verify-form-wrapper').slideUp(600,function(){
    jQuery('#download-verify-form-wrapper').remove();
    isOpen = false;
  });
  return isOpen;
}

// Called from html form element'onsubmit' attrib.
function validateForm(){  
  // Extract values from textfields and sanitize.
  // @todo: replace Id's with specific class names.
  var dv_fname = Drupal.checkPlain(jQuery('#edit-fname').val());
  var dv_sname = Drupal.checkPlain(jQuery('#edit-sname').val());
  var dv_email = Drupal.checkPlain(jQuery('#edit-email').val());

  // Check for empty fields.
  if((dv_fname.length==0)||(dv_sname.length==0)||(dv_email.length==0)){
    console.log('at least one empty field');
    // @todo: detect which one is empty
    // Show errors.
    jQuery('#download-verify-form-wrapper input[type=text]').addClass('error');
    jQuery('.form-required').html('*');
    jQuery('.form-required').append('Required');
    return false;
  }else{
    console.log('all fields have a value');
    // Check for previous email format error.
    var email_error_shown = jQuery('#download-verify-form-wrapper input#edit-email.error');
    //if(email_error_shown) { // Need better checking.
    if(jQuery('#download-verify-form-wrapper input#edit-email.error').length > 0) { // Need better checking.
      console.log("email error displayed");
      jQuery('#download-verify-form-wrapper input#edit-email').removeClass('error email-format');
      jQuery('.form-item-email .form-required').html('*');
      console.log("email error removed");
    }else{
      console.log("no email error displayed");
    }

    // @todo: check for characters not numbers in fname, sname
    //   - set on keypress attrib of textfield

    // @todo: check string length, set minimum

    // Check email follows a conventional format.
    var valid_email = download_verify_check_email_format(dv_email);
    if(valid_email) { // if the email is valid.
      // Get the file path.
      filepath = jQuery('span.filepath-display').html();
      console.log('filepath:'+filepath);

      // Set the cookie.
      var download_verify_cookie_display = Drupal.settings.download_verify.download_verify_cookie_display;     
      var download_verify_cookie_expiry = Drupal.settings.download_verify.download_verify_cookie_expiry; 
      if(download_verify_cookie_display == 1) {
        jQuery.cookie("downloadverifyform", "1", { expires: download_verify_cookie_expiry });
      }
      // Email the form submission.
      download_verify_send_mail(dv_fname, dv_sname, dv_email);

      // Start the file download.
      console.log("pass to dl: L208 -> filepath="+filepath);
      var download_verify_success = false;
      download_verify_success = download_verify_begin_download(filepath);

      // Close the form.
      if(download_verify_success) {
        return verifyClose();
      }

    } else {
      // Email format fail.
      jQuery('#download-verify-form-wrapper input#edit-email').addClass('error email-format');
      jQuery('.form-item-email .form-required').html('*');
      jQuery('.form-item-email .form-required').append('Incorrect Format');
      return false;
    }
  }
}

// Custom function for sending the email
function download_verify_send_mail(dv_fname, dv_sname, dv_email){
  // Get required variables.
  var download_verify_mail_script_path = Drupal.settings.download_verify.download_verify_mail_script_path;
  var download_verify_email = Drupal.settings.download_verify.download_verify_email;
  var post_string = "?dvsendto="  + download_verify_email + "&dvfname=" + dv_fname + "&dvsname=" + dv_sname + "&dvemail=" + dv_email;
  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  }else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Msxml2.XMLHTTP");
  }else{
    throw new Error("Ajax is not supported by this browser");
    console.log("Ajax not supported");
  }
  xhr.open('GET', download_verify_mail_script_path + post_string);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log("xhr.responsetext: " + xhr.responseText);
        if(xhr.responseText=='Mail sent'){
          console.log("email sent: L241");
        }else{
          console.log("email not sent: L243");
        }        
      }
    }else{
      console.log("waiting for response: L247");
    }
  }
  xhr.send(null);
}

// Called on textfield keypress to enfore characters only, no numbers.
// * Unused, need to be able to add hyphenation.
function download_verify_letters_only(evt) {
  evt = (evt) ? evt : event;
  var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode :
  ((evt.which) ? evt.which : 0));
  if (charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
    return false;
  }
  return true;
}

// Check email format conforms to xxx@xxx.xxx format.
function download_verify_check_email_format(email_address) {
  console.log("testing email");
  console.log("email: "+email_address);
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  //var filter = /\S+@\S+\.\S+/;
  if (!filter.test(email_address)) {
    console.log("email fail");
    return false;
  } else {
    console.log("email pass");
    return true;
  }
}

// Called when user already has cookie set, direct download.
// Error in Chrome console:
//    Resource interpreted as Document but transferred with MIME type application/pdf
function download_verify_begin_download(filepath) {
  // Start the file download.
  console.log("download from: " + filepath);
  var downloadURL = function downloadURL(filepath) {
    var hiddenIFrameID = 'hiddenDownloader';
    iframe = document.getElementById(hiddenIFrameID);
    if (iframe === null) {
      iframe = document.createElement('iframe');
      iframe.id = hiddenIFrameID;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }
    iframe.src = filepath;
  };
  downloadURL(filepath);

  return true;
}
