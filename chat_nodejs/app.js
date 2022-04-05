const express = require("express");
var route = require('./router');

var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.listen(3001, () => console.log("Server is running on port 3001"));

var expressSession = require('express-session');
app.use(expressSession({
    secret: 'mYsEcReTkEy',
    resave: true,
    saveUninitialized: true,
    cookie: { 
        maxAge: (2*60*1000) // 2 Mins
    }
}));

app.post('/createUser',(req, res)=>{
    route.routesControl('createUser',req, res)
});
app.post('/login',(req, res)=>{
    route.routesControl('login',req, res)
});
app.post('/usernameCheck',(req, res)=>{
    route.routesControl('usernameCheck',req, res)
});
app.post('/emailCheck',(req, res)=>{
    route.routesControl('emailCheck',req, res)
});
app.post('/getChatList',(req, res)=>{
    route.routesControl('getChatList',req, res)
});
app.post('/test',(req, res)=>{
    route.routesControl('test',req, res)
});