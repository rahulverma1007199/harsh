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

    router.post("/sendMessage", async (req,res)=>{
      const message = req.body.message_text;
      const to = `91${req.body.to_number}`;
      const conversation_id = req.body.conversation_id;
      console.log(message,to,conversation_id);
      try {
         // replace the values below from the values you copied above
         const from = 108705542121394;
         const token = 'EAAM5CTpl8JgBAOA7hVHMmcLbkIEdiRZAZCrLSJAWZB3HrZCEaWMZAxC8UZAB6ZA87kPS1XvR33XLRTX2BKZABdi46pxw3r6TYefCZBAimbahqjBITd3FEXLIv1QFrdIZBTmFPZCSAeOgXQO5xOoh4bOyZBxVFAZCxPZBaHaFXyasA7jix7CeRw5drfyX2UXwgw4PnoQ7XJ57MbZBSfxrQZDZD';
         const webhookVerifyToken ='testCheck' ;

        
       

        const bot = createBot(from, token);

        const result = await bot.sendText(to,message);
        const timestamp = Date.now();
        const currentTimestamp = Math.floor(timestamp/1000);
        const q = 'INSERT INTO message (from_number, to_number, message_text, conversation_id,send_datetime) VALUES (?,?,?,?,?)';
        dbb.query(q,[from,to,message,conversation_id,currentTimestamp]);

        // Start express server to listen for incoming messages
        await bot.startExpressServer({
          webhookVerifyToken,
        });
    
        

        // Listen to ALL incoming messages
        bot.on('message', async (msg) => {
          console.log(msg);
    
          if (msg.type === 'text') {
            const q = 'INSERT INTO message (from_number, to_number, message_text,conversation_id,send_datetime) VALUES (?,?,?,?,?)';
            dbb.query(q,[msg.from,from,msg.data.text,conversation_id,msg.timestamp]);
          } else if (msg.type === 'image') {
            await bot.sendText(msg.from, 'Received your image!');
          }
        });

          res.status(200).json(result);
      
      } catch (err) {
          res.status(500).json(err);
      }
    });

router.post('/userAllMessage', (req,res)=>{
      const conversation_id = req.body.conversation_id;
      const q = 'SELECT * FROM message WHERE conversation_id = ?';
      dbb.query(q,[conversation_id],async (err, data) => {
          if (err) {
            console.log(err);
          }
          res.status(200).json(data);
      });
  });

router.post("/sendBulkMessage", async function (req,res){
  const campaign_id = req.body.campaign_id;
    let isError = false;
      try {
        const q = 'SELECT customers.mobile_number FROM customers INNER JOIN campaign_customers ON customers.id = campaign_customers.customer_id WHERE campaign_id = ?';
        dbb.query(q,[campaign_id],async (err, data) => {
            if (err && !isError) {
              isError = true
              console.log(err);
              return res.json(err);
            }
            for (var i = 0; i < data.length; i++) {
           
         console.log(data[i].mobile_number);
        // replace the values below from the values you copied above
        const from = 108705542121394;
        const token = 'EAAM5CTpl8JgBAOA7hVHMmcLbkIEdiRZAZCrLSJAWZB3HrZCEaWMZAxC8UZAB6ZA87kPS1XvR33XLRTX2BKZABdi46pxw3r6TYefCZBAimbahqjBITd3FEXLIv1QFrdIZBTmFPZCSAeOgXQO5xOoh4bOyZBxVFAZCxPZBaHaFXyasA7jix7CeRw5drfyX2UXwgw4PnoQ7XJ57MbZBSfxrQZDZD';
        const to =  `91${data[i].mobile_number}`;
        const webhookVerifyToken ='testCheck' ;
        

        
        const bot = createBot(from, token);
    
        const result = await bot.sendTemplate(to,'hello_world', 'en_us');
    
        if(i == 0){
          // Start express server to listen for incoming messages
          await bot.startExpressServer({
            webhookVerifyToken,
          });
        }
    
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
            res.status(200).json("done");
      
    });
      } catch (err) {
        if(!isError){
          res.status(500).json("err");
          isError = true;
        }
      }
  });

app.use('/',router);
module.exports = router;