module.exports.routesControl = (method, req, res) =>{

    switch(method){
        case 'login' :
            console.log('At login route');
            require('./routes/login').validateLogin(req, res);
            break;
        case 'createUser':
            require('./routes/create_user').createUser(req, res);
            break;
        case 'usernameCheck':
            require('./routes/create_user').usernameAvailabilityCheck(req, res);
            break;
        case 'emailCheck':
            require('./routes/create_user').emailAvailabilityCheck(req, res);
            break;
        case 'test':
            require('./routes/test').sessionTest(req, res);
            break;
        case 'getChatList':
            require('./routes/messages').getChatList(req, res);
            break;

            

    }
    
}

