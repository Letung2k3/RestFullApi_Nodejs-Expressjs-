import { where } from "sequelize";
import db from "../models/index";
import bcrypt from 'bcryptjs'
import { raw } from "body-parser";
let salt = bcrypt.genSaltSync(10);
const handleUserLogin = (email, password) => {
     return new Promise(async (resolve, reject) => {
          try {
               let userData = {
                    errorCode: "",
                    erroMessenge: "",
                    user: ""
               }
               let isExist = await checkUserEmail(email)
               if (isExist) {
                    let user = await db.User.findOne({
                         attributes: ["email", "roleId", "password"],
                         where: { email: email },
                         raw: true
                    })

                    if (user) {
                         console.log(">>>Check user.password: ", user.password)
                         let check = await bcrypt.compareSync(password, user.password);
                         if (check) {
                              userData.errorCode = 0
                              userData.erroMessenge = "OK!",
                                   delete user.password
                              userData.user = user
                         }
                         else {
                              userData.errorCode = 3
                              userData.erroMessenge = "Wrong password!"
                         }
                    } else {
                         userData.errorCode = 2
                         userData.erroMessenge = "Your's password isn't exist."
                    }
               }
               else {
                    userData.errorCode = 1
                    userData.erroMessenge = "Your's email isn't exist. Please check email again!"
               }
               resolve(userData)
          } catch (e) {
               reject(e)
          }
     })
}


const checkUserEmail = (email) => {
     return new Promise(async (resolve, reject) => {
          try {
               let result = await db.User.findOne({
                    where: { email: email }
               })

               if (result) {
                    resolve(true)
               }
               else {
                    resolve(false)
               }

          } catch (e) {
               reject(e)
          }
     })
}

let getAllUsers = (userId) => {
     return new Promise(async (resolve, reject) => {
          try {

               let users = ""
               if (userId === "ALL") {
                    users = db.User.findAll({
                         attributes: {
                              exclude: ['password']
                         }
                    });
               }
               if (userId && userId !== "ALL") {
                    users = db.User.findOne({
                         where: { id: userId },
                         attributes: {
                              exclude: ['password']
                         }
                    })
               }


               if (users) {
                    resolve(users)

               } else {
                    resolve({})
               }
          } catch (e) {
               reject(e)
          }
     })
}
let CreateNewUser = (data) => {
     return new Promise(async (resolve, reject) => {
          try {
               let check = await checkUserEmail(data.email)
               if (check === true) {
                    resolve({
                         errCode: 1,
                         errMessenge: "Your email is already in exist. Please try another email!"
                    })
               }
               else {
                    let hashPasswordBcrypt = await hashUserPassword(data.password)
                    await db.User.create(
                         {
                              fullName: data.fullName,
                              email: data.email,
                              password: hashPasswordBcrypt,
                              address: data.address,
                              gender: data.gender === "1" ? true : false,
                              phonenumber: data.phoneNumber,
                              roleId: data.roleId,
                         }
                    )
                    resolve({
                         errCode: 0,
                         errMessenge: "OK!"
                    })
               }

          } catch (e) {
               reject(e)
          }
     })
}

let hashUserPassword = (password) => {
     return new Promise(async (resolve, reject) => {
          try {
               let hashPassword = bcrypt.hashSync(password, salt);
               resolve(hashPassword)
          } catch (error) {
               reject(error)
          }
     })
}
let deleteUser = (id) => {
     return new Promise(async (resolve, reject) => {
          try {
               let user = await db.User.findOne({
                    where: { id: id }
               })

               if (!user) {
                    resolve({
                         errCode: 2,
                         errMessenge: "The user isn't exist!"
                    })
               }

               await db.User.destroy({
                    where: { id: id }
               });
               resolve({
                    errCode: 0,
                    errMessenge: "OK!"
               })
          } catch (e) {
               reject(e)
          }
     })
}
let updataUserData = (data) => {
     return new Promise(async (resolve, reject) => {
          try {
               if (!data.id) {
                    resolve({
                         errCode: 2,
                         errMessenge: "Missing required parameters!"
                    })
               }
               let user = await db.User.findOne(
                    {
                         where: { id: data.id },
                         raw: false
                    }
               )
               if (user) {
                    user.fullName = data.fullName;
                    user.address = data.address;
                    await user.save()
                    resolve({
                         errCode: 0,
                         errMessenge: "OK!"
                    })
               }
               else {
                    resolve({
                         errCode: 1,
                         errMessenge: "User not found!"
                    })
               }

          } catch (error) {
               reject(error)
          }
     })
}
export {
     handleUserLogin,
     getAllUsers,
     CreateNewUser,
     deleteUser,
     updataUserData
}