import Deployment from './Deployment';

const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    activity: [
        {
            type: { type: String, required: true },
            description: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
        }
    ],
    deployments: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Deployment'
    }]
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)
export default User;