import pool from "../configs/connectDB";
import multer from 'multer';

let getHomepage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `user`');
    // console.log('check',rows);
    return res.render('index.ejs', {dataUser: rows})
}

let getDetailpage = async (req, res) => {
    let userId = req.params.id;
    let [user] = await pool.execute('select * from user where id = ? ', [userId])
    return res.send(JSON.stringify(user))
}

let createNewUser = async (req, res) => {
    let {firstname,lastname,email,address} = req.body
    await pool.execute('insert into user (firstname, lastname, email, address) values (?, ?, ?, ?)', 
    [firstname, lastname, email, address]);

    return res.redirect('/')
} 

let deleteUser = async (req,res) => {
    let userId = req.body.userId;
    await pool.execute('delete from user where id = ?', [userId])  
    return res.redirect('/')
}
let getEditUser = async (req,res) => {
    let ids = req.params.id;
    let [user] = await pool.execute('select * from user where id = ?', [ids])
    return res.render('updateUser.ejs', {dataUser: user[0]});
}
let postUpdateUser = async (req,res) => {
    let {firstname, lastname, email, address, id} = req.body;
    console.log('check', req.body);
    // await pool.execute(`update user set firstname = ${firstname}, lastname = ${lastname} , email = ${email} , address = ${address} where id = ${id}`);
    await pool.execute('update user set firstName= ?, lastName = ? , email = ? , address= ? where id = ?',
        [firstname, lastname, email, address, id]);
    // [firstname, lastname, email, address, id]
    return res.redirect('/');
}

let getUploadFile = async (req, res) => {
    return res.render('uploadfile.ejs')
}

// 'profile_pic' is the name of our file input field in the HTML form
const upload = multer().single('profile_pic');
// const uploadMultiple = multer().array('multiple_images')

let handleUploadFile = async (req, res) => {
    console.log(req.file);
    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    });
    // return res.render('uploadfile.ejs')
}

let handleUploadMultipleFiles =  async (req, res) => {
    
        console.log(req.files)
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.files) {
            return res.send('Please select an image to upload');
        } // The same as when uploading single images
        // else if (err instanceof multer.MulterError) {
        //     return res.send(err)
        // }
        // else if (err) {
        //     return res.send(err)
        // }

        let result = "You have uploaded these images: <hr />";
        const files = req.files;
        let index, len;

        // Loop through all the uploaded images and display them on frontend
        for (index = 0, len = files.length; index < len; ++index) {
            result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
        }
        result += '<hr/><a href="/upload-file">Upload more images</a>';
        res.send(result);
}
module.exports = {
    getHomepage,
    getDetailpage,
    createNewUser,
    deleteUser,
    getEditUser,
    postUpdateUser,
    getUploadFile,
    handleUploadFile,
    handleUploadMultipleFiles
}