const http = require("http");
const hostname = '127.0.0.1';
const port = 5000;

const fs = require('fs');
const { parse} = require('odata2openapi');


// Get the OData metadata as a string.
const xml = fs.readFileSync('C:/Users/simra/projects/test_odata_openapi/test.xml');


//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {
  parse(xml)
  .then(data => fs.writeFile('test.txt',JSON.stringify(data, null, 2).toString(), err => {
    if (err) {
      console.error(err)
      return
    }
    //file written successfully
  }))
  .then(swagger => res.end(JSON.stringify(swagger, null, 2)))
  .catch(error => console.error(error))
  
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});