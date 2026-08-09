// actual run function which will run the cloning and docker commands

import { spawn } from 'child_process'
// import { publisher } from './redis';
import { publishLog } from './publishLog.js';


let stdout = ""
let stderr = ""

const run = (command, args, options = {}) => {
    return new Promise((resolve, reject) => {
        const process = spawn(command, args, options);

        process.stdout.on("data", async (data) => {
            const message = data.toString();

            console.log(message);

            await publishLog(message);
        });

        process.stderr.on("data", async (data) => {
            const message = data.toString();

            console.log(message);

            await publishLog(message);
        });

        process.on("close", (code) => {
            if (code === 0) {
                resolve({ code, stdout, stderr });
            } else {
                reject(new Error(`${command} exited with code ${code}`));
            }
        });
    });
}

export default run;