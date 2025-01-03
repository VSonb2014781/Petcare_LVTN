import userService from "../services/userService";
const db = require("../models");

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Vui lòng nhập đầy đủ email và mật khẩu!",
    });
  }

  let userData = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id; //All, id
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing required parameters",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    message: "ok",
    users,
  });
};

let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};

let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.udateUserData(data);
  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  let id = req.body.id;
  if (!id) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  if (id) {
    let message = await userService.deleteUser(id);
    return res.status(200).json(message);
  }
};

let getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let postForgotPassword = async (req, res) => {
  try {
    let infor = await userService.postForgotPasswordService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let postVerifyRetrievePassword = async (req, res) => {
  try {
    let infor = await userService.postVerifyRetrievePasswordService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getUserByEmail = async (req, res) => {
  try {
    // Get email from request parameters or query
    let email = req.query.email || req.params.email;
    
    if (!email) {
      return res.status(400).json({
        errCode: 1,
        errMessage: "Missing required parameter: email",
      });
    }

    // Call the service function to get user by email
    let response = await userService.getUserByEmail(email);
    
    // Return the response to the client
    return res.status(200).json(response);

  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};



module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  getAllCode: getAllCode,
  postForgotPassword: postForgotPassword,
  postVerifyRetrievePassword: postVerifyRetrievePassword,
  getUserByEmail:getUserByEmail,
};
