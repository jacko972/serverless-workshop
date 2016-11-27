'use strict'

const AWS = require('aws-sdk')
const s3 = new AWS.S3()

const BUCKET = 'ngd-workshop-uploads'

module.exports.show = function (event, context, callback) {

  const html = `
  <html>
    <body>
      <a href="list">Back to the list of images</a><br/>
      <a href="upload">Upload more images</a><br/>
      <img src="https://${BUCKET}.s3.amazonaws.com/${event.queryStringParameters.image}" />
    </body>
  </html>`

  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html'
    },
    body: html
  }

  callback(null, response)
}
