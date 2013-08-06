/**
 * @file
 * Javascript functions for Download Verify module.
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

  // Main form content containing fields for firstname, secondname, email address and a submit button
  // Form contains development element span.filepath-display - remove from production
  /* TODO : make it better!
      options: - construct the form using DOM methods
               - can Webform help?
  */
  Drupal.theme.prototype.download_verify_form_wrapper = function() {
    return '<div><div class="form-item form-type-textfield form-item-fname"><label for="edit-fname">Firstname <span title="This field is required." class="form-required">*</span></label><input type="text" class="form-text required" maxlength="60" size="20" value="" name="fname" id="edit-fname"></div><div class="form-item form-type-textfield form-item-name"><label for="edit-sname">Surname <span title="This field is required." class="form-required">*</span></label><input type="text" class="form-text required" maxlength="60" size="20" value="" name="sname" id="edit-sname"></div><div class="form-item form-type-textfield form-item-name"><label for="edit-email">Email <span title="This field is required." class="form-required">*</span></label><input type="text" class="form-text required" maxlength="60" size="20" value="" name="email" id="edit-email"></div><div id="edit-actions" class="form-actions form-wrapper"><a class="button form-submit" id="edit-submit" onclick="validateForm();">Download</a><a class="button form-cancel" id="edit-cancel"  onclick="verifyClose();">Cancel</a></div></div><p class="msgbox"><b>Selected Download:</b><br /><span class="filename-display"></span><span class="filepath-display"></span></p>';

  }

  // onload, do this.
  Drupal.behaviors.download_verify = {

    attach: function (context, settings) {
      //console.log("download_verify js loaded");
      //get settings
      var download_verify_css_target = Drupal.settings.download_verify.download_verify_css_target;
      var download_verify_email = Drupal.settings.download_verify.download_verify_email;
      var download_verify_intro_text = Drupal.settings.download_verify.download_verify_intro_text;
      var download_verify_footer_text = Drupal.settings.download_verify.download_verify_footer_text;

      // set up the form
      var introtext = Drupal.theme('download_verify_intro_text_wrapper', download_verify_intro_text);
      var footertext = Drupal.theme('download_verify_footer_text_wrapper', download_verify_footer_text);
      var theform = Drupal.theme('download_verify_form_wrapper');

      //var verifyForm = '<div id="verify-form">target:' + download_verify_css_target + "<br />" + introtext + theform + footertext + "</div>";
      var verifyForm = '<div id="verify-form">' + introtext + theform + footertext + "</div>";
      var isOpen;
      var filepath;

      //hijack the pdf clicks
      $('.' + download_verify_css_target +' a').click(function(event){

        //TODO: check for cookie on users machine

        // if [user-has-filled-form-before]

          // =>continue the download

        // else if [user-has-not-filled-form-before]

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

      }); // end pdf click hijack
    } // end function:attach

    /*
    verifyClose: function verifyClose() {
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
    */

  } // end Drupal.behaviours.download_verify

}(jQuery)); // end onload


  //called by 'cancel' btn
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




  //called from html form element'onsubmit' attrib
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
      //TODO: check for characters not numbers in fname, sname
      //TODO: check string length, set minimum
      //TODO: regex to check email follows correct format

      //get the file path
      filepath = jQuery('span.filepath-display').html();
      console.log('filepath:'+filepath);

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

  }
