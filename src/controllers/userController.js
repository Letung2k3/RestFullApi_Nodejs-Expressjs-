
import { handleUserLogin, getAllUsers, CreateNewUser, updataUserData, deleteUser } from "../services/userServices";
const handleLogin = async (req, res) => {
     let email = req.body.email;
     let password = req.body.password
     if (!email || !password) {
          return res.status(500).json({
               errorCode: 1,
               errMessenge: "Missing found data!"
          })
     }

     let userData = await handleUserLogin(email, password)
     return res.status(200).json(
          {
               userErrorCode: userData.errorCode,
               userErrormessenge: userData.erroMessenge,
               user: userData.user ? userData.user : {}
          }
     );
}

let handleGetAllUsers = async (req, res) => {
     let id = req.query.id;
     if (!id) {
          return res.status(500).json({
               errCode: 1,
               errMessenge: "Missing required parameters",
               users: []
          })
     }
     let users = await getAllUsers(id)
     return res.status(200).json({
          errCode: 0,
          errMessenge: "OK!",
          users
     })
}
let handleCreateNewUser = async (req, res) => {
     let messenger = await CreateNewUser(req.body)
     return res.status(200).json({
          messenger
     })
}
let handleEditUser = async (req, res) => {
     let data = req.body
     let messenge = await updataUserData(data)
     return res.status(200).json({
          messenge
     })
}
let handleDeleteUser = async (req, res) => {
     if (!req.body.id) {
          return res.status(200).json({
               errCode: 1,
               errMessenge: "Missing required parameters"
          })
     }
     let messenger = await deleteUser(req.body.id)
     return res.status(200).json({
          messenger
     })
}
export {
     handleLogin,
     handleGetAllUsers,
     handleCreateNewUser,
     handleEditUser,
     handleDeleteUser
}