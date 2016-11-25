'use strict';

module.exports.hello = (event, context, callback) => {

  const html = `
  <html>
    <body>
	<h1>Serverless Workshop</h1>
	<p>hello world of serverless</h1>
    </body>
  </html>`

  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html'
    },
    body: html
  }

  console.log('our first log');

  callback(null, response)

};
