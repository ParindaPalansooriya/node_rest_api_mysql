const express = require('express');
//mail sender
const nodemailer = require('nodemailer');
//make router
const router = express.Router();
const mySQLdb = require('mysql');

//file upload
const multer = require('multer');
var name = new Date();
var fullname = name.getFullYear()+""+name.getMonth()+""+name.getDay()+""+name.getHours()+""+name.getMinutes()+""+name.getSeconds()+""+name.getMilliseconds();
const store = multer.diskStorage({
    destination: function(received, file, cd){
        cd(null, './uploads/');
    },
    filename: function(received, file, cd){
        cd(null, fullname+"_"+file.originalname);
    }
});
const upload = multer({storage: store});
console.log(fullname);
console.log("Date().toISOString");

//create database variable
const db = mySQLdb.createConnection({
    host     :'localhost',
    user     :'root',
    password :'',
    database :'user_registration'
});

let main_error = null;

db.connect(function(err){
    main_error = err;
});

//GET : user signin (received data => email) (send data => id,password) 
//quary example : /apiserver/userlogin?email=parinda@gmail.com

router.get('/userlogin',function(received,sending){
    let qury = 'SELECT id, password FROM user_info WHERE email = ?';
    db.query(qury, received.query.email, function(error,resalt){
        if(main_error){
            sending.status(422).send({
                type: 'GET',
                massage: 'Database connection error',
                code:101,
                status: main_error.message
            });
        }else{
            if(error){
                sending.status(422).send({
                    type: 'GET',
                    massage: 'Data receiving error',
                    code:102,
                    status: error.message
                });
            }else{
                sending.send(resalt);
            }
        }
    });
});


//GET: get all user information (received data => email) (send data => id,name,email,password)
//quary example : /apiserver/userprofile?id=2
router.get('/userprofile', function(received,sending){
    let qury = 'SELECT * FROM user_info WHERE id = ?';
    db.query(qury, received.query.id, function(error,resalt){
        if(main_error){
            sending.status(422).send({
                type: 'GET',
                massage: 'Database connection error',
                code:101,
                status: main_error.message
            });
        }else{
            if(error){
                sending.status(422).send({
                    type: 'GET',
                    massage: 'Data receiving error',
                    code:103,
                    status: error.message
                });
            }else{
                sending.send(resalt);
            }
        }
    });
});


//GET: get all user image information (received data => id) (send data => id,imageid,imagename)
//quary example : /apiserver/userimageinfo?id=2
router.get('/userimageinfo', function(received,sending){
    let qury = 'SELECT * FROM image_info WHERE id = ?';
    db.query(qury, received.query.id, function(error,resalt){
        if(main_error){
            sending.status(422).send({
                type: 'GET',
                massage: 'Database connection error',
                code:101,
                status: main_error.message
            });
        }else{
            if(error){
                sending.status(422).send({
                    type: 'GET',
                    massage: 'Data receiving error',
                    code:103,
                    status: error.message
                });
            }else{
                sending.send(resalt);
            }
        }
    });
});


//GET: forgot code and send email (received data => email) (send data => code)
//quary example : /apiserver/forgotcode?email=parinda@gmail.com
router.get('/forgotcode', function(received,sending){

    //check email existing
    let qury2 = 'SELECT * FROM user_info WHERE email = ?';
    console.log(received.body);
    db.query(qury2, received.query.email, function(error2, resalt2){
        if(main_error){
            sending.status(422).send({
                type: 'GET',
                massage: 'Database connection error',
                code:101,
                status: main_error.message
            });
        }else{
            if(error2){
                sending.status(421).send({
                    type: 'GET',
                    massage: 'Email exist checking error',
                    code:104,
                    status: error2.message
                });
            }else{
                if(resalt2.length >= 1){
                    // make random code
                    var code = Math.floor(Math.random() * 999999);
                    // send email
                    var email = received.query.email;
                    var mailAuth = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'parinda.urapi@gmail.com',
                            pass: 'parinda1996'
                        }
                    });
                    var mailInfo = {
                        from: 'parinda.urapi@gmail.com',
                        to: email,
                        subject: 'User Registation API',
                        text: 'Massage from User Registation API.\nThis is your CODE for forgot your password. Copy and Past that code \n'+String(code)
                    };

                    mailAuth.sendMail(mailInfo, function(error, info){
                        if(error){
                            sending.status(411).send({
                                type: 'GET',
                                massage: 'Mail sending error',
                                code:110,
                                status: error.message
                            });
                        }else{
                            sending.send({
                                type: 'GET',
                                massage: String(code),
                                id: resalt2[0].id,
                                code:206,
                                status: 'Mail send'
                            });
                        }
                    });
                }else{
                    sending.status(421).send({
                        type: 'GET',
                        massage: 'This Email not exist',
                        code:111,
                        status: 'Email not exist'
                    });
                }
            }
        }
    });
});


//POST: save user information (received data => name,email,password) (send data => error code OR success code)
//quary example : /apiserver/createuser
router.post('/createuser',function(received,sending){

    //check email existing
    let qury2 = 'SELECT * FROM user_info WHERE email = ?';
    console.log(received.body);
    db.query(qury2, received.body.email, function(error2, resalt2){
        if(main_error){
            sending.status(422).send({
                type: 'POST',
                massage: 'Database connection error',
                code:101,
                status: main_error.message
            });
        }else{
            if(error2){
                sending.status(422).send({
                    type: 'POST',
                    massage: 'Email exist checking error',
                    code:104,
                    status: error2.message
                });
            }else{
                if(resalt2.length != 0){
                    sending.status(421).send({
                        type: 'POST',
                        massage: 'This Email already exist',
                        code:105,
                        status: 'Email exist'
                    });
                }else{
                    let qury = 'INSERT INTO user_info SET ? ';
                    db.query(qury, received.body, function(error,resalt){
                        if(error){
                            sending.status(422).send({
                                type: 'POST',
                                massage: 'Data Saving error',
                                code:106,
                                status: error.message
                            });
                        }else{
                            sending.send({
                                type: 'POST',
                                massage: 'Data Saved',
                                code:201,
                                status: 'Data Saved'
                            });
                        }
                    });
                }//
            }
        }
    });
});


//POST: upload files (received data => name,email,password) (send data => error code OR success code)
//quary example : /apiserver/uploadfile?id=1
router.post('/uploadfile', upload.single('image') ,function(received,sending){
    console.log(received.file.filename)
    //console.log(upload.)
    let qury = 'INSERT INTO image_info SET id ='+received.query.id+', file_name="'+received.file.filename+'"';
    db.query(qury, null, function(error,resalt){
        if(error){
            sending.status(422).send({
                type: 'POST',
                massage: 'DB Data Uploading error',
                code:106,
                status: error.message
            });
        }else{
            sending.send({
                type: 'POST',
                massage: 'Data Uploaded',
                code:212,
                status: 'Data Uploaded'
            });
        }
    });
});


//DELETE: delete user Account (received data => id) (send data => error code OR success code)
//quary example : /apiserver/userdelete?id=2
router.delete('/userdelete',function(received,sending){
    let qury = 'DELETE FROM user_info WHERE id = ?';
    db.query(qury, received.query.id, function(error,resalt){
        if(main_error){
            sending.status(422).send({
                type: 'DELETE',
                massage: 'Database connection error',
                code:101,
                status: main_error.message
            });
        }else{
            if(error){
                sending.status(422).send({
                    type: 'DELETE',
                    massage: 'Data Deleting error',
                    code:107,
                    status: error.message
                });
            }else{
                sending.send({
                    type: 'DELETE',
                    massage: 'Data Deleted',
                    code:202,
                    status: 'Data Deleted'
                });
            }
        }
    });
});


//PUT: update user Account (received data => id) (send data => error code OR success code)
//quary example : /apiserver/userupdate?id=2
router.put('/userupdate',function(received,sending){
    let qury = `UPDATE user_info SET ? WHERE id = ${received.query.id}`;
    db.query(qury, received.body, function(error,resalt){
        if(main_error){
            sending.status(422).send({
                type: 'PUT',
                massage: 'Database connection error',
                code:101,
                status: main_error.message
            });
        }else{
            if(error){
                sending.status(422).send({
                    type: 'PUT',
                    massage: 'Data Updating error',
                    code:108,
                    status: error.message
                });
            }else{
                if(resalt.affectedRows >= 1){
                    if(resalt.changedRows >= 1){
                        sending.send({
                            type: 'PUT',
                            massage: 'Data Updated',
                            code:203,
                            status: 'Data Updated'
                        });
                    }else{
                        sending.status(412).send({
                            type: 'PUT',
                            massage: 'That is old existing data',
                            code:112,
                            status: resalt.message
                        });
                    }
                }else{
                    sending.status(411).send({
                        type: 'PUT',
                        massage: 'Data Updating error. That id is not exist',
                        code:109,
                        status: resalt.message
                    });
                }
                console.log(resalt);
            }
        }
    });
});


module.exports = router;