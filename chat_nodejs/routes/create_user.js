const db = require("../database");


/**
 * Function to create a new user.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
function createUser(req, res){
    let username = req.body['username'];
    let password = req.body['password'];
    let name = req.body['name'];
    let email = req.body['email'];
    let response= { 
        'status': true, 
        'message': 'success'
    };
    if((username == null || username == '') || (password == null || password == '') || (name == null || name == '')){
        response['message'] = 'DisplayNam, Username and Password are mandatory';
        response['status'] = false;
        res.send(response);
        return;
    }

    let query = "Insert into users (username, password, name, email) values ('"+username+"','"+password+"','"+name+"','"+email+"')";
    
    try {
        db.connection.query(query , (err, rows, fields) => {
            if(err){
                console.log(err)
                response['message'] = err["sqlMessage"];
                response['status'] = false;
            }
            res.send(response);
        });    
    } catch (error) {
        response['message'] = error.message;
        response['status'] = false;
        res.send(response);
    }    
}


/**
 * Function to check if username is availableor not
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
function usernameAvailabilityCheck(req, res){
    let username = req.body['username'];
    let response= { 
        'status': true, 
        'message': 'Userame is available'
    };
    if((username == null || username == '')){
        response['message'] = 'Username is mandatory for this request';
        response['status'] = false;
        res.send(response);
        return;
    }

    let query = "Select id from users where username = '"+username+"'";
    
    try {
        db.connection.query(query , (err, rows, fields) => {
            if(err){
                response['message'] = err["sqlMessage"];
                response['status'] = false;
            }else{
                if(rows.length > 0){
                    response['message'] = username+' is already taken.';
                    response['status'] = false;
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


/**
 * Function to check if email is available or not
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
function emailAvailabilityCheck(req, res){
    let email = req.body['email'];
    let response= { 
        'status': true, 
        'message': 'Email is available'
    };
    if((email == null || email == '')){
        response['message'] = 'Email is mandatory for this request';
        response['status'] = false;
        res.send(response);
        return;
    }

    let query = "Select id from users where email = '"+email+"'";
    
    try {
        db.connection.query(query , (err, rows, fields) => {
            if(err){
                response['message'] = err["sqlMessage"];
                response['status'] = false;
            }else{
                if(rows.length > 0){
                    response['message'] = email+' is already registered.';
                    response['status'] = false;
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


module.exports = { createUser, usernameAvailabilityCheck, emailAvailabilityCheck };

