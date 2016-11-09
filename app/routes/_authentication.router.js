// ```
// _authentication.router.js
// (c) 2016 David Newman
// david.r.niciforovic@gmail.com
// _authentication.router.js may be freely distributed under the MIT license
// ```

// */app/routes/_authentication.router.js*

// GET    */api/auth/user*        Get user data from session object in
//                                Node

// GET    */api/auth/loggedin*    Route to test if the user is logged in
//                                or not

// POST   */api/auth/login*       Route to login

// POST   */api/auth/logout*      Route to logout and redirect to the
//                                appropriate view

// ## Authentication API object

// Load user model
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

// Load the Mongoose ObjectId function to cast string as
// ObjectId
let ObjectId = require('mongoose').Types.ObjectId;

export default (app, router, passport, auth, admin, jwtOptions) => {

  // ### Authentication API Routes

  // Route to test if the user is logged in or not
  router.get('/auth/loggedIn', (req, res) => {

    // If the user is authenticated, return a user object
    // else return 0
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  // Route to log a user in
  router.post('/auth/login', (req, res, next) => {

    // Call `authenticate()` from within the route handler, rather than
    // as a route middleware. This gives the callback access to the `req`
    // and `res` object through closure.

    // If authentication fails, `user` will be set to `false`. If an
    // exception occured, `err` will be set. `info` contains a message
    // set within the Local Passport strategy.
    passport.authenticate('local-login', (err, user, info) => {

      if (err)
        return next(err);

      // If no user is returned...
      if (!user) {

        // Set HTTP status code `401 Unauthorized`
        res.status(401);

        // Return the info message
        return next(info.loginMessage);
      }

      // Use login function exposed by Passport to establish a login
      // session
      req.login(user, (err) => {

        if (err)
          return next(err);

        // Set HTTP status code `200 OK`
        res.status(200);

        // Return the user object
        res.send(req.user);
      });

    })(req, res, next);
  });

  router.post('/auth/signup', (req, res, next) => {

    // Call `authenticate()` from within the route handler, rather than
    // as a route middleware. This gives the callback access to the `req`
    // and `res` object through closure.

    // If authentication fails, `user` will be set to `false`. If an
    // exception occured, `err` will be set. `info` contains a message
    // set within the Local Passport strategy.
    passport.authenticate('local-signup', (err, user, info) => {

      if (err)
        return next(err);

      // If no user is returned...
      if (!user) {

        // Set HTTP status code `401 Unauthorized`
        res.status(401);

        // Return the info message
        return next(info.signupMessage);
      }

      // Set HTTP status code `204 No Content`
      res.sendStatus(204);

    })(req, res, next);
  });

  // Route to log a user out
  router.post('/auth/logout', (req, res) => {

    req.logOut();

    // Even though the logout was successful, send the status code
    // `401` to be intercepted and reroute the user to the appropriate
    // page
    res.sendStatus(401);
  });

  // Route to get the current user
  // The `auth` middleware was passed in to this function from `routes.js`
  router.get('/auth/user', auth, (req, res) => {

    // Send response in JSON to allow disassembly of object by functions
    res.json(req.user);
  });

  // Route to delete a user. Accepts a url parameter in the form of a
  // username, user email, or mongoose object id.
  // The `admin` Express middleware was passed in from `routes.js`
  router.delete('/auth/delete/:uid', admin, (req, res) => {

    User.remove({

      // Model.find `$or` Mongoose condition
      $or: [

        {'local.username': req.params.uid},

        {'local.email': req.params.uid},

        {'_id': ObjectId(req.params.uid)}
      ]
    }, (err) => {

      // If there are any errors, return them
      if (err)
        return next(err);

      // HTTP Status code `204 No Content`
      res.sendStatus(204);
    });
  });

  router.get('/auth/setup', (req, res) => {

    User.create({
      username: 'user11',
      password: 'password',
      email: 'user11@test.pl',
    }, (err, message) => {
      if (err)
        res.send(err);

      res.json(message);

    });

  });

  router.get('/auth/users', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.find((err, users) => {
      if (err)
        res.send(err);

      else
        res.json(users);
    });
  });

  router.post('/auth/login2', (req, res) => {

    let login = new User({
      username: req.body.username,
      password: req.body.password
    });


    User.findOne({'username': login.username}, (err, user) => {

      if (err)
        res.send(err);

      else {
        /*if (user.password === login.password) {
         res.json({'error': false});
         } else {
         res.json({'error': true});
         }*/

        res.json({'user': user});

      }

    });
  });

  router.post('/auth/test/login', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {

      if (err)
        return next(err);

      // If no user is returned...
      if (!user) {

        // Set HTTP status code `401 Unauthorized`
        res.status(401);

        // Return the info message
        return next(info.loginMessage);
      }

      // Use login function exposed by Passport to establish a login
      // session
      req.login(user, (err) => {

        if (err)
          return next(err);

        // Set HTTP status code `200 OK`
        res.status(200);

        // Return the user object
        var payload = {id: user.id};
        var token = jwt.sign(payload, jwtOptions.secretOrKey, {
          expiresIn: 60
        });

        res.json({message: "ok", token: token});
      });

    })(req, res, next);

    /*User.findOne({

      // Model.find `$or` Mongoose condition
      $or : [

        { 'username' : username.toLowerCase() },

        { 'email' : username.toLowerCase() }
      ]
    }, (err, user) => {

      // If there are any errors, return the error before anything
      // else
      if (err) {
        res.send(err);
      }


      // If no user is found, return a message
      if (!user) {
        res.status(401).json({message: "no such user found"});
        return next("no such user found");
      }

      // If the user is found but the password is incorrect
      if (!user.validPassword(password)) {
        res.status(401).json({message: "passwords did not match"});
      }

      var payload = {id: user.id};
      var token = jwt.sign(payload, jwtOptions.secretOrKey);

      res.json({message: "ok", token: token});

      // Otherwise all is well; return successful user
      //return done(null, user);



    });*/

  });

};
