import connection from "../configs/connectDB";

let getHomepage = (req, res) => {

    let data = [];
    connection.query(
        'SELECT * FROM `user`',
        function(err, results, fields) {
          console.log('check');
          console.log(results); // results contains rows returned by server
          data = results.map(row => (row))
        }
    );
    return res.render('index.ejs', {dataUser: JSON.stringify(data)})
}
let getAboutpage = (req, res) => {
    res.send('hello 1')
}

module.exports = {
    getHomepage,
    getAboutpage
}