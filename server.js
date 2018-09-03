const express = require('express');
var bodyParser = require('body-parser');
// const net = require('net');//sentd data as string
const fs = require('fs');

const app = express();

let mainPath = '';
console.log("mainpath", mainPath);


// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Headers','Content-Type'  )
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   next();
  
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}))

app.get('/api/files', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

const generateFileTree = (mainpath) => {
  const file = {
    filePath: mainpath,
    arrOfDirs: [],
    arrOfFiles: []
  };
  const arr = fs.readdirSync(mainpath);
  for(let i in arr) {
    const filePath = mainpath + '/' + arr[i];
    const stat = fs.statSync(filePath);
    if(stat.isFile()) {
      file.arrOfFiles.push(arr[i]); //filePath
    } 
    else {
      file.arrOfDirs.push(arr[i]);
      // generateFileTree(arr[i]);
    }
  }
  return file;
}


app.post('/api', (req, res) => {
  console.log("body", req.body.path);
  mainPath = req.body.path;
  const send = generateFileTree(mainPath);
  res.json(send);
  // res.redirect('/api');

  // res.send({obj: "hiiii"});
})




// let sendArray = [];
// const pathParser = (path) => {
//   const arr = fs.readdirSync(path);
//   // console.log("arr", arr)
//   for(let i in arr) {
//     const file = path + '/' + arr[i];
//     // obj.file = 
//     sendArray.push(file);

//     const stat = fs.statSync(file);
//     if(stat.isDirectory()){
//       // obj.file = "dir";
//       pathParser(file);
//     }
//     // obj.file = "file";
//   }
//   return sendArray;
//   // return obj;
// }

// let array = pathParser('/home/armush/Pictures');

// const obj = {};
// for(const key of array) {
//   // console.log(key);
//   // console.log(fs.statSync(key).isFile());
//   if(fs.statSync(key).isFile()){
//     obj[key] = "file";
//   }
//   else{
//     obj[key] = "dir";
//   }
  
// }
// console.log(obj);





const port = 5000;

app.listen(port, () => `Server running on port ${port}`);