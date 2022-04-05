function evaluateAndResetSession(req) {
    let session = req.session;
    if(session.userID == null || session.userID == "" || session.userID == undefined){
        return { 
            'status': false, 
            'message': 'Session Expired'
        };
    }
    let moment = require('moment');
    session.lastUpdatedTime = moment().format('yyyy-mm-dd:hh:mm:ss');
    return true;
}

 

module.exports = { evaluateAndResetSession };

