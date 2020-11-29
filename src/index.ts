import dotenv from 'dotenv';
import sendgrig from '@sendgrid/mail';
import { startServer, createServer } from './server';

dotenv.config();

async function test() {
  sendgrig.setApiKey('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');
  const msg = {
    to: 'danyngongang@gmail.com', // Change to your recipient
    from: 'tchekamboudanyls@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  try {

  } catch (error) {

  }
  sendgrig
    .send(msg)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
}

test();
// createServer().then(startServer)
//   .catch((error) => {
//     console.error(error);
//   });
