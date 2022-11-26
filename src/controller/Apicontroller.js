import pool from "../configs/connectDB"

let getAllUsers = async (req, res) => {

    const [rows, fields] = await pool.execute('SELECT * FROM user')
    return res.status(200).json({
        data : rows
    })
}
let createNewUser = async (req, res) => {

    let {firstname, lastname, email, address} = req.body;

    if (!firstname || !lastname || !email || !address) {
        return res.status(200).json({
            msg: "missing required"
        })
    }

    await pool.execute('insert into user (firstname, lastname, email, address) values (?, ?, ?, ?)', 
    [firstname, lastname, email, address]);

    return res.status(200).json({
        msg : 'ok'
    })
}

let updateUser = async (req, res) => {

    let {firstname, lastname, email, address, id} = req.body;
    
    await pool.execute('update user set firstName= ?, lastName = ? , email = ? , address= ? where id = ?',
        [firstname, lastname, email, address, id]);

    return res.status(200).json({
        msg : 'ok'
    })
}

let deleteUser = async (req, res) => {

    let userId = req.params.id;
    if(!userId) {
        return res.status(200).json({
            msg : 'error'
        })
    }
    await pool.execute('delete from user where id = ?', [userId])

    return res.status(200).json({
        msg : 'ok'
    })
}
module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}