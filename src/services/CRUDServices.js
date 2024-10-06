import bcrypt from 'bcrypt'
import db from '../models/index';
import { raw } from 'body-parser';
import { where } from 'sequelize';
let salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
     return new Promise(async (resolve, reject) => {
          try {
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
               resolve("OK! create a new user succeed")

          } catch (error) {
               reject(error)
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

let getAllUsers = async () => {
     let users = await db.User.findAll({
          raw: true
     });
     return users;
}

let getUserInfoById = async (id) => {
     return new Promise(async (resolve, reject) => {
          try {
               let user = await db.User.findOne({
                    where: { id: id },
                    raw: true
               })

               if (user) {
                    resolve(user)
               }
               else {
                    resolve([])
               }

          } catch (error) {
               reject(error)
          }
     })
}

let updateUserData = (data) => {
     console.log("...Check id:", data.id)
     return new Promise(async (resolve, reject) => {
          try {
               let user = await db.User.findOne(
                    {
                         where: { id: data.id }
                    }
               )
               if (user) {
                    user.fullName = data.fullName;
                    user.address = data.address;
                    await user.save();
                    resolve("Update done!")
               }
               else {
                    resolve("Not found user!")
               }

          } catch (error) {
               reject(error)
          }
     })
}

let deleteUserById = (id) => {
     return new Promise(async (resolve, reject) => {
          try {
               let user = await db.User.findOne(
                    {
                         where: { id: id }
                    }
               )
               if (user) {
                    await user.destroy()
               }
               resolve("Delete done!")
          } catch (error) {
               reject(error)
          }
     })
}
export {
     createNewUser,
     getAllUsers,
     getUserInfoById,
     updateUserData,
     deleteUserById
}
