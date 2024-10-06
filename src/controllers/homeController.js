
import { render } from "ejs";
import db from "../models/index";
import {
     createNewUser,
     getAllUsers,
     getUserInfoById,
     updateUserData,
     deleteUserById
} from "../services/CRUDServices";
let getHomePage = async (req, res) => {
     let data = await db.User.findAll();
     return res.render('Home.ejs', { data: data })
};

let getHomeCRUD = async (req, res) => {
     return res.render('crud.ejs')
};

let getEditCRUD = async (req, res) => {
     let userId = req.params.id;
     if (userId) {
          let userData = await getUserInfoById(userId)
          return res.render("editCRUD.ejs", { user: userData })
     }
     else {
          return res.send("Not Found Data!")
     }
}

let postCRUD = async (req, res) => {
     let messenger = await createNewUser(req.body);
     return res.send(messenger)
}
let deleteCRUD = async (req, res) => {
     let id = req.params.id;
     console.log(id);
     await deleteUserById(id);
     return res.redirect('/get-crud')
}

let putCRUD = async (req, res) => {
     let user = req.body;
     await updateUserData(user)
     return res.send("Update done!")
}

let displayGetCRUD = async (req, res) => {
     let results = await getAllUsers();
     return res.render("displayCrud.ejs", { data: results })
}

let uploadFile = (req, res) => {
     return res.render('uploadFile.ejs')
}


let handleUploadFile = async (req, res) => {

     if (req.fileValidationError) {

          return res.send(req.fileValidationError);
     }
     else if (!req.file) {
          return res.send('Please select an image to upload');
     }

     // Display uploaded image for user validation
     res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
     // });
}


let handleUploadMultipleFiles = async (req, res) => {

     if (req.fileValidationError) {
          return res.send(req.fileValidationError);
     }
     else if (!req.files) {
          return res.send('Please select an image to upload');
     }

     let result = "You have uploaded these images: <hr />";
     const files = req.files;
     let index, len;

     // Loop through all the uploaded images and display them on frontend
     for (index = 0, len = files.length; index < len; ++index) {
          result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
     }
     result += '<hr/><a href="/upload">Upload more images</a>';
     res.send(result);

}
export {
     getHomePage,
     getHomeCRUD,
     uploadFile,
     handleUploadFile,
     handleUploadMultipleFiles,
     postCRUD,
     displayGetCRUD,
     getEditCRUD,
     putCRUD,
     deleteCRUD
};
