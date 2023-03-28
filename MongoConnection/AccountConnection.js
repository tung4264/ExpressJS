const mongoose = require('mongoose');

const URL = "mongodb://admin:IvFcqCTo8kWtqRDs@cluster0-shard-00-00.flml8.mongodb.net:27017,cluster0-shard-00-01.flml8.mongodb.net:27017,cluster0-shard-00-02.flml8.mongodb.net:27017/?ssl=true&replicaSet=atlas-jttv87-shard-0&authSource=admin&retryWrites=true&w=majority";

try {
    mongoose.connect(URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log('Connect DB alter success');
} catch (error) {
    console.log(error);
}



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
// console.log(3);
// AccountModel.findOne({
//     username: "nttung4",
//     Password: "123456" 
// }).then(data =>{
//     console.log("Tim dc "+data);
// }).catch(err=>{
//     console.log("bug "+err);
// })