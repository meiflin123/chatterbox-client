
app = {};

var message = {
    username: 'Samwise the class shepherd',
    text: $('body'),
    roomname: '4chan'
};

$.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('success', data);
      for (var i = 0; i < data.results.length; i++) {
        if (data.results[i].text === undefined ){
            continue;
        }
        if (data.results[i].text.indexOf('<') > -1 ){
              continue;
        }
        var $message = $('<div class="chatMessage"></div>')  
        $message.append(data.results[i].text + ' - ' + data.results[i].username)
        $('#chats').append($message);
      }
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });

//   $.ajax({
//     // This is the url you should use to communicate with the parse API server.
//     url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
//     type: 'POST',
//     data: JSON.stringify(message),
//     contentType: 'application/json',
//     success: function (data) {
//       console.log('success', data);
//       for (var i = 0; i < data.results.length; i++) {
//         var $message = $('<div class="chatMessage"></div>')  
//         $message.append(data.results[i].text)
//         $('#chats').append($message);
//       }
//     },
//     error: function (data) {
//       // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//       console.error('chatterbox: Failed to send message', data);
//     }
//   });

$(document).ready(function() {


});

