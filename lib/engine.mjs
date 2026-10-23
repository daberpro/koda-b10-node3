import * as crypto from "node:crypto";
import { storage } from "./storage.mjs";

export const engine = {

    activePostName: "",
    activePost: [],
    init(storagePath) {
        storage.path = storagePath;
    },
    loadComments(postname) {
        storage.loadPostComments(postname);
    },
    selectActivePost(postname) {
        if (!storage.groupsPost.has(postname)) {
            throw new Error(`[Error] Post ${postname} are not found on engine`);
        }
        this.activePostName = postname;
        this.activePost = storage.groupsPost.get(postname);
    },
    createPost(postname) {
        if (storage.groupsPost.has("")) {
            throw new Error(`[Error] Post ${postname} already exists`);
        }
        storage.createStorageFileForPost(postname);
        storage.savePostComments(postname, JSON.stringify([]));
        storage.groupsPost.set(postname, []);
    },
    addComment({ name, comment, createAt }) {
        this.activePost.push(
            {
                id: crypto.randomUUIDv7(),
                name,
                comment,
                createAt
            }
        );
        storage.savePostComments(this.activePostName, JSON.stringify(this.activePost));

    },
    removeComment(commentId) {
        const commentIndex = this.activePost.findIndex((comment) => {
            return comment.id === commentId;
        });
        this.activePost.splice(commentIndex, 1);
        storage.savePostComments(this.activePostName, JSON.stringify(this.activePost));

    },
    findComment(commentId) {
        return this.activePost.find((comment) => {
            return comment.id === commentId;
        });
    },
    removePost(postname) {
        this.activePost = [];
        this.activePostName = "";
        storage.removePostComments(postname);

    },
    printComments() {
        console.log(`\nPost [${this.activePostName}] comments: `);
        this.activePost.forEach(({ id, name, comment, createAt }) => {
            console.log(`Name: ${name}`);
            console.log(comment);
            console.log(`Create At: ${createAt}, Comment Id [${id}]`);
            console.log("-".repeat(30));
        });
    }

};