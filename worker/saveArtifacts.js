// save distribution folder in another file (bucket for later versions)

import fs from "fs/promises"

const saveArtifacts = async (projectPath, uniqueID) => {
    await fs.mkdir(`./alldists/${uniqueID}`, { recursive: true })
    console.log("created directory for distribution storage")

    await fs.cp(
        `${projectPath}/dist`,
        `./alldists/${uniqueID}`,
        {
            recursive: true
        }
    );
    console.log("moved dist from clone to bucket")
}

export default saveArtifacts;