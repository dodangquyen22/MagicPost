const mongoose = require('mongoose');
async function connect() {

    mongoose.connect('mongodb://127.0.0.1/MagicPost')
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB', error);
        });
}

module.exports = { connect };