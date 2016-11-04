// ```
// base.js
// (c) 2015 David Newman
// david.r.niciforovic@gmail.com
// base.js may be freely distributed under the MIT license
// ```

// *base.js*

// This file contains the most basic functionality for server Socket.io
// functionality.

import Chat from '../app/models/chat.model';


export default (io) => {

  console.log(io);

  io.sockets.on('connect', (socket) => {

    console.log('a user connected');

    socket.on('disconnect', () => {

      console.log('a user disconnected');
    });

    socket.on('create', (data) => {
      console.log('create', data);

      Chat.create({

        message : data.message,
        author : data.author

      }, (err, message) => {

        if (err)
          res.send(err);

        // DEBUG
        console.log(`Message created: ${message}`);

        /*Chat.find((err, messages) => {
         if(err)
         res.send(err);

         res.json(messages);
         });*/


      });
    })
  });

};
