
let app = {};

app.init = function() {
  
};

app.send = function() {
  $.ajax({
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('success', data);
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      savedData = data;
      console.log('success', data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.clearMessages = function() {
  $('#chats').html('');
};

app.renderMessage = function() {
  for (var i = 0; i < savedData.results.length; i++) {
    var $message = $('<div class="chatMessage"></div>') ; 
    $message.append(savedData.results[i].text + ' - ' + savedData.results[i].username);
    $('#chats').append($message);
      
  }
};


var message = {
  username: 'Samwise the class shepherd',
  text: 'no input',
  roomname: '4chan'
};
var savedData;
var roomnames = [];
$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  type: 'GET',
  contentType: 'application/json',
  success: function (data) {
    savedData = data;
    console.log('success', data);
    for (var i = 0; i < data.results.length; i++) {
      if (data.results[i].text === undefined ) {
        continue;
      }
      if (data.results[i].text.indexOf('<') > -1 ) {
        continue;
      }
      if (roomnames.indexOf(data.results[i].roomname) === -1) {
        var $roomname = $('<option></option>');
        $roomname.val(data.results[i].roomname);
        $roomname.append(data.results[i].roomname);
        $('select').append($roomname);
        roomnames.push(data.results[i].roomname);
      }

      var $message = $('<div class="chatMessage"></div>'); 
      $message.append(data.results[i].text + ' - ' + data.results[i].username);
      $('#chats').append($message);
    }
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
});



var userIdentity;

$(document).ready(function() {
  $('select').change(function() {
    var currentRoom = $('option:selected').val();
    $('#chats').html('');
    for (var i = 0; i < savedData.results.length; i++) {
      var $message = $('<div class="chatMessage"></div>') ; 
      if (savedData.results[i].roomname === currentRoom) {
        $message.append(savedData.results[i].text + ' - ' + savedData.results[i].username);
        $('#chats').append($message);
      }
    }
  });
  
  $('.CreateARoom').keypress(function (key) {
    if (key.which === 13) {
      var userRoom = $('.CreateARoom').val();
      var $roomOption = $('<option></option>');
      if (roomnames.indexOf(userRoom) === -1) {
        $roomOption.append(userRoom);
        $('select').append($roomOption);
      }
      $('.CreateARoom').val('');
    }
  });
  
  $('.userInput').keypress(function (key) {
    if (key.which === 13) {
      var userData = $('.userInput').val();
      userIdentity = $('.userInput').val();
      $('.userInputData').append(userIdentity);
      $('.userInput').val('');
    }
  });
  
  
  $('.PostMessage').keypress(function (key) {
    if (key.which === 13) {
      $('.PostMessage').val('');
      var messageData = {
        username: JSON.stringify(userIdentity),
        text: JSON.stringify( $('.PostMessage').val() ),
        roomname: '4chan'
      };
      $.ajax({
        url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
        type: 'POST',
        data: JSON.stringify(messageData),
        contentType: 'application/json',
        success: function (data) {
          console.log('success', data);
        },
        error: function (data) {
          console.error('chatterbox: Failed to send message', data);
        }
      });
    }
  });
  $('.user').click(function() {
    var userData = $('.userInput').val();
    userIdentity = $('.userInput').val();
    $('.userInputData').append(userIdentity);
    $('.userInput').val('');
  });
  
  $('.refresh').click(function() {
    $.ajax({
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        savedData = data;
        console.log('success', data);
        $('#chats').html('');
        for (var i = 0; i < data.results.length; i++) {
          if (data.results[i].text === undefined ) {
            continue;
          }
          if (data.results[i].text.indexOf('<') > -1 ) {
            continue;
          }
          if (roomnames.indexOf(data.results[i].roomname) === -1) {
            var $roomname = $('<option></option>');
            $roomname.val(data.results[i].roomname);
            $roomname.append(data.results[i].roomname);
            $('select').append($roomname);
            roomnames.push(data.results[i].roomname);
          }

          var $message = $('<div class="chatMessage"></div>'); 
          $message.append(data.results[i].text + ' - ' + data.results[i].username);
          $('#chats').append($message);
        }
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  });
  
});










