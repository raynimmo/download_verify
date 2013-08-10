/**
 * @file
 * Javascript functions for Download Verify module.
 */

/**
 * Onload handler.
 */
(function ($) {
  /**
   * Intro section of text on slide-out panel.
   */
  Drupal.theme.prototype.download_verify_intro_text_wrapper = function(download_verify_intro_text) {
    return '<p class="small">' + download_verify_intro_text + '</p>';
  };

  // Footer section of text on slide-out panel with optional link.
  // TODO : use token replacement for {privacy-policy} link.
  Drupal.theme.prototype.download_verify_footer_text_wrapper = function(download_verify_footer_text) {
    return '<p class="small">' + download_verify_footer_text + '</p>';
  };

  /**
   * Form textfield for first name.
   */
  Drupal.theme.prototype.download_verify_form_fname = function() {
    var element = '<div class="form-item form-type-textfield form-item-fname">'
                  + '<label for="edit-fname">First name <span title="This field is required." class="form-required">*</span></label>'
                  + '<input type="text" class="form-text required" maxlength="60" size="20" value="" name="fname" id="edit-fname" />'
                  + '</div>';
    return element;
  };

  /**
   * Form textfield for surname.
   */
  Drupal.theme.prototype.download_verify_form_sname = function() {
    var element = '<div class="form-item form-type-textfield form-item-sname">'
                  + '<label for="edit-sname">Surname <span title="This field is required." class="form-required">*</span></label>'
                  + '<input type="text" class="form-text required" maxlength="60" size="20" value="" name="sname" id="edit-sname" />'
                  + '</div>';
    return element;
  };

  /**
   * Form textfield for email address.
   */
  Drupal.theme.prototype.download_verify_form_email = function() {
    var element = '<div class="form-item form-type-textfield form-item-email">'
                  + '<label for="edit-email">E-mail <span title="This field is required." class="form-required">*</span></label>'
                  + '<input type="text" class="form-text required" maxlength="60" size="20" value="" name="email" id="edit-email" />'
                  + '</div>';
    return element;
  };

  /**
   * Form action buttons.
   */
  Drupal.theme.prototype.download_verify_form_actions = function() {
    var element = '<div id="edit-actions" class="form-actions form-wrapper">'
                  + '<a class="button form-submit" id="edit-submit" href="#" onclick="Drupal.behaviors.download_verify_validate_form();">Download</a>'
                  + '<a class="button form-cancel" id="edit-cancel" href="#" onclick="Drupal.behaviors.download_verify_close();">Cancel</a>'
                  + '</div>';
    return element;
  };

  /**
   * Form UI feedback.
   */
  Drupal.theme.prototype.download_verify_form_feedback = function() {
    var element = '<p class="msgbox"><b>Selected Download:</b><br />'
                  + '<span class="filename-display"></span><span class="filepath-display"></span>'
                  + '</p>';
    return element;
  };

  /**
   * Form constructor.
   */
  Drupal.theme.prototype.download_verify_ui_form = function() {
    var the_form = '<div>'
             + Drupal.theme('download_verify_form_fname')
             + Drupal.theme('download_verify_form_sname')
             + Drupal.theme('download_verify_form_email')
             + Drupal.theme('download_verify_form_actions')
             + Drupal.theme('download_verify_form_feedback')
             + '</div>';
    return the_form;
  };

  /**
   * Configure for the module.
   *
   * Retrieve all settings and attach onclick handlers to targetted links
   */
  Drupal.behaviors.download_verify = {

    attach: function (context, settings) {
      // Get the settings.
      var download_verify_css_target = Drupal.settings.download_verify.download_verify_css_target;
      var download_verify_email = Drupal.settings.download_verify.download_verify_email;
      var download_verify_intro_text = Drupal.settings.download_verify.download_verify_intro_text;
      var download_verify_footer_text = Drupal.settings.download_verify.download_verify_footer_text;
      var download_verify_cookie_display = Drupal.settings.download_verify.download_verify_cookie_display;
      if(download_verify_cookie_display != 0) {
        var download_verify_cookie_expiry = Drupal.settings.download_verify.download_verify_cookie_expiry;
      }

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
        if(download_verify_cookie_display == '1') {
          console.log("cookies enabled");
          var existing_cookie = jQuery.cookie("downloadverifyform");
          console.log("cookie query: " + existing_cookie);
        }
        // User already has cookie set indicating previous form completion.
        if(existing_cookie && download_verify_cookie_display!=0){
          console.log("has cookie already: " + existing_cookie);
          console.log("pass to dl: L129 -> filepath="+filepath);
          Drupal.behaviors.download_verify_file_handler(filepath);
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
    },
  };


  /**
   * Form close and remove.
   */  
  Drupal.behaviors.download_verify_close = function(context) {
    var isOpen = true;
    console.log("dvc close");
    $('#download-verify-form-wrapper').slideUp(600, function() {
      $('#download-verify-form-wrapper').remove();
      isOpen = false;
    });
    return isOpen;
  };


  /**
   * Form submit validation.
   */
  Drupal.behaviors.download_verify_validate_form = function(context) {
    // Extract values from textfields and sanitize.
    // @todo: replace Id's with specific class names.
    var dv_fname = Drupal.checkPlain($('#edit-fname').val());
    var dv_sname = Drupal.checkPlain($('#edit-sname').val());
    var dv_email = Drupal.checkPlain($('#edit-email').val());

    // Check for empty fields.
    if((dv_fname.length==0)||(dv_sname.length==0)||(dv_email.length==0)){

      console.log('at least one empty field');
      // @todo: detect which one is empty
      // Show errors.
      Drupal.behaviors.download_verify_form_errors_show();
      return false;

    } else {

      console.log('all fields have a value');
      // Check for previous email format error.
      var email_error_shown = $('#download-verify-form-wrapper input#edit-email.error');

      //if(email_error_shown) { // Need better checking.
      if($('#download-verify-form-wrapper input#edit-email.error').length > 0) { // Need better checking.
        console.log("email error displayed");
        Drupal.behaviors.download_verify_form_errors_clear();
      }else{
        console.log("no email error displayed");
      }

      // @todo: check for characters not numbers in fname, sname
      //   - set on keypress attrib of textfield

      // @todo: check string length, set minimum

      // Check email follows a conventional format.
      var valid_email = Drupal.behaviors.download_verify_check_email_format(dv_email);
      
      if(valid_email) { // if the email is valid.
        // Get the file path.
        filepath = $('span.filepath-display').html();
        console.log('filepath:'+filepath);

        // Set the cookie.
        var download_verify_cookie_display = Drupal.settings.download_verify.download_verify_cookie_display;     
        var download_verify_cookie_expiry = Drupal.settings.download_verify.download_verify_cookie_expiry; 

        if(download_verify_cookie_display == 1) {
          $.cookie("downloadverifyform", "1", { expires: download_verify_cookie_expiry });
        }

        // Email the form submission.
        Drupal.behaviors.download_verify_send_mail(dv_fname, dv_sname, dv_email);

        // Start the file download.
        console.log("pass to dl: L208 -> filepath="+filepath);
        var download_verify_success = false;
        download_verify_success = Drupal.behaviors.download_verify_file_handler(filepath);

        // Close the form.
        if(download_verify_success) {
          Drupal.behaviors.download_verify_close();
        }

      } else {
        // Email format fail.
        Drupal.behaviors.download_verify_form_errors_show_email();
        return false;
      }
    }
  };

  /**
   * Form error display on all fields.
   */
  Drupal.behaviors.download_verify_form_errors_show = function(context) {
    $('#download-verify-form-wrapper input[type=text]').addClass('error');
    $('.form-required').html('*');
    $('.form-required').append('Required');
  };

  /**
   * Form error display on email field
   */
  Drupal.behaviors.download_verify_form_errors_show_email = function(context) {
    $('#download-verify-form-wrapper input#edit-email').addClass('error email-format');
    $('.form-item-email .form-required').html('*');
    $('.form-item-email .form-required').append('Incorrect Format');
  };

  /**
   * Clear form errors.
   */
  Drupal.behaviors.download_verify_form_errors_clear = function(context) {
    $('#download-verify-form-wrapper input#edit-email').removeClass('error email-format');
    $('.form-item-email .form-required').html('*');
    console.log("email error removed");
  };

  /**
   * Check email format follows a common format of xxx@xxx.xxx
   */
  Drupal.behaviors.download_verify_check_email_format = function(submitted_email) {
    console.log("Testing submitted email address : " + submitted_email);
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(submitted_email)) {
      console.log("email fail");
      return false;
    } else {
      console.log("email pass");
      return true;
    }
  };

  /**
   * Function for sending email in the background.
   */
  Drupal.behaviors.download_verify_send_mail = function(dv_fname, dv_sname, dv_email) {
    // Get required variables.
    var download_verify_mail_script_path = Drupal.settings.download_verify.download_verify_mail_script_path;
    console.log("mailscript path : " + Drupal.settings.download_verify.download_verify_mail_script_path);
    var download_verify_email = Drupal.settings.download_verify.download_verify_email;
    var post_string = "?dvsendto="  + download_verify_email + "&dvfname=" + dv_fname + "&dvsname=" + dv_sname + "&dvemail=" + dv_email;
    // Set up the xhr object
    var xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    }else if (window.ActiveXObject) {
      xhr = new ActiveXObject("Msxml2.XMLHTTP");
    }else{
      throw new Error("Ajax is not supported by this browser");
      console.log("Ajax not supported");
    }
    // Get the file path.
    xhr.open('GET', download_verify_mail_script_path + post_string);
    // Check the ready states.
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
  };

  /**
   * File download handler.
   * 
   * Function creates an iframe element and appends the filepath to this to begin the file download
   * Error in Chrome console:
   * - Resource interpreted as Document but transferred with MIME type application/pdfjavascript set content type header
   */
  Drupal.behaviors.download_verify_file_handler = function(filepath) {
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
  };

  /**
   * Textfield validation.
   *
   * Called on textfield keypress to enfore characters only, no numbers.
   * - Currently nused, need to be able to add hyphenation, etc.
   */
   Drupal.behaviors.download_verify_validate_textfield = function(evt) {
    evt = (event) ? evt : event;
    var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode :
    ((evt.which) ? evt.which : 0));
    if (charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
      return false;
    }
    return true;
   };

}(jQuery));
