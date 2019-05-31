const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
var fs = require('fs');
// Use the array below to store the users. Add/remove/update items in it based off
let storage = [];
app.use(bodyParser.json());
storage = JSON.parse(fs.readFileSync(__dirname + '/storage.json', 'utf8'))

 app.post('/users', function (req, res) {
   storage.push(req.body)
   fs.writeFileSync(__dirname + '/storage.json', JSON.stringify(storage));
   res.send(storage)
 })

  app.get('/users', function (req, res) {
    res.json(storage)
  })

  app.get('/users/:name', function (req, res) {
    let user = storage.filter(x => {
      x.name === req.params.name
    })
    res.json(user[0]);
  })

  app.put('/users/:name', function (req, res) {
    let users = storage.map(user => {
      if (user.name === req.params.name) {
        return req.body;
      } else {
        return user;
      }
    })
    fs.writeFileSync('./storage.json', JSON.stringify(users));
    res.send(users);
  })

  app.delete('/users/:first_name', function (req, res) {
    let newList = storage.filter(x => x.name !== req.params.name)
    storage = newList
    fs.writeFileSync('./storage.json', JSON.stringify(storage));
    res.send(storage);
  })

app.listen(port, ()=>{
  console.log(`Listening on port ${port}`);
})
