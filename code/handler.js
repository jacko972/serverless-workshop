'use strict';

module.exports.hello = (event, context, callback) => {

  console.log('value1 =', event.key1);
  console.log('value2 =', event.key2);
  console.log('value3 =', event.key3);  
  
  const yourName = process.env.yourName

  const html = `
  <html>
    <body>
	<h1>Serverless Workshop</h1>
	<p>hello world of serverless<br/>
	Created by ` + yourName + `</p>
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
