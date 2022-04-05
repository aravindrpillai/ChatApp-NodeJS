

function sessionTest(req, res){
    let hasValidSession = require('../sessions').evaluateAndResetSession(req);
    if(hasValidSession != true){
        res.send(hasValidSession);
    }else{
        res.send(req.session);
    }
}


module.exports = { sessionTest };