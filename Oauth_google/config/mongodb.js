const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.CONNECTION_STRING;

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
 async function connect() {

mongoose.connect(uri).then(() => {
  console.log(`successfully connected`);
}).catch((e) => {
    console.log(e);
  console.log(`not connected`);
}); 
 }

module.exports=connect();