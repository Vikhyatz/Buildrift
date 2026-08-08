// actual run function which will run the cloning and docker commands

import { spawn } from 'child_process'

let stdout = ""
let stderr = ""

const run = (command, args, options = {}) => {
    return new Promise((resolve, reject) => {
        const process = spawn(command, args, options);

        process.stdout.on("data", (data) => {
            console.log(data.toString());
        });

        process.stderr.on("data", (data) => {
            console.error(data.toString());
        });

        process.on("close", (code) => {
            if (code === 0) {
                resolve({ code, stdout, stderr});
            } else {
                reject(new Error(`${command} exited with code ${code}`));
            }
        });
    });
}

export default run;