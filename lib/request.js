'use strict';
/* eslint-disable no-console */

const
  querystring = require('querystring'),
  parseJson = (str) => new Promise((resolve) => resolve(JSON.parse(str)));

const post = (protocol, host, path, postObj) => new Promise((resolve, reject) => {
  const
    http     = require(protocol),
    postData = querystring.stringify(postObj),
    requestParams = {
      host,
      path,
      method: 'POST',
      headers: {
        'Content-Type':   'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
      }
    },
    request = http.request(requestParams, (res) => {
      console.log('request completed!');
      let body = '';
      res.setEncoding('utf8');
      res.on('data',  (chunk) => body += chunk);
      res.on('error', (error) => reject(error));
      res.on('end', () => {
        parseJson(body)
        .then( (response) => {
          if ( ! response.ok ) {
            const error = new Error(response.error);
            error.postObj = postObj;

            return reject(error);
          }

          resolve({response, postObj});
        })
        .catch(reject);
      });
    });

  request.on('error', (error) => reject(error));
  request.write(postData);
  request.end();
});

exports.post = post;
