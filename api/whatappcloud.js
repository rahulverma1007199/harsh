import { createBot } from 'whatsapp-cloud-api';
export const webhookBot = async () => {
    try {
      // replace the values below
      const from = process.env.PHONE_NUMBER_ID;
      const token = process.env.ACCESS_TOKEN;
      const to =  process.env.RECIPIENT_WAID;
      const webhookVerifyToken =process.env.WEBHOOK_TOEKN ;
      // Create a bot that can send messages
      const bot = createBot(from, token);
  
      // Send text message
      const result = await bot.sendText(to, 'Hello world');
  
      // Start express server to listen for incoming messages
      // NOTE: See below under `Documentation/Tutorial` to learn how
      // you can verify the webhook URL and make the server publicly available
      await bot.startExpressServer({
        webhookVerifyToken,
      });
  
      // Listen to ALL incoming messages
      // NOTE: remember to always run: await bot.startExpressServer() first
      bot.on('message', async (msg) => {
        console.log(msg);
  
        if (msg.type === 'text') {
          await bot.sendText(msg.from, 'Received your text message!');
        } else if (msg.type === 'image') {
          await bot.sendText(msg.from, 'Received your image!');
        }
      });
    } catch (err) {
      console.log(err);
    }
};