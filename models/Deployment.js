const mongoose = require("mongoose")

const deploymentSchema = mongoose.Schema({
    projectId: {type: String, required: true},

    projectName: {type: String, required: true},
    repoUrl: {type: String, required: true},
    branch: {type: String, required: true},
    buildCommand: {type: String, required: true},
    outputDirectory: {type: String, required: true},
    
    // status: {type: String, required: true},
    // commitSha: {type: String, required: true},
    // commitMessage: {type: String, required: true},
    // duration: {type: String, required: true},
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