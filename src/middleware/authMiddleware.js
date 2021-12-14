const { verifyAccessToken} = require('../services/jwt');
const ApiError = require('../utils/ApiError');

function authMiddleware(req, res, next) {
  const accessToken = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';
  try {
    if (accessToken == null || accessToken == "") {
        // res.status(401).json({message:"Access token required"});
        throw new ApiError("Access token Invalid",401);
      }
    const user = verifyAccessToken(accessToken);

    if (user._id && user.email){
         console.log('autorizado')
    }

    next();
  } catch ({ message, statusCode }) {
    res.status(401).json({message:"Access token Invalid"});
  }
}

module.exports = {
  authMiddleware,
};


//app.post("/welcome", auth, (req, res) => {
//    res.status(200).send("Welcome 🙌 ");
// });