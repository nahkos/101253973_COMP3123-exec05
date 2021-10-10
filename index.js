const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const user = require('./User')

let fs = require('fs')


const usernameFilter = req => user => user.username === req.params.username;
const passwordFilter = req => user => user.password === req.params.password;
const idFilter = req => user => user.id === parseInt(req.params.id);


/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});


/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  res.json((user));
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login/:username/:password', (req,res) => {
  

  const usernameFound = (Object.values(user).some(user => user.username === req.params.username));

  const passwordFound = (Object.values(user).some(user => user.password === req.params.password));

  // username and password is valid
  if (!usernameFound && !passwordFound){
    res.status(200).json({status: true,
      message: "User Is valid"})
  }  
  
  // username is invalid
  if (usernameFound){
    res.status(400).json({status: false,
      message: "User Name is invalid"})
  }

  // password is invalid
  if (passwordFound){
    res.status(400).json({status: false,
      message: "Password is invalid"})
  }
  
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req,res) => {
  res.status(200).json({msg: `${req.params.username} successfuly logout`})
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));