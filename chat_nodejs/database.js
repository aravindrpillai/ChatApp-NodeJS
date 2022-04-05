const mysql = require("mysql");

var connection = mysql.createConnection({
    host:"localhost",
    user:"aravind",
    password:"dbpassword",
    database:"chat"
});

connection.connect((err) => {
    if(err){
        console.log("DB Connection Failed : "+JSON.stringify(err))
    }else{
        console.log("DB Conection successful")
    }
});

module.exports = {connection};
