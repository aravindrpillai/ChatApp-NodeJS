const db = require("../database");

function getChatList(req, res){
    let hasValidSession = require('../sessions').evaluateAndResetSession(req);
    if(hasValidSession != true){
        res.send(hasValidSession);
        return;
    }
    let response= { 
        'status': true, 
        'message': 'success'
    };
    var currentUserId = req.session.userID; 
    
    let q1 = "select sender, recipient from messages where sender = "+currentUserId+" or recipient = "+currentUserId+" group by sender, recipient";
    
    let users = [];

    try {
        
        db.connection.query(q1 , (err, rows, fields) => {
            if(err){
                response['message'] = err["sqlMessage"];
                response['status'] = false;
            }else{
                var finalQuery = "select id, name, email, online from users where id in ("
                rows.forEach(element => {
                    if(element['sender'] == currentUserId){
                        if(users.indexOf(element['recipient']) < 0){
                            users.push(element['recipient'])
                        }
                    }else{
                        if(users.indexOf(element['sender']) < 0){
                            users.push(element['sender'])
                        }
                    }
                });
                if(users.length > 0){
                    console.log();
                    var finalQuery = "select id, name, email, online from users where id in ("+users.toString()+")";
                    db.connection.query(finalQuery , (err, usersFromDB, fields) => {
                        if(err){
                            response['message'] = err["sqlMessage"];
                            response['status'] = false;
                            res.send(response);
                        }else{
                            res.send(usersFromDB);
                        }
                    });
                }else{
                    res.send([]);
                }
            }
        }); 

    } catch (error) {
        response['message'] = error.message;
        response['status'] = false;
        res.send(response);
    }    
}


module.exports = { getChatList };