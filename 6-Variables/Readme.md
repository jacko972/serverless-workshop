# Serverless Workshop

## Lambda Variables
Lambda now supports variables you can pass into your code. You can set these variables in the AWS console or using the serverless framework. Below is an example of how you can edit the ```serverless.yml``` file and include global variables in the provider definition or local variables to the function itself.

```
provider:
  name: aws
  runtime: nodejs4.3
  environment:
    envOne: 12345678

functions:
  myFunction:
    environment:
      envTwo: 87654321
```

Lets put this into practice and add a variable to the hello function.

```
functions:
  hello:
    handler: handler.hello
    environment:
      yourName: 'Ric'
    events:
      - http: GET /hello
```

Now modify your ```handler.js``` file to use this variable.

```
module.exports.hello = (event, context, callback) => {

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
```

You can see in the above code that you use the ```process.env.VARIABLE``` call to get the variables you have defined.

__Note:__ When reading the documentation don't confuse environmental variables with serverless variables system which allows you to add dynamic data into your ```serverless.yml```

---
Ric Harvey - ngineered.co.uk 2016
