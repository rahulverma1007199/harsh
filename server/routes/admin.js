const sequelize = require("../models/Users")
var express = require('express');
var app = express();
const jwt = require('jsonwebtoken');
const jwtKey = 'e-com';
var router = express.Router();
const clientCtrl = require('../controllers/clientController');
const customerCtrl = require('../controllers/customerController');
const loginCtrl = require('../controllers/loginController');
const campaignCtrl = require('../controllers/campaignController');
const{ createBot } = require('whatsapp-cloud-api');
const mysql = require('mysql');
const multer = require('multer');
var storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null,'upload/csv/')
    },
    filename:function(req, file, cb){
        var filName = Date.now()+file.originalname;
        cb(null,filName)
    }
});
var upload = multer({storage:storage});

const checkJwt = async (req, res, next) => {
    console.log(req.headers['token'])
    // console.log('token = ',req.headers.token);
    var reqToken = req.headers['authorization'];
    if(typeof reqToken!=='undefined'){
        const bearer = reqToken.split(' ');
        const bearerToken = bearer[1];
        // req.token = bearerToken;
        const tokenVar = await jwt.verify(bearerToken, jwtKey, (err, decode) => {
            if(err){
                res.status(404).send({Message:'Authorization is Invalid'});
            }else{
                next();
            }
        });
    }else{
        res.status(403).send({Message:'Authorization is Failed'});
    }   
};

// client Api
router.post('/addClient', checkJwt, clientCtrl.addClient);
router.get('/editClient/:id', checkJwt, clientCtrl.editClient);
router.put('/updateClient/:id', checkJwt, clientCtrl.updateClient);
router.put('/deleteClient/:id', checkJwt, clientCtrl.deleteClient);
router.get('/clientList', checkJwt, clientCtrl.getClient);

// Login Api
router.post('/login',loginCtrl.login);
router.get('/dashboard', checkJwt, loginCtrl.dashboardCount);

// Customer Api
router.post('/addCustomer', checkJwt, customerCtrl.addCustomer);
router.get('/customerList', checkJwt, customerCtrl.getCustomer);
router.get('/editCustomer/:id', checkJwt, customerCtrl.editCustomer);
router.put('/updateCustomer/:id', checkJwt, customerCtrl.updateCustomer);
router.put('/deleteCustomer/:id', checkJwt, customerCtrl.deleteCustomer);

// Campagin Api
router.get('/campaginList', checkJwt, campaignCtrl.campaginList);
router.get('/filter', checkJwt, campaignCtrl.filter);
router.post('/filterData', checkJwt, campaignCtrl.filterData);
router.put('/campaginDelete/:id', checkJwt, campaignCtrl.campaginDelete);
router.put('/campaginActive/:id', checkJwt, campaignCtrl.campaginActiveStatus);
router.put('/campaginInactive/:id', checkJwt, campaignCtrl.campaginInactiveStatus);
router.get('/campaginUserList/:id', checkJwt, campaignCtrl.campaginCustomerList);
router.post('/addCsv',upload.single('file'), checkJwt, campaignCtrl.AddCsvRead_Customer);
router.get('/campagin', checkJwt, campaignCtrl.campaginData);
router.get('/campaginEdit/:id', checkJwt, campaignCtrl.campaginEdit);
router.put('/campaginUpdate/:id', checkJwt, campaignCtrl.campaginUpdate);
router.get('/campaginCustomerList/:id', checkJwt, campaignCtrl.customerList);

const dbb = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "whatsapptest",
  });
    
    // Connect to MySQL
    dbb.connect((err) => {
      if (err) {
        console.log('Error connecting to MySQL:', err);
        return;
      }
      console.log('Connected to MySQL');
    });

router.post("/sendMessage", async function (req,res){
    const message = "hie";
  
      try {
        const q = "SELECT * FROM customers";
        
        dbb.query(q,async (err, data) => {
            if (err) {
              console.log(err);
              return res.json(err);
            }
            for (var i = 0; i < data.length; i++) {
                console.log();
           
         
        // replace the values below from the values you copied above
        const from = process.env.PHONE_NUMBER_ID;
        const token = process.env.ACCESS_TOKEN;
        const to =  data[i].mobile_number;
        const webhookVerifyToken =process.env.WEBHOOK_TOEKN ;
    
        const bot = createBot(from, token);
    
        const result = await bot.sendText(to,message);
    
        // Start express server to listen for incoming messages
        await bot.startExpressServer({
          webhookVerifyToken,
        });
    
        // Listen to ALL incoming messages
        bot.on('message', async (msg) => {
          console.log(msg);
    
          if (msg.type === 'text') {
            await bot.sendText(msg.from, 'Received your text message!');
          } else if (msg.type === 'image') {
            await bot.sendText(msg.from, 'Received your image!');
          }
        });
    }
        res.status(200).json(result);
    });
      } catch (err) {
        res.status(500).json("err");
      }
  });

app.use('/',router);
module.exports = router;