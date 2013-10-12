/* ------------ Create the button ----------- */

var notesButton = document.createElement('span');
notesButton.innerHTML = '<div class="uiToggle fbJewel west" id="fbNotesJewel"><!-- Button --><a class="jewelButton" aria-labelledby="notificationsCountWrapper" href="#" rel="toggle" role="button" name="notifications" data-target="fbNotificationsFlyout" aria-haspopup="true" aria-owns="fbNotificationsFlyout"><i class="jewelButtonHcm img sp_2wq8dq sx_431e81"></i><span class="jewelCount" id="notesCountWrapper"><span id="notesCountValue">0</span></span></a><!-- Flyout window --><div class="jewelFlyout fbJewelFlyout uiToggleFlyout" id="fbNotesFlyout"><!-- Part of the flyout interface --><div class="jewelBeeperHeader"><div class="beeperNubWrapper"><div class="beeperNub"></div></div></div><!-- Flyout header --><div class="uiHeader uiHeaderBottomBorder jewelHeader"><div class="clearfix uiHeaderTop"><div><h3 class="uiHeaderTitle" aria-hidden="true">Notes</h3></div></div></div><div class="_33p"><div id="u_0_17"><div class="_50-t"><div class="uiScrollableArea fade uiScrollableAreaWithShadow contentAfter" style="height: 335px;" width="430" height="335"><div class="uiScrollableAreaWrap scrollable"><div class="uiScrollableAreaBody" style="width: 430px;"><div class="uiScrollableAreaContent"><ul id="notes_list"></ul></div></div></div><div class="uiScrollableAreaTrack invisible_elem" style="opacity: 0;"><div class="uiScrollableAreaGripper" style="height: 150.8639455782313px; top: 0px;"></div></div></div></div></div></div><div class="jewelFooter"><a class="seeMore" href="https://www.facebook.com/notifications" accesskey="5"><span>See All</span></a></div></div></div>';

var jewelContainer = document.getElementById('jewelContainer')
jewelContainer.insertBefore(notesButton, jewelContainer.firstChild);

document.getElementById('fbNotesJewel').onclick = function() {
	document.getElementById('notesCountValue').innerHTML = "0";
	document.getElementById('fbNotesJewel').className = "uiToggle fbJewel west";
};


/* ------------ Add a notification ----------- */

function notify(url, img, bodyText, time) {

	var notification = document.createElement('span');
	notification.innerHTML = '<li class="_33c"><div class="anchorContainer"><a href="'+url+'" ajaxify="'+url+'" class="_33e"><div class="clearfix"><div class="lfloat"><img src="'+img+'" class="img _8o _8r _33h" alt=""></div><div class=""><div class=" _42ef _8u"><div class="clearfix"><div class=""><div class="_42ef"><div class="_4l_v"><span>'+bodyText+'</span><div class="clearfix _33f"><div class="lfloat"><img src="http://www.example.com/icon_iamge.jpg" class="img _8o _8r" alt=""></div><div class=""><div class=" _42ef _8u"><span><abbr class="_33g" title="'+time+'"></abbr></span></div></div></div></div></div></div></div></div></div></div></div></li>';

	var notesList = document.getElementById('notes_list')
	notesList.insertBefore(notification, notesList.firstChild)

	var notesCount = document.getElementById('notesCountValue');
	notesCount.innerHTML = parseInt(notesCount.innerHTML) + 1;

	document.getElementById('fbNotesJewel').className += " hasNew hasCountSmall";

}