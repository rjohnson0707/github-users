var express = require('express');
var router = express.Router();
const request = require('request');
const rootUrl = 'https://api.github.com/'

/* GET home page. */
router.get('/', function(req, res, next) {
  const userName = req.query.username;
  const token = process.env.GITHUB_TOKEN;
  const options = {
    url: `${rootUrl}users/${userName}`,
    headers: {
      'User-Agent': 'rjohnson0707',
      Authorization: `token ${token}`
    }
  };
  request(options, function(err, response, body) {
    const userData = JSON.parse(body);
    options.url = userData.repos_url;
    request(options, function(err, response, body) {
      userData.repos = JSON.parse(body);
      console.log(userData.repos[0]);
      res.render('index', {userData});
    })
  });
});

module.exports = router;
