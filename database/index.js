const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  watchers_count: Number,
  username: String,
  description: String,
  name: String,
  repolink: String
});

let Repo = mongoose.model('Repo', repoSchema);

const usedKeys = [`watchers_count`, `name`, `html_url`, `description`];

const filterObject = (obj, allowedKeys) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedKeys.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

let save = (body, callback) => {
  const returnProcessedBody = (element) => filterObject(element, usedKeys);
  let processedBody = body.map(returnProcessedBody);
  let returnedUsers = [];
  processedBody.forEach((elem) => {
   elem.username = elem.html_url.split('/')[3];
   let filter = {url: elem.html_url}
   let options = {
    upsert: true
   }
   console.log(elem)
   Repo.findOneAndUpdate(filter, elem, options, (err, returnedData) => {
    returnedUsers.push(elem);
    if (returnedUsers.length >= body.length) {
      console.log(returnedUsers);
      callback(null, returnedUsers);
    }
   })
  })

}

let sort = (callback) => {
  Repo
    .find({})
    .sort('watchers_count')
    .limit(25)
    .exec(callback);
}

module.exports.save = save;
module.exports.sort = sort;