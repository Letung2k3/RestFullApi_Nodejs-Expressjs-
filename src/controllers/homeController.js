import connection from "../configs/connectDB";

const getHomePage = async (req, res) => {
     try {
          let [rows, fields] = await connection.execute('SELECT * FROM city LIMIT 30');
          let data = rows;
          return res.render('Home.ejs', { data: data });
     } catch (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
     }
};

const getDetailpage = async (req, res) => {
     let id = req.params.id;
     try {
          let [results, fields] = await connection.execute('SELECT * FROM city WHERE ID = ?', [id]);
          return res.send(JSON.stringify(results));
     } catch (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
     }
};

const uploadFile = (req, res) => {
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
     getDetailpage,
     getDataDelete,
     postNewCountry,
     deleteCountry,
     getDataEdit,
     updateCountry,
     uploadFile,
     handleUploadFile,
     handleUploadMultipleFiles
};
