require('dotenv').config()
const express = require('express'),
      session = require('express-session'),
      massive = require('massive'),
      cors = require('cors'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      authCtrl = require('./controllers/authController'),
      eventCtrl = require('./controllers/eventController'),
      strpCtrl = require('./controllers/stripeControllers'),
      ticketCtrl = require('./controllers/ticketController'),
      app = express(),
      nodemailer = require('nodemailer'),
      EMAIL = process.env.EMAIL,
      PASSWORD = process.env.PASSWORD;

      
      app.use(express.json());
      app.use(cors());
      
      app.use(
          session({
              resave: false,
              saveUninitialized: false,
              secret: SESSION_SECRET,
              cookie: {
                  maxAge: 1000 * 60 * 60 * 24 * 365
                }
            })
            );
            
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                   user: EMAIL,
                   pass: PASSWORD
                }
             })
            
            
massive(CONNECTION_STRING).then(database => {
    app.set('db', database);
    app.set('transporter', transporter);
    console.log('db connected');
    app.listen(SERVER_PORT, () => console.log(`Server connected to ${SERVER_PORT}`)
    );
});

//Auth Endpoints
app.post('/auth/login', authCtrl.login);
app.post('/auth/register', authCtrl.register);
app.post('/auth/logout', authCtrl.logout);

//Bookmark Endpoints
app.post('/api/bookmarks', eventCtrl.addEvent);
app.delete('/api/bookmark/:event_id', eventCtrl.deleteEvent);
app.get('/api/bookmarks', eventCtrl.getBookmarks);

//Ticket Endpoints
app.get('/api/tickets', ticketCtrl.getTickets);

//Payment Endpoints
app.post('/api/payment', strpCtrl.pay);