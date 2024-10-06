import express from 'express';
import {
     getHomePage,
     getHomeCRUD,
     postCRUD,
     displayGetCRUD,
     getEditCRUD,
     putCRUD,
     deleteCRUD
} from '../controllers/homeController';
import {
     handleLogin,
     handleGetAllUsers,
     handleCreateNewUser,
     handleEditUser,
     handleDeleteUser
} from '../controllers/userController'
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');
const router = express.Router();

const storage = multer.diskStorage({
     destination: function (req, file, cb) {
          cb(null, appRoot + "/src/public/image/");

     },

     // By default, multer removes file extensions so let's add them back
     filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
     }
});


const imageFilter = function (req, file, cb) {
     // Accept images only
     if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
          req.fileValidationError = 'Only image files are allowed!';
          return cb(new Error('Only image files are allowed!'), false);
     }
     cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

let uploadMultipleFiles = multer({ storage: storage, fileFilter: imageFilter }).array('multiple_images', 3);

const initWebRoute = (app) => {
     router.get('/', getHomePage);
     router.get('/crud', getHomeCRUD);
     router.get('/get-crud', displayGetCRUD);
     router.get('/edit-crud/:id', getEditCRUD)
     router.post('/post-crud', postCRUD);
     router.post('/put-crud', putCRUD);
     router.get('/delete-crud/:id', deleteCRUD);

     router.post('/api/login', handleLogin)
     router.get('/api/get-all-users', handleGetAllUsers)
     router.post('/api/create-new-user', handleCreateNewUser)
     router.put('/api/edit-user', handleEditUser)
     router.delete('/api/delete-user', handleDeleteUser)
     return app.use('/', router);
};

export default initWebRoute;
