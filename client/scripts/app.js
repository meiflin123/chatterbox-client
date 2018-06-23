
var App = function() {
  this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages'
}
var app = new App();

var message = {
  username: 'Samwise the class shepherd',
  text: 'no input',
  roomname: '4chan'
};
var savedData;
var roomnames = [];
var userIdentity;
var friends = [];


app.init = function() {
  
};

app.send = function(message) {
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

app.fetch = function(callback) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: {order: '-createdAt'},
    contentType: 'application/json',
    success: function (data) {
      savedData = data;
      callback(data);
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
var userClicked = [];



app.renderMessage = function(message, user, roomName) {
  if (arguments.length === 1) {
    app.clearMessages()
    var $message = $('<div class="chatMessage"></div>');
    var $userClick = $('<a href= "#" class ="username" ></a>');
    $userClick.append(message.username);
    $message.append(message.text);
    $message.append($userClick);
    $('#chats').prepend($message);
    $('#main').unbind().click('.username', app.handleUsernameClick );
     return;
  }
  if (message === undefined || message.indexOf('<') > -1) {
        return;
    }
  if (roomnames.indexOf(roomName) === -1) {
    var $roomname = $('<option></option>');
    $roomname.val(roomName);
    $roomname.append(roomName);
    $('select').append($roomname);
    roomnames.push(roomName);
  }

    var $message = $('<div class="chatMessage" ></div>');
    var $userClick = $('<a href= "#" class ="username" ></a>');

    
    $('#main').unbind().click('.username', app.handleUsernameClick );
  
    
    $userClick.append(user);
    $message.append(message);
    $message.append($userClick);
    $('#chats').prepend($message);
};

app.renderRoom = function(roomName) {
  roomName = JSON.stringify(roomName);
  var $roomOption = $('<option></option>');
  if (roomnames.indexOf(roomName) === -1) {
    $roomOption.append(roomName);
    $('#roomSelect').append($roomOption);
  }
};

app.fetch(function(data) {
    for (var i = 0; i < data.results.length; i++) {
        app.renderMessage(JSON.stringify(data.results[i].text), JSON.stringify(data.results[i].username), data.results[i].roomname );
    }
});


app.handleUsernameClick = function(event) {
  console.log('friend added');
  event.preventDefault();
  
};

app.handleSubmit = function(event){
  console.log('clickeddd');
  
  };




$(document).on('submit', '.submit', function() {
  app.handleSubmit()
})

$(document).ready(function() {
  $('select').change(function() {
    var currentRoom = $('option:selected').val();
    $('#chats').html('');
    for (var i = 0; i < savedData.results.length; i++) {
      var $message = $('<div class="chatMessage"></div>'); 
      var $userClick = $('<a href= "#" class ="userClick"></a>');

      if (friends.indexOf(userClicked) === -1) {
          friends.push(userClicked);
          $userClick.addClass('friend');
      }
      $userClick.append(savedData.results[i].username)
      $message.append(savedData.results[i].text + ' - ');
      $message.append($userClick);
      if (savedData.results[i].roomname === currentRoom) {

        $('#chats').append($message);
      }
      
      if (currentRoom === 'All Rooms') {
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
  
  
  $('#message').keypress(function (key) {
    if (key.which === 13) {
      $('#message').val('');
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
    app.clearMessages();
    app.fetch(function(data) {
      for (var i = 0; i < data.results.length; i++) {
          app.renderMessage(JSON.stringify(data.results[i].text), JSON.stringify(data.results[i].username), data.results[i].roomname );
      }
    });
   
  });
  
});










