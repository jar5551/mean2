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
import InvalidToken from '../models/inalid-token.model';

// Load the Mongoose ObjectId function to cast string as
// ObjectId
let ObjectId = require('mongoose').Types.ObjectId;


export default (app, router, passport, auth, admin, jwt) => {
  // Middleware for doing stuff with tokens, TODO put into some better place
  function tokenExtract(req, res, next) {
    let token = req.headers.authorization.split(' ')[1];
    req.jwtDecode = jwt.decode(token);
    req.jwt = token;
    next();
  }

  // ### Authentication API Routes

  // Route to test if the user is logged in or not
  router.get('/auth/loggedIn', (req, res) => {

    // If the user is authenticated, return a user object
    // else return 0
    res.send(req.isAuthenticated() ? req.user : '0');
  });


  router.post('/auth/login', (req, res, next) => {
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

        res.json({message: "ok", token: user});
      });

    })(req, res, next);

  });

  router.get('/auth/me', passport.authenticate('jwt', {session: false}), tokenExtract, (req, res, next) => {
    let id = req.jwtDecode.id;

    User.findById(id, 'username email', (err, user) => {
      if (err)
        res.send(err);
      else {
        res.json({'user': user});
      }

    });
  });

  // Route to log a user in
  /*router.post('/old/auth/login', (req, res, next) => {

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
   });*/

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
      //res.sendStatus(204);
      res.json({
        status: 'ok',
        message: 'Your account has been created successfully and is ready to use'
      });

    })(req, res, next);
  });

  // Route to log a user out
  router.post('/auth/logout', passport.authenticate('jwt', {session: false}), tokenExtract, (req, res) => {
    InvalidToken.create({
      token: req.jwt,
      expiresAt: parseInt(req.jwtDecode.exp + '000')
    }, (err, message) => {
      if (err)
        res.send(err);

      //res.sendStatus(401);
      res.json(message);
    });
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

  router.get('/auth/users', passport.authenticate('jwt', {session: false}), (req, res) => {
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

  router.post('/auth/change-password', passport.authenticate('jwt', {session: false}), tokenExtract, (req, res) => {

    let newPassword = req.body.newpassword;

    console.log(newPassword);
    User.update({_id: req.jwtDecode.id}, {
      password: newPassword,
      passwordDate: Date.now
    }, (err, numberAffected, rawResponse) => {
      console.log(newPassword);

      res.json({'numberAffected': numberAffected, 'rawResponse': rawResponse});

    });

  });

}
;
