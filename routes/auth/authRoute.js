// Dependencies
const { Router } = require('express');
const dotenv = require('dotenv');
const { getSignIn, getSignUp, signupController } = require('../../controllers/auth/authControllers');
const htmlResponse = require('../../middlewares/common/htmlResponse');
const avatarUpload = require('../../middlewares/auth/avatarUpload');



// Router
const router = Router();


// App Initialization and Config
dotenv.config();




// Get Sign In Page 
router.get('/signin', htmlResponse(`Signin - ${process.env.APP_NAME}`), getSignIn)



// Get Sign Up Page 
router.get('/signup', htmlResponse(`Signup - ${process.env.APP_NAME}`), getSignUp)



// Post Sign Up Page Controller
router.post('/signup', htmlResponse(`Signup - ${process.env.APP_NAME}`), avatarUpload, signupController)



// Module Export
module.exports = router;