import { engine } from "./lib/engine.mjs"

try{

    engine.createNewPost("belajar js");
    engine.createNewPost("belajar css");

    engine.selectActivePost("belajar js");
    engine.addComment({
        name: "user 1",
        comment: "Materi nya sangat mudah dipahami",
        createAt: (new Date()).toLocaleDateString()
    });
    engine.addComment({
        name: "user 2",
        comment: "Mantap awokawoak",
        createAt: (new Date()).toLocaleDateString()
    });

    engine.selectActivePost("belajar css");
    engine.addComment({
        name: "user 1",
        comment: "Oh gitu",
        createAt: (new Date()).toLocaleDateString()
    });
    engine.addComment({
        name: "user 4",
        comment: "buat center div gimana ya?",
        createAt: (new Date()).toLocaleDateString()
    });
    engine.printComments();

    engine.selectActivePost("belajar js");
    engine.printComments();

}catch(err){
    console.log(`[Error] ${err.message}`);
}