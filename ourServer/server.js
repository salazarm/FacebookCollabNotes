var io = require('socket.io').listen(9002);
var Parse = require('node-parse-api').Parse;
var Q = require('q');
var _ = require('underscore')

var APP_ID = "IKqazQRognbSIXaBXhOR3edkG23W24QtvweETH2g";
var MASTER_KEY = "7IyaybDg1RDfvAMDeTQqE7HQx8CWpNJkiYinmZYc";
var parseApp = new Parse(APP_ID, MASTER_KEY);




var FBCollab = {

  parse: {

    getUser: function(fbUser) {
      var response = Q.defer();

      parseApp.findOne("Users", fbUser.id, function(err, data) {
        if(err) {
          response.resolve( false )
        } else {
          response.resolve( true )
        }
      });

      return response.promise
    },
    
    registerUser: function(fbUser) {
      var response = Q.defer();

      parseApp.insert("RegisteredUsers", {fb_id: fbUser.id }, function(err, data) {
        if (err) {
          response.reject( new Error("ParseAPI Error") )
        } else {
          response.resolve( true )
        }
      });

      return Q.promise;
    },

    createNewNote: function(fbUser) {

      var response = Q.defer();

      parseApp.insert("Notes", {creator_id: user.id }, function(err, data) {
        if (err) {
          response.reject( new Error("ParseAPI Error") )
        } else {
          response.resolve( data )
        }
      });

      return Q.promise;
    },


    getFriends: function(fbUser) {
      // Parse query here
      var response = Q.defer();

      parseApp.findMany("Friendships", { first: user.id  }, function(err, data) {
        if (err) {
          response.reject(  new Error("ParseAPI Error")  );
        } else {
          // for( )
        }
      });

      return Q.promise
    },
    goOnline: function(fbUser) {
      parseApp.update("Users", user.id, {online: true})
    }, 
    goOffline: function(fbUser) {
      parseApp.update("Users", user.id, {online: false })
    }
  }
}

sockets_store = {
  // 'id' : socket
}


io.sockets.on('connection', function (socket) {


  /*
    If this person is not a "RegisteredUser" then register them.
    Broadcast their information to everyone. Clients will handle whether or not they
    care depending on whether or not they are friends with the person. Return friends
  */
  socket.on("Online", function(data) {

    /*
      check if this person is a registered user
    */

    sockets_store[id] = socket
    socket.set("User", data)
    io.sockets.emit("UserOnline", data )

    friends = FBCOllab.parse.getFriends( user ) 
    if ( friends ) {
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
    /*
      Check if we have the 
    */

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



