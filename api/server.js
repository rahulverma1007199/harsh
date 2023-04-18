import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mysql from "mysql";
import { createBot } from 'whatsapp-cloud-api';

import { sendMessage, getTextMessageInput,getTemplatedMessageInput,sendCamp} from "../api/messageHelper.js";

const app = express();
const router = express.Router();



dotenv.config();

app.use(cors());
app.use(express.json());

app.get('/', function(req, res) {
    res.json('json');
  });
//   process.env.RECIPIENT_WAID

// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "whatsapptest",
});
  
  // Connect to MySQL
  db.connect((err) => {
    if (err) {
      console.log('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL');
  });

// Helper function to validate phone number
function validatePhoneNumber(phoneNumber) {
    // Implement phone number validation logic
    return true;
  }

// Subscribe 
app.post('/subscribe', (req, res) => {
    const phoneNumber = "919468367026";
    const q = "SELECT * FROM subscribe WHERE phone_number = ?";
  db.query(q,[phoneNumber],(err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
  });
    

    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
            res.status(400).send('Invalid phone number');
            return;
    }
    
    // update phone number from database
    const query = "UPDATE subscribe SET opt_out = 0 WHERE phone_number = ?"
    db.query(query, [phoneNumber], (err, results) => {
      if (err) {
        console.log('Error updating subscriber:', err);
        res.status(500).send('Error deleting subscriber');
        return;
      }
      res.status(200).send('Successfully updated subscriber');
    });
});

// POST /unsubscribe endpoint
app.post('/unsubscribe', (req, res) => {
    const phoneNumber = "919468367026";
    const q = "SELECT * FROM subscribe WHERE phone_number = ?";
  db.query(q,[phoneNumber],(err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
  });
    

    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
            res.status(400).send('Invalid phone number');
            return;
    }
    
    // update phone number from database
    const query = "UPDATE subscribe SET opt_out = 1 WHERE phone_number = ?"
    db.query(query, [phoneNumber], (err, results) => {
      if (err) {
        console.log('Error updating subscriber:', err);
        res.status(500).send('Error deleting subscriber');
        return;
      }
      res.status(200).send('Successfully updated subscriber');
    });
  });

  // POST /camp endpoint
app.post('/camp',async (req, res) => {
    const q = "SELECT * FROM subscribe";
  
    await db.query(q, (err, data) => {
        if (err) {
          console.log(err);
          return res.json(err);
        }

        sendCamp(data);
        return res.json("done");
      });

  });


app.post('/',async function(req, res) {
    const data = getTextMessageInput(process.env.RECIPIENT_WAID);
    
    try {
        const respo = await sendMessage(data);
        res.status(200).json(respo);
        
    } catch (error) {
        res.status(401).send('errorr');
    }
  });
app.post("/webhook", async function (req,res){
  const message = req.body.text;
    try {
      // replace the values below from the values you copied above
      const from = process.env.PHONE_NUMBER_ID;
      const token = process.env.ACCESS_TOKEN;
      const to =  process.env.RECIPIENT_WAID;
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
      res.status(200).json(result);

    } catch (err) {
      res.status(500).json("err");
    }
});
app.listen(8800, () => {
    console.log("Backend server is running!");
  });