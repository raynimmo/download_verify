<div>
  <div class="form-item form-type-textfield form-item-fname">
    <label for="edit-fname">Firstname <span title="This field is required." class="form-required">*</span></label>
    <input type="text" class="form-text required" maxlength="60" size="20" value="" name="fname" id="edit-fname">
  </div>

  <div class="form-item form-type-textfield form-item-name">
    <label for="edit-sname">Surname <span title="This field is required." class="form-required">*</span></label>
    <input type="text" class="form-text required" maxlength="60" size="20" value="" name="sname" id="edit-sname">
  </div>

  <div class="form-item form-type-textfield form-item-name">
    <label for="edit-email">Email <span title="This field is required." class="form-required">*</span></label>
    <input type="text" class="form-text required" maxlength="60" size="20" value="" name="email" id="edit-email">
  </div>

  <div id="edit-actions" class="form-actions form-wrapper">
    <a class="button form-submit" id="edit-submit" onclick="validateForm();">Download</a>
    <a class="button form-cancel" id="edit-cancel"  onclick="verifyClose();">Cancel</a>
  </div>
</div>
<p class="msgbox">
  <b>Selected Download:</b><br />
  <span class="filename-display"></span>
  <span class="filepath-display"></span>
</p>