const mongoose = require('mongoose');

const mongoConnectionString = "mongodb+srv://mostafa:vimEzkwgh0JuON1q@cluster0.ljw4o.mongodb.net/node-angular?retryWrites=true&w=majority";// Connect to MongoDB
mongoose.connect(mongoConnectionString, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
},
    (err, db) => {
        if (err) throw err;
        console.log('MongoDb connected wohoooo !');
    });