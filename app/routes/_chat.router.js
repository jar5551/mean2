/**
 * Created by jarek on 02/11/2016.
 */

import Chat from '../models/chat.model';

export default (app, router) => {
  router.route('/chat')

    .post((req, res) => {

      Chat.create({

        message : req.body.message,
        author : req.body.author

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

        res.json(message);

      });
    })

    .get((req, res) => {
      Chat.find((err, todo) => {

        if(err)
          res.send(err);

        else
          res.json(todo);
      });
    });
};