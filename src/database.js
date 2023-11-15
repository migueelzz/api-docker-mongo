const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo/mongodb')
.then(db => console.log('Successfully connected in database', db.connection.host))
.catch(err => console.log(err));