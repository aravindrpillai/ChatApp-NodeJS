const db = require("../database");

function validateLogin(req, res){
    let username = req.body['username'];
    let password = req.body['password'];
    let response= { 
        'status': true, 
        'message': 'success'
    };
    if((username == null || username == '') || (password == null || password == '')){
        response['message'] = 'Missing Username/Password';
        response['status'] = false;
        res.send(response);
        return;
    }

    let query = "Select id, username, name, email, online from users where username = '".concat(username).concat("' and password = '").concat(password).concat("'");
    
    try {
        db.connection.query(query , (err, rows, fields) => {
            if(err){
                response['message'] = err["sqlMessage"];
                response['status'] = false;
            }else{
                if(rows.length == 0){
                    response['message'] = 'Invalid Username / Password';
                    response['status'] = false;
                }else{
                    req.session.userID = rows[0]['id'];
                    req.session.name = rows[0]['name'];
                    req.session.username = rows[0]['username'];
                    req.session.email = rows[0]['email'];
                    req.session.online = rows[0]['online'];
                    let moment = require('moment');
                    req.session.lastUpdatedTime = moment().format('yyyy-mm-dd:hh:mm:ss');
                }
            }
            res.send(response);
        });    
    } catch (error) {
        response['message'] = error.message;
        response['status'] = false;
        res.send(response);
    }    
}


module.exports = { validateLogin };
