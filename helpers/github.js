const axios = require('axios');
const config = require('../config.js');
const save = require(`../database/index`);
let getReposByUsername = (username, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  axios({
    method: "get",
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    },
  }).then(function (data) {
      //console.log(data);
      let body = data.data;
      save.save(body, callback)
    });

}

module.exports.getReposByUsername = getReposByUsername;