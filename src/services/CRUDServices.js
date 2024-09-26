import bcrypt from 'bcrypt'
import db from '../models/index';
import { raw } from 'body-parser';
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
export {
     createNewUser,
     getAllUsers
}
