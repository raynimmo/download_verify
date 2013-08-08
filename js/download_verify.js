/**
 * @file
 * Javascript functions for Download Verify module.
 *
 * Still a lot of thinking going on here!
 */

(function ($) {

  /*
    Form requires:
        wrapper element with set ID 'verify-form' - change to avoid clash ask @Matt for advice on available naming
        label and textfield for firstname
        label and textfield for surname
        label and textfield for email
        submit button
        cancel button
  */
  // Intro section of text on slide-out panel.
  Drupal.theme.prototype.download_verify_intro_text_wrapper = function(download_verify_intro_text) {
    return '<p class="small">' + download_verify_intro_text + '</p>';
  }

  // Footer section of text on slide-out panel with optional link
  // TODO : use token replacement for {privacy-policy} link
  Drupal.theme.prototype.download_verify_footer_text_wrapper = function(download_verify_footer_text) {
    return '<p class="small">' + download_verify_footer_text + '</p>';
  }

  // Form textfield for first name
  /*
  <div class="form-item form-type-textfield form-item-fname">
  <label for="edit-fname">First name <span title="This field is required." class="form-required">*</span></label>
  <input type="text" class="form-text required" maxlength="60" size="20" value="" name="fname" id="edit-fname"></div>
  */
  //onkeypress="return download_verify_letters_only(event);"
  Drupal.theme.prototype.download_verify_form_fname = function() {
    return '<div class="form-item form-type-textfield form-item-fname"><label for="edit-fname">First name <span title="This field is required." class="form-required">*</span></label><input type="text" class="form-text required" maxlength="60" size="20" value="" name="fname" id="edit-fname" /></div>';
  }

  // Form textfield for surname
  /*
  <div class="form-item form-type-textfield form-item-sname"><label for="edit-sname">Surname <span title="This field is required." class="form-required">*</span></label>
  <input type="text" class="form-text required" maxlength="60" size="20" value="" name="sname" id="edit-sname"></div>
  */
  //onkeypress="return download_verify_letters_only(event);"
  Drupal.theme.prototype.download_verify_form_sname = function() {
    return '<div class="form-item form-type-textfield form-item-sname"><label for="edit-sname">Surname <span title="This field is required." class="form-required">*</span></label><input type="text" class="form-text required" maxlength="60" size="20" value="" name="sname" id="edit-sname" /></div>';
  }

  // Form textfield for email address
  /*
  <div class="form-item form-type-textfield form-item-name"><label for="edit-email">Email <span title="This field is required." class="form-required">*</span></label>
  <input type="text" class="form-text required" maxlength="60" size="20" value="" name="email" id="edit-email"></div>
  */
  Drupal.theme.prototype.download_verify_form_email = function() {
    return '<div class="form-item form-type-textfield form-item-email"><label for="edit-email">Email <span title="This field is required." class="form-required">*</span></label><input type="text" class="form-text required" maxlength="60" size="20" value="" name="email" id="edit-email" /></div>';
  }

  // Form action buttons
  /*
  <div id="edit-actions" class="form-actions form-wrapper">
  <a class="button form-submit" id="edit-submit" onclick="validateForm();">Download</a>
  <a class="button form-cancel" id="edit-cancel"  onclick="verifyClose();">Cancel</a>
  </div>
  */

  Drupal.theme.prototype.download_verify_form_actions = function() {
    return '<div id="edit-actions" class="form-actions form-wrapper"><a class="button form-submit" id="edit-submit" onclick="validateForm();">Download</a><a class="button form-cancel" id="edit-cancel"  onclick="verifyClose();">Cancel</a></div>';
  }
  /*
  Drupal.theme.prototype.download_verify_form_actions = function() {
    return '<div id="edit-actions" class="form-actions form-wrapper"><input type="submit" value="Download" id="download-verify-submit" class="button form-submit" /><input type="reset" value="Cancel" id="download-verify-cancel" class="button form-submit" /></div>';
  }
  */
  // Form UI feedback
  /*
  <p class="msgbox"><b>Selected Download:</b><br /><span class="filename-display"></span><span class="filepath-display"></span></p>';
  */
  Drupal.theme.prototype.download_verify_form_feedback = function() {
    return '<p class="msgbox"><b>Selected Download:</b><br /><span class="filename-display"></span><span class="filepath-display"></span></p>';
  }

  Drupal.theme.prototype.download_verify_ui_form = function() {
    var the_form;
    //the_form = '<form accept-charset="UTF-8" id="download-verify-ui-form" method="POST" action="download_verify_standalone_mail_form_function.php" onsubmit="return validateForm();" onreset="return verifyClose();"><div>'
    //the_form = '<form accept-charset="UTF-8" id="download-verify-ui-form" method="" action=""><div>'
    //the_form = '<form accept-charset="UTF-8" id="download-verify-ui-form" method="POST" action="#" onsubmit="return validateForm();" onreset="return verifyClose();"><div>'
    the_form = '<div>'
             + Drupal.theme('download_verify_form_fname')
             + Drupal.theme('download_verify_form_sname')
             + Drupal.theme('download_verify_form_email')
             + Drupal.theme('download_verify_form_actions')
             + Drupal.theme('download_verify_form_feedback')
             + '</div>';
    //         + '</div></form>';
    return the_form;
  }


  // Main form content containing fields for firstname, secondname, email address and a submit button
  // Form contains development element span.filepath-display - remove from production
  /* TODO : clean this up!
      options: - construct the form using DOM methods?
               - can Webform help?
               - prototype elements?
  */
  /*Drupal.theme.prototype.download_verify_form_wrapper = function() {
    return '<div><div class="form-item form-type-textfield form-item-fname"><label for="edit-fname">First name <span title="This field is required." class="form-required">*</span></label><input type="text" class="form-text required" maxlength="60" size="20" value="" name="fname" id="edit-fname"></div><div class="form-item form-type-textfield form-item-name"><label for="edit-sname">Surname <span title="This field is required." class="form-required">*</span></label><input type="text" class="form-text required" maxlength="60" size="20" value="" name="sname" id="edit-sname"></div><div class="form-item form-type-textfield form-item-name"><label for="edit-email">Email <span title="This field is required." class="form-required">*</span></label><input type="text" class="form-text required" maxlength="60" size="20" value="" name="email" id="edit-email"></div><div id="edit-actions" class="form-actions form-wrapper"><a class="button form-submit" id="edit-submit" onclick="validateForm();">Download</a><a class="button form-cancel" id="edit-cancel"  onclick="verifyClose();">Cancel</a></div></div><p class="msgbox"><b>Selected Download:</b><br /><span class="filename-display"></span><span class="filepath-display"></span></p>';

  }
  */

  // onload, do this.
  Drupal.behaviors.download_verify = {

    attach: function (context, settings) {
      //console.log("download_verify js loaded");
      //get settings
      var download_verify_css_target = Drupal.settings.download_verify.download_verify_css_target;
      var download_verify_email = Drupal.settings.download_verify.download_verify_email;
      var download_verify_intro_text = Drupal.settings.download_verify.download_verify_intro_text;
      var download_verify_footer_text = Drupal.settings.download_verify.download_verify_footer_text;
      //var download_verify_ui_form = Drupal.settings.download_verify.download_verify_ui_form;
      var download_verify_cookie_display = Drupal.settings.download_verify.download_verify_cookie_display;
      var download_verify_cookie_expiry = Drupal.settings.download_verify.download_verify_cookie_expiry;

      // set up the form
      var introtext = Drupal.theme('download_verify_intro_text_wrapper', download_verify_intro_text);
      var footertext = Drupal.theme('download_verify_footer_text_wrapper', download_verify_footer_text);
      var theform = Drupal.theme('download_verify_ui_form');
      //var theform = download_verify_ui_form();

      //var verifyForm = '<div id="verify-form">target:' + download_verify_css_target + "<br />" + introtext + theform + footertext + "</div>";
      var verifyForm = '<div id="verify-form">' + introtext + theform + footertext + "</div>";
      var isOpen;
      var filepath;

      //hijack the pdf clicks
      $('.' + download_verify_css_target +' a', context).click(function(event){

        // Check for cookie on users machine
        if(download_verify_cookie_display ==1) {
          var existing_cookie = jQuery.cookie("downloadverifyform");
        }

        // User already has cookie set indicating previous form completion
        if(existing_cookie && download_verify_cookie_display!=0){
          console.log("downloadverify cookie already exists");
          console.log("current cookie settings:" + existing_cookie + " - " + download_verify_cookie_expiry);
          console.log("download start - bypass form");
          download_verify_begin_download($(this).attr('href'));

        }else{
          // No cookie found on the users system
          event.preventDefault();

          //check if the form is open
          if($('#verify-form').length > 0){
            isOpen = true;
            //console.log("isOpen");
          }else{
            isOpen = false;
            //console.log("isNotOpen");
          }

          if(!isOpen) {
            //get the target file
            filepath = $(this).attr('href');
            filename = $(this).html();

            //console.log('pdf HREF:'+filepath);
            //console.log('pdf filename:'+filename);

            //attach form content to link container element
            $('.' + download_verify_css_target).append(verifyForm);

            //display selected
            $('span.filename-display').append(filename);
            // Hidden file path used to pass variable to function : not ideal - refactor
            $('span.filepath-display').append(filepath);
            //slide it out
            $('#verify-form').slideDown(600, function(){
              isOpen = true;
            });

          }else if(isOpen) {
            //clear the target file
            $('span.filename-display').empty();
            $('span.filepath-display').empty();

            //change the PDF target filepath
            filepath = $(this).attr('href');
            filename = $(this).html();

            //display selected
            $('span.filename-display').append(filename);
            $('span.filepath-display').append(filepath);

            //console.log('pdf HREF:'+filepath);
            //console.log('pdf filename:'+filename);
          }
        } // end cookie if/else
      }); // end pdf click hijack
    } // end function:attach
  } // end Drupal.behaviours.download_verify
}(jQuery)); // end onload




// Called by 'cancel' btn
function verifyClose(){
  var isOpen=true;
  console.log('close the form');
  //slide it back up
  jQuery('#verify-form').slideUp(600,function(){
    //ditch the form
    jQuery('#verify-form').remove();
    isOpen = false;
  });
  return isOpen; //is this required?
}

// Called from html form element'onsubmit' attrib
function validateForm(){
  //event.preventDefault();
  //check for empty fields
  //TODO: all inputs need sanitized
  var fname = jQuery('#edit-fname').val();
  var sname = jQuery('#edit-sname').val();
  var email = jQuery('#edit-email').val();
  if((fname.length==0)||(sname.length==0)||(email.length==0)){
    console.log('at least one empty field');
    //TODO: detect which one is empty
    //show errors
    jQuery('#verify-form input[type=text]').addClass('error');
    jQuery('.form-required').html('*');
    jQuery('.form-required').append('Required');
    return false;
  }else{
    console.log('all fields have a value');
    //check for previous email format error
    var email_error_shown = jQuery('#verify-form input#edit-email.error.email-format');
    if(email_error_shown) {
      console.log("email error displayed");
      jQuery('#verify-form input#edit-email').removeClass('error email-format');
      jQuery('.form-item-email .form-required').html('*');
      console.log("email error removed");
    }else{
      console.log("no email error");
    }

    //TODO: check for characters not numbers in fname, sname
    //   - set on keypress attrib of textfield

    //TODO: check string length, set minimum

    // Check email follows a conventional format
    var valid_email = download_verify_check_email_format(email);
    if(valid_email) { // if the email is valid
      //get the file path
      filepath = jQuery('span.filepath-display').html();
      console.log('filepath:'+filepath);

      var download_verify_cookie_display = Drupal.settings.download_verify.download_verify_cookie_display;
      //var download_verify_cookie_expiry = Drupal.settings.download_verify.download_verify_cookie_expiry;

      //var download_verify_mail_script_path = Drupal.settings.download_verify.download_verify_mail_script_path;
      //console.log("mailscript path:" + download_verify_mail_script_path);

      //console.log("cookie check at save: " + download_verify_cookie_display + " - " + download_verify_cookie_expiry);

      //set the cookie
      //user_cookie_save(array('downloadverifyform' => '1'));
      if(download_verify_cookie_display == 1) {
        jQuery.cookie("downloadverifyform", "1", { expires: download_verify_cookie_expiry });
      }
      //email details
      //get the send-to address
      //var download_verify_email = Drupal.settings.download_verify.download_verify_email;
      //console.log("email send to:" + download_verify_email);

      download_verify_send_mail(fname, sname, email);

      //start the file download
      var downloadURL = function downloadURL(filepath) {
        var hiddenIFrameID = 'hiddenDownloader';
        iframe = document.getElementById(hiddenIFrameID);
        if (iframe === null) {
          iframe = document.createElement('iframe');
          iframe.id = hiddenIFrameID;
          iframe.style.display = 'none';
          document.body.appendChild(iframe);
        }
        console.log("begin download");
        iframe.src = filepath;
      };
      downloadURL(filepath);      

      //return true;
      //close the form
      return verifyClose();

    } else {
      //email format fail
      jQuery('#verify-form input#edit-email').addClass('error email-format');
      jQuery('.form-item-email .form-required').html('*');
      jQuery('.form-item-email .form-required').append('Incorrect Format');
      return false;
    }
  }
}

// Custom function for sending the email
/*
function download_verify_send_mail(download_verify_email) {

  return true;
}
*/
function download_verify_send_mail(fname, sname, email){
  
  /*
  var guestname=$('#guestname').val();
  var guestemail=$('#guestemail').val();
  var agency=$('#agency').val();
  */
  console.log("mail data: " + fname + " " + sname + ", " + email);

  var download_verify_mail_script_path = Drupal.settings.download_verify.download_verify_mail_script_path;
  console.log("mailscript path:" + download_verify_mail_script_path);

  var download_verify_email = Drupal.settings.download_verify.download_verify_email;
  console.log("email send to:" + download_verify_email);

  var post_string="?address="+download_verify_email+"&fname="+fname+"&sname="+sname+"&email="+email;

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
        //alert("email sent")
        console.log("email sent: 354");
      }
    }else{
      console.log("email not sent: 357");
    }
  }
  xhr.send(null);
}



// Called on textfield keypress to enfore characters only, no numbers
// * Unused, need to be able to add hyphenation
function download_verify_letters_only(evt) {
  evt = (evt) ? evt : event;
  var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode :
  ((evt.which) ? evt.which : 0));
  if (charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
    //alert("Enter letters only."); //to intrusive
    return false;
  }
  return true;
}

// Check email format conforms to xxx@xxx.xxx format
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
function download_verify_begin_download(filepath){
  //event.preventDefault();
  //set a new cookie
  jQuery.cookie("downloadverifyform", "1", { expires: 365 });
  //start the file download
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
