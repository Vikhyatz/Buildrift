import Deployment from './Deployment';

const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: { type: String, required: true },
    deployments: {
        type: mongoose.Schema.ObjectId,
        ref: 'Deployment'
    }
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)
export default User;