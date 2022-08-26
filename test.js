const File = require("./js/index").FileClass;

const file = new File("./test1.txt");

const writer = file.writer();

const appender = writer.appender();

const reader = file.reader().readLine();

writer.appender().append("hello world1")


// reader.read("utf-8")
// .then((val) => {
//     console.log(val)
// })

// const rl = reader.readLine();
// var i = 0;
// rl.on("line", (s) => {
//     console.log(s, i++);
//     if(i == 2) rl.close();
// });

// rl.ready();

// file.access().then(console.log);


// const dir = new File("./directory/dir/d2");

// dir.mkDirs().then(() => {
//     console.log("done");
// });