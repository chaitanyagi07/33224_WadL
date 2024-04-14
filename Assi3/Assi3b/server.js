const express = require('express');
const mongoose = require('mongoose');
const userrouter=require('./User/user.routes')

const app = express();
const PORT = process.env.PORT || 30001;

 
mongoose.connect('mongodb://localhost:27017/userdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


app.use(express.json());

app.use('/user',userrouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  