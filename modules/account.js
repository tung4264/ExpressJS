// Using Node.js `require()`
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/BasicWeb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    username: String,
    Password: String,
    firstname: String,
    lastname: String,
    email: String,
    phonenumber: String,
    role: Number,
    position: Number
},{
    collection: 'account'
});

const AccountModel = mongoose.model('account',AccountSchema)

module.exports = AccountModel