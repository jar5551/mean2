/**
 * Created by jarek on 08/11/2016.
 */

export default (passportJWT) => {

  let ExtractJwt = passportJWT.ExtractJwt;
  var jwtOptions = {};
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
  jwtOptions.secretOrKey = 'tasmanianDevil';
}


