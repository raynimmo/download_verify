********************************************************************
                     D R U P A L    M O D U L E
********************************************************************
Name: Download Verify
Author: Ray Nimmo <ray at junglecreative dot com>
Author URL: http://www.junglecreative.com
Drupal: 7

********************************************************************
DEVELOPMENT SPONSOR:

Module development has been sponsored by
James Hargreaves Bathrooms
http://www.jhbathrooms.com

********************************************************************
DESCRIPTION:

Module for adding a form for collecting email address before a
download can be completed.

The module works by using JavaScript to inject the form into the
websites theme files by searching for specific hooks in the CSS.

The data submitted is emailed to an address specified by the site
administrator within the module configuration panel.

********************************************************************
INSTALLATION:


1. Place the entire Download Verify directory into your Drupal
   modules directory (normally sites/default/modules).

2. Enable the module by navigating to:

     Admin > Modules

3. If you want anyone besides the administrative user to be able
   to configure the Download Verify (usually a bad idea), they must
   be given the "administer download verify" access permission:

     Admin > People > Permissions

   When the module is enabled and the user has the "administer
   download verify" permission, an "Download Verify" menu should
   appear under 'Admin > Structure' in the menu system.

********************************************************************
