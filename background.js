// var response;
//
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//
//   // Initialize the Twitch SDK
//   Twitch.init({clientId: '9mq34begvsxtxohax04bt7g1ifepnf6'}, function(error, status) {
//       // the sdk is now loaded
//     });
//
//   // Login to Twitch
//   Twitch.login({
//       scope: ['user_read', 'channel_read']
//     });
//
//   // Use the Twitch API
//   Twitch.api({method: 'channel'}, function(error, channel) {
//     console.log(channel.stream_key);
//   });
//
//   // URL layout
//   var BASE_URL = "https://api.twitch.tv/kraken/users/";
//   var POST_URL = "/follows/channels?limit=100";
//   var url = BASE_URL + "king_jaames" + POST_URL;
//
//   post(url, function() {
//     sendResponse({farewell: response});
//   });
//
// 	return true;
// });
//
// function post(url, callback)
// {
//   var request = new XMLHttpRequest();
//   request.open("GET", "https://api.twitch.tv/kraken/streams/king_jaames", true);
//   request.onreadystatechange = function () {
//     if (request.readyState === 4 && request.status === 200) {
//       response = request.response;
//       console.log(response);
//       callback();
//     }
//   };
//   request.send(null);
// }
