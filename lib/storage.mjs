import * as fs from "node:fs";
import * as path from "node:path";

function readFile(path) {
    if (!fs.existsSync(path)) {
        throw new Error(`[Error] File path not found, path ${path}`);
    }
    return fs.readFileSync(path).toString();
}

function writeFile(path, content) {
    if (!fs.existsSync(path)) {
        throw new Error(`[Error] File path not found, path ${path}`);
    }
    fs.writeFileSync(path, content);
}

function removeFile(path) {
    if (!fs.existsSync(path)) {
        throw new Error(`[Error] File path not found, path ${path}`);
    }
    fs.rmSync(path);
}

export const storage = {
    groupsPost: new Map(),
    path: "",
    createStorageFileForPost(postname){

        if(!fs.existsSync(this.path)){
            fs.mkdirSync(this.path);
        }

        if(!fs.existsSync(path.join(this.path, postname + ".json"))){
            fs.writeFileSync(path.join(this.path, postname + ".json"), "");
        }
    },
    loadPostComments(postname) {
        const rawComments = readFile(path.join(this.path, postname + ".json"));
        const cookedComments = JSON.parse(rawComments);
        if (!Array.isArray(cookedComments)) {
            throw new Error("[Error] storage file has invalid content");
        }
        this.groupsPost.set(postname, cookedComments);

    },
    savePostComments(postname, comments) {
        if (comments instanceof Object) {
            throw new Error("[Error] comments to save must be a string!");
        }
        writeFile(path.join(this.path, postname + ".json"), comments);

    },
    removePostComments(postname) {
        if (!this.groupsPost.has(postname)) {
            throw new Error(`[Error] postname are not available on storage please load ${postname} first`);
        }
        removeFile(path.join(this.path, postname + ".json"));

    }
};
