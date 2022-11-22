import pool from "../configs/connectDB";

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
    await pool.execute(`update user set firstname = ${firstname}, lastname = ${lastname} , email = ${email} , address = ${address} where id = ${id}`);
    // [firstname, lastname, email, address, id]
    return res.redirect('/');
}
module.exports = {
    getHomepage,
    getDetailpage,
    createNewUser,
    deleteUser,
    getEditUser,
    postUpdateUser
}