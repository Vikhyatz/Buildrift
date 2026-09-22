const mongoose = require("mongoose")

const deploymentSchema = mongoose.Schema({
    projectId: {type: String, required: true},

    projectName: {type: String, required: true},
    repoUrl: {type: String, required: true},
    branch: {type: String, required: true},
    buildCommand: {type: String, required: true},
    outputDirectory: {type: String, required: true},
    status: {type: String, required: true},
    logs: {type: [String], default: []},
    
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
},
{
    timestamps: true
})


const Deployment = mongoose.models.Deployment || mongoose.model('Deployment', deploymentSchema)
export default Deployment;