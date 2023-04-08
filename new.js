const mongoose = require('mongoose');

const DB_USERNAME = 'admin1';
const DB_PASSWORD = 'admin';
const DB_NAME = 'sample_airbnb';
const DB_CLUSTER = 'Cluster0';

const uri = `mongodb+srv://$ admin1:$admin@$new2.mongodb.net/$sample_airbnb?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.log('Error connecting to MongoDB Atlas:', error.message);
});
