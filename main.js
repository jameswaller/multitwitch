// Global variable for response
var response;
var streams = [];

document.getElementById("live").addEventListener("click", function () {
	"use strict";
	// Change the button to reflect processing
	var element = document.getElementById("live");
	element.value = "Getting live channels...";

	init(function(){
		getLiveUsers(function(){
			streams = response.streams;
			element.value = "Done";
			populatePage();
		})
	})
}, false);

function init(callback)
{
	// Initialize the Twitch SDK
	Twitch.init({clientId: '9mq34begvsxtxohax04bt7g1ifepnf6'}, function(error, status) {
		if (error) {
			console.log(error);
		}
		if (!status.authenticated) {
			// // Login to Twitch
			Twitch.login({
				scope: ['user_read', 'channel_read'],
			});
		}
		callback();
	});
}
function getLiveUsers(callback)
{
	// Use the Twitch API
	Twitch.api({method: 'streams/followed', params: {stream_type: 'live'}}, function(error, list) {
		response = list;
		callback();
	});
}

function populatePage()
{
	for (var i = 0; i < streams.length; i++)
	{
		var div = document.createElement('DIV');
		div.class = "streamer";
		var img = document.createElement('IMG');
		img.src = streams[i].preview.medium;
		div.appendChild(img);
		document.getElementById("streams").appendChild(div);
	}
}
