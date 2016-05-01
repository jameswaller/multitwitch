// Global variable for response
var response;
var streams = [];
var multiTwitchLink = "multitwitch.tv/";

document.getElementById("multi").addEventListener("click", function () {
	var checkedStreams = document.getElementsByClassname('check');
	for (var i = 0; i < checkedStreams.length; i++)
	{
		if (checkedStreams[i].checked)
		{
			if (i == checkedStreams.length - 1)
			{
				multiTwitchLink += checkStreams[i].parent.innerHTML;
			}
			else
			{
				multiTwitchLink += checkStreams[i].parent.innerHTML + "/";
			}
		}
	}
	document.getElementById("multi").value = multiTwitchLink;
});

document.getElementById("live").addEventListener("click", function () {
	"use strict";
	// Change the button to reflect processing
	//this.disabled = true;
	var element = document.getElementById("live");
	element.value = "Getting live channels...";

	init(function(){
		getLiveUsers(function(){
			streams = response.streams;
			populatePage();
			document.getElementbyId("multi").disabled = false;
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
		console.log("removing node");
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
		var cb = document.createElement('input');
    cb.type = 'checkbox';
		cb.className = 'check';
		p.appendChild(cb);
		div.appendChild(p);
		document.getElementById("streams").appendChild(div);
	}
}
