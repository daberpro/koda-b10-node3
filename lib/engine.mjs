import * as crypto from "node:crypto";

export const engine = {

    activePostName: "",
    groupsPost: new Map(),
    activePost: [],
    selectActivePost(postname){
        if(!this.groupsPost.has(postname)){
            throw new Error(`[Error] Post ${postname} are not found on engine`);
        }
        this.activePostName = postname;
        this.activePost = this.groupsPost.get(postname);
    },
    createNewPost(postname){
        if(this.groupsPost.has("")){
            throw new Error(`[Error] Post ${postname} already exists`);
        }
        this.groupsPost.set(postname, []);
    },
    addComment({name, comment, createAt} ){
        this.activePost.push(
            {
                id: crypto.randomUUIDv7(),
                name,
                comment,
                createAt
            }
        );
    },
    removeComment(commentId){
        const commentIndex = this.activePost.findIndex((comment)=>{
            return comment.id === commentId;
        });
        this.activePost.splice(commentIndex,1);
    },
    findComment(commentId){
        return this.activePost.find((comment)=>{
            return comment.id === commentId;
        });
    },

    printComments(){
        console.log(`\nPost [${this.activePostName}] comments: `);
        this.activePost.forEach(({id, name, comment, createAt})=>{
            console.log(`Name: ${name}`);
            console.log(comment);
            console.log(`Create At: ${createAt}, Comment Id [${id}]`);
            console.log("-".repeat(30));
        });
    }

};