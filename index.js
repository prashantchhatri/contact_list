const express = require('express');
const path = require('path');
const port = 3000;
const db = require('./config/mongoose')
const Contact = require('./models/contact')
const app = express();


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'))
app.use(express.urlencoded());
app.use(express.static('assets'));


//index
app.get('/', function(req, res){
    Contact.find({}, function(err, contacts){
        if(err){
            console.log('error in fetching contacts!!');
            return;
        }
        return res.render('home', {
            title: "Contacts List",
            contact_list: contacts
        });
    });
});


//create
app.post('/create', function(req, res){
    // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
            if(err){
                console.log('error in creating contact!!');
                return;
            }
            // console.log('************', newContact);
            return res.redirect('back');
        })
});


//delete
app.get('/delete', function(req, res){
    let id = req.query.id;
    // console.log(id);
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting!!!!');
        }
        return res.redirect('back');
    })
});


//update : not complted
app.get('/update', function(req, res){
    let id = req.query.id;
    // console.log(id);
    Contact.findByIdAndUpdate({
        id: id,
        name: req.body.name,
        phone: req.body.phone
    }, function(err, updatedContact){
        if(err){
            console.log('error in deleting!!!!');
        }
        // console.log('###########', updatedContact);
        return res.redirect('back');
    })
});


//http request
app.listen(port, function(err){
    if(err){
        console.log('error: ', err);
    }
    console.log('Express server is running on port: ', port);
});

