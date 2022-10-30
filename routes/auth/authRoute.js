// Dependencies
const { Router } = require("express");
const dotenv = require("dotenv");
const signupController = require("../../controllers/auth/signupController");
const htmlResponse = require("../../middlewares/common/htmlResponse");
const avatarUpload = require("../../middlewares/auth/avatarUpload");
const signupValidator = require("../../middlewares/auth/signupValidator");
const signupDataValidationResult = require("../../middlewares/auth/signupDataValidationResult");
const getSignIn = require("../../controllers/auth/getSignIn");
const getSignUp = require("../../controllers/auth/getSignUp");
const emailConfirmation = require("../../controllers/auth/emailconfirmation");
const signinDataValidator = require("../../controllers/auth/signinDataValidator");
const signInValidation = require("../../controllers/auth/signInValidation");
const signinController = require("../../controllers/auth/signInController");
const loginChecker = require("../../middlewares/common/loginChecker");
const logout = require("../../controllers/auth/logoutController");
const getResetPasswordPage = require("../../controllers/auth/getResetPasswordPage");
const getResetPasswordOTP = require("../../controllers/auth/getResetPasswordOTP");
const verifyOTP = require("../../controllers/auth/verifyOTP");

// Router
const router = Router();

// App Initialization and Config
dotenv.config();

// Get Sign In Page
router.get(
  "/signin",
  htmlResponse(`Signin - ${process.env.APP_NAME}`),
  loginChecker,
  getSignIn
);

// Get Sign Up Page
router.get(
  "/signup",
  htmlResponse(`Signup - ${process.env.APP_NAME}`),
  loginChecker,
  getSignUp
);

// Post Sign Up Page Controller
router.post(
  "/signup",
  htmlResponse(`Signup - ${process.env.APP_NAME}`),
  avatarUpload,
  signupValidator(),
  signupDataValidationResult,
  signupController
);

// Post Sign In Page Controller
router.post(
  "/signin",
  htmlResponse(`SignIn - ${process.env.APP_NAME}`),
  signinDataValidator(),
  signInValidation,
  signinController
);

// Email Confirmation
router.get("/emailConfirmation/:id", emailConfirmation);

//logout controller
router.get("/logout", logout);

// reset password or forget password controller
router.get(
  "/resetPassword",
  htmlResponse(`Reset Password - ${process.env.APP_NAME}`),
  getResetPasswordPage
);

// reset password controller
router.post(
  "/resetPassword",
  htmlResponse(`Reset Password - ${process.env.APP_NAME}`),
  getResetPasswordOTP
);

// verify otp controller
router.post(
  "/OTP-verification",
  htmlResponse(`Verify OTP - ${process.env.APP_NAME}`),
  verifyOTP
);

// Module Export
module.exports = router;
