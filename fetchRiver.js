/**
 * Created by Peter Landy
 * Last Updated: 04/04/2017
 *
 * Required Env Vars:
 * BUCKET
 * URI
 */

 'use strict';

 const fetch = require('node-fetch');
 const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

 const s3 = new AWS.S3();

 module.exports.save = (event, context, callback) => {
   console.log('RedNine Sepa Fetch');
   console.log('event: ' + JSON.stringify(event));
   fetch(process.env.URI)
     .then(response => response.buffer())
     .then(buffer => (
       s3.putObject({
         Bucket: process.env.BUCKET,
         Key: process.env.FILE,
         Body: buffer,
       }).promise()
     ))
     .then(() => {
       callback(null, 'Saved');
     })
     .catch((error) => {
       callback(error, null);
     });
 };
