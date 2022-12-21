/* dependencies */
const { Router } = require("express");
const dotenv = require("dotenv");
const loginHandler = require("../../controllers/auth/getSignIn");
const signupHandler = require("../../controllers/auth/getSignup");
const registerHandler = require("../../controllers/auth/getSignupController");
const htmlResponse = require("../../middlewares/common/html");
const avatarUploader = require("../../middlewares/auth/avatarUpload");
const { check } = require("express-validator");
const User = require("../../models/auth/UserModel");
const signupValidator = require("../../middlewares/auth/signupValidator");
const signupValidateResult = require("../../middlewares/auth/signupValidateResult");
const confirmationHandler = require("../../controllers/auth/confirmation");
const loginController = require("../../controllers/auth/loginController");
const loginValidator = require("../../middlewares/auth/loginValidator");
const loginValidatorResult = require("../../middlewares/auth/loginValidateResult");
const loginChecker = require("../../middlewares/common/loginChecker");
const logoutHandler = require("../../middlewares/auth/logoutHandler");
const getResetPassword = require("../../controllers/auth/getResetPassword");
const resetPasswordController = require("../../controllers/auth/resetPasswordController");
const resetPasswordValidator = require("../../middlewares/auth/resetPasswordValidator");
const resetPasswordResult = require("../../middlewares/auth/resetPasswordResult");
const verifyOtp = require("../../controllers/auth/verifyOtp");
const updatePassword = require("../../controllers/auth/updatePassword");
const updatePasswordValidator = require("../../middlewares/auth/updatePasswordValidator");
const updatePasswordResult = require("../../middlewares/auth/updatePasswordResult");
const checkUserName = require("../../controllers/auth/checkUserName");
const checkEmail = require("../../controllers/auth/checkEmail");

/* config */
dotenv.config();
const authRoute = Router();

/* get login page */
authRoute.get(
  "/login",
  htmlResponse(`Login -${process.env.APP_NAME}`),
  loginChecker,
  loginHandler
);

/* login controller */
authRoute.post(
  "/login",
  htmlResponse(`Login -${process.env.APP_NAME}`),
  loginValidator(),
  loginValidatorResult,
  loginController
);

/* get register page */
authRoute.get(
  "/signup",
  htmlResponse(`Signup -${process.env.APP_NAME}`),
  loginChecker,
  signupHandler
);

//register user
authRoute.post(
  "/signup",
  htmlResponse(`Signup -${process.env.APP_NAME}`),
  avatarUploader,
  signupValidator(),
  signupValidateResult,
  registerHandler
);

//confirm verified user
authRoute.get(
  "/emailconfirmation/:id",
  htmlResponse(`Confirmation -${process.env.APP_NAME}`),
  confirmationHandler
);

//logout route
authRoute.get("/logout", logoutHandler);

/* get reset password page */
authRoute.get(
  "/resetpassword",
  htmlResponse(`Reset password -${process.env.APP_NAME}`),
  getResetPassword
);

/* reset password */
authRoute.post(
  "/resetpassword",
  htmlResponse(`Verify password -${process.env.APP_NAME}`),
  resetPasswordValidator(),
  resetPasswordResult,
  resetPasswordController
);

/* verify otp controller */
authRoute.post(
  "/verifyOtp",
  htmlResponse(`Verify password -${process.env.APP_NAME}`),
  verifyOtp
);

/* create Or update password */
authRoute.post(
  "/createNewPassword",
  htmlResponse(`Update password -${process.env.APP_NAME}`),
  updatePasswordValidator(),
  updatePasswordResult,
  updatePassword
);

/* check username */
authRoute.get("/checkuser/:username", checkUserName);

/* check email */
authRoute.get("/checkemail/:email", checkEmail);

//export auth route
module.exports = authRoute;
