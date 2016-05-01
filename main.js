// Global variable for response
var response;

document.getElementById("live").addEventListener("click", function () {
	"use strict";
	// Change the button to reflect processing
	var element = document.getElementById("live");
	element.value = "Getting live channels...";

	// Initialize the Twitch SDK
	Twitch.init({clientId: '9mq34begvsxtxohax04bt7g1ifepnf6'}, function(error, status) {
		// the sdk is now loaded
	});
	//
	// // Login to Twitch
	Twitch.login({
		scope: ['user_read', 'channel_read'],
	});

	// Use the Twitch API
	Twitch.api({method: 'streams'}, function(error, list) {
  	console.log(list);
	});
}, false);
