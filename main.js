// Global variable for response
var response;
var streams = [];

document.getElementById("live").addEventListener("click", function () {
	"use strict";
	// Change the button to reflect processing
	//this.disabled = true;
	var element = document.getElementById("live");
	element.value = "Getting live channels...";

	init(function(){
		getLiveUsers(function(){
			streams = response.streams;
			element.value = "Current Live Channels";
			populatePage();
		})
	})
}, false);

function init(callback)
{
	// Initialize the Twitch SDK
	Twitch.init({clientId: '9mq34begvsxtxohax04bt7g1ifepnf6'}, function(error, status) {
		if (error) {
			Twitch.login({
				scope: ['user_read', 'channel_read'],
			});
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
	var current = document.getElementById("streams");
	var currentChildren = current.children;
	while (currentChildren.length != 0)
	{
		current.removeChild(currentChildren[0]);
	}
	for (var i = 0; i < streams.length; i++)
	{
		var div = document.createElement('DIV');
		div.className = "streamer";
		var img = document.createElement('IMG');
		img.src = streams[i].preview.medium;
		div.appendChild(img);
		var p = document.createElement('P');
		p.className = "streamtext";
		p.innerHTML = streams[i].channel.name;
		div.appendChild(p);
		document.getElementById("streams").appendChild(div);
	}
}
