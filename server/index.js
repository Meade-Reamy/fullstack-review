const express = require('express');
let app = express();

const getRepo = require('../helpers/github');
const sort = require(`../database/index`);
app.use(express.static(`./client/dist`))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.

app.post('/repos', function (req, res) {
  getRepo.getReposByUsername(req.body.text, (err, data) => {
    if (err) {
      console.log(err.message, err);
      res.status(403).send(err);
      return;
    }
    res.status(201).end();

  });
});


app.get('/repos', function (req, res) {
   sort.sort((obj) => {
    console.log(obj);
   });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

