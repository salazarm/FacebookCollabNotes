var io = require('socket.io').listen(9002);
var Parse = require('node-parse-api').Parse;
var Q = require('q');

var APP_ID = "IKqazQRognbSIXaBXhOR3edkG23W24QtvweETH2g";
var MASTER_KEY = "7IyaybDg1RDfvAMDeTQqE7HQx8CWpNJkiYinmZYc";
var parseApp = new Parse(APP_ID, MASTER_KEY);

var FBCollab ={
  parse: {
    createNewNote: function(user) {
      var response = Q.defer();
      parseApp.insert("Note", {creator_id: user.id }, function(err, data) {
        if (err) {
          response.reject( new Error("ParseAPI Error") )
        } else {
          response.resolve( data )
        }
      })
      return Q.promise;
    },
    getFriends: function(user) {
      // Parse query here
      parseApp.findMany("Users", {first: user.id  })
    },
    goOnline: function(user) {
      parseApp.update("Users", user.id, {online: true})
    }, 
    goOffline: function(user) {
      parseApp.update("Users", user.id, {online: false })
    }
  }
}

sockets_store = {
  // 'id' : socket
}


io.sockets.on('connection', function (socket) {

  socket.on("Online", function(data) {

    sockets_store[id] = socket
    socket.set("User", data)
    io.sockets.emit("UserOnline", data )
    
    friends = FBCOllab.parse.getFriends( user ) 
    if ( ) {
      // user exits


    } else {
      // store all of his data.


    }
    socket.emit(  )
  })

  socket.on('EditNote', function (data) {
    socket.get("User", function(err, name) {
      socket.emit()
    })
  });

  socket.on('InviteFriend', function(data) {

  });

  socket.on("AcceptInvite", function(data) {

  });

  socket.on("GetFriends", function(data) {

  })

  socket.on('disconnect', function () {
    socket.get("User", function(err, data) {
      delete sockets_store[id]
      io.sockets.emit('UserDisconnect', data);
    })
  });

});

