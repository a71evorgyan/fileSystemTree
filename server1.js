const express = require('express');
var bodyParser = require('body-parser');
// const net = require('net');//sentd data as string
const fs = require('fs');

const app = express();

// let mainPath = '';
// console.log("mainpath", mainPath);


// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Headers','Content-Type'  )
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   next();
  
// });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: false,
// }))

// app.get('/api/files', (req, res) => {
//   const customers = [
//     {id: 1, firstName: 'John', lastName: 'Doe'},
//     {id: 2, firstName: 'Brad', lastName: 'Traversy'},
//     {id: 3, firstName: 'Mary', lastName: 'Swanson'},
//   ];

//   res.json(customers);
// });



// app.post('/api', (req, res) => {
//   console.log("body", req.body.path);
//   mainPath = req.body.path;
//   // console.log("mainpath", mainPath);
//   res.json({receive: req.body.path});
//   // res.redirect('/api');

//   // res.send({obj: "hiiii"});
// })
let sendArray = [];

const generateFileTree = (mainpath) => {
  const file = {
  };
  const arr = fs.readdirSync(mainpath);
  for(let i in arr) {
    const filePath = mainpath + '/' + arr[i];
    const stat = fs.statSync(filePath);
    file.path = filePath;
    if(stat.isFile()) {
      file.isFileBoolean = true;
    } 
    else {
      file.isFileBoolean = false;
    }
  }
  if(!file.isFileBoolean){
    return generateFileTree(file.filePath);
    
  }
   return file;
}
console.log(generateFileTree('/home/armush/Pictures'));
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





// const port = 6000;

// app.listen(port, () => `Server running on port ${port}`);