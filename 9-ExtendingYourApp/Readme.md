# Serverless Workshop

## Extending the application
Lets extend the application and add a few features like a easy way to upload images and a viewing page. Whilst I'll provide code blocks for this section you're on your own with serverless commands as this is a great way to put what you've learnt to the test.

### Upload

Update ```serverless.yml``` to look like the following. You'll see in this example I've also included the resources section to fix a CORS issue when loading images from S3.

```
service: aws-nodejs # NOTE: update this with your service name

provider:
  name: aws
  runtime: nodejs4.3

# you can overwrite defaults here
#  stage: dev
  region: eu-west-1
  iamRoleStatements:
    - Effect: Allow
      Action:
        - s3:*
      Resource: "*"

functions:
  hello:
    handler: handler.hello
    environment:
      yourName: 'Ric'
    events:
      - http: GET /hello
  resize:
    handler: resize/index.resize
    events:
      - s3:
          bucket: ngd-workshop-uploads
          event: s3:ObjectCreated:*
          rules:
            - prefix: image
  upload:
    handler: upload/index.upload
    events:
      - http:
          method: get
          path: upload
  list:
    handler: list/index.list
    events:
      - http:
          method: get
          path: list
  show:
    handler: show/index.show
    events:
      - http:
          method: get
          path: show

resources:
  Resources:
    S3BucketNgdworkshopuploads:
      Properties:
        CorsConfiguration:
          CorsRules:
            - AllowedMethods:
                - PUT
              AllowedOrigins:
                - "*"
              AllowedHeaders:
                - "*"
```

The thing to note here is that the S3 Bucket parameter usedin resources is a little odd. Its the name of your bucket with all the - or _ removed and you need to prefix it with S3Bucket and capitalise the first letter of the bucket name.

Now lets include the code for upload, create a folder called ```upload``` and a file in that folder called index.js with the following code:

```
const AWS = require('aws-sdk')
const s3 = new AWS.S3()

const BUCKET = 'ngd-workshop-uploads'

module.exports.upload = function (event, context, callback) {
  const params = {
    Bucket: BUCKET,
    Key: `image${Date.now()}.jpeg`,
    ContentType: 'image/jpeg',
    ACL: 'public-read',
    Expires: 300 // expires in 5 minutes
  }
  const url = s3.getSignedUrl('putObject', params)

  const html = `
  <html>
    <head>
      <script src="https://cdn.rawgit.com/enyo/dropzone/master/dist/dropzone.js"></script>
      <script type="text/javascript">
        Dropzone.options.myAwesomeDropzone = {
          method: 'put',
          acceptedFiles: 'image/jpeg',
          sending: function(file, xhr) {
            xhr.setRequestHeader('Content-Type', file.type)
            xhr.setRequestHeader('x-amz-acl', 'public-read')
            var _send = xhr.send
            xhr.send = function() {
              _send.call(xhr, file)
            }
          }
        };
      </script>
    </head>
    <body>
      <h1>Upload your images</h1>
      <a href="list">Back to the list of images</a>
      <p>If you want to upload another picture please reload the site before dropping the file</p>
      <form action="${url}" class="dropzone" id="my-awesome-dropzone"></form>
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
```
Before saving tweak the name of the BUCKET variable to match your S3 bucket name.

Now lets create the folder called ```list``` and create index.js in it:

```
'use strict'

const AWS = require('aws-sdk')
const s3 = new AWS.S3()

const BUCKET = 'ngd-workshop-uploads'

module.exports.list = function (event, context, callback) {

  const params = {
    Bucket: BUCKET,
    Prefix: 'small'
  }
  s3.listObjects(params, function (err, data) {
    if (err) {
      callback(err)
    } else {
      let list = ''
      data.Contents.forEach(function (file) {
        let thumb = `https://${BUCKET}.s3.amazonaws.com/${file.Key}`
        list += `<li><a href="/dev/show?image=${file.Key.replace('small-', '')}"><img src="${thumb}" /></a></li>`
      })

      const html = `
      <html>
        <body>
          <a href="upload">Upload more images</a><br/>
          <ul>
            ${list}
          </ul>
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
  })
}
```
Yet again tweak the variable of your BUCKET.

Now create the ```show``` folder and the index.js file:

```
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
```
This also need you to change the BUCKET variable.

__Note:__ you shoul log ino the AWS console and go to S3 then select the previously uploaded images and make them public.

Now Deploy your application and you'll see you have a lot more endpoints available:

```
Serverless: Packaging service...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading service .zip file to S3 (111.05 KB)...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
..................
Serverless: Stack update finished...
Serverless: Removing old service versions...

Service Information
service: aws-nodejs
stage: dev
region: eu-west-1
api keys:
  None
endpoints:
  GET - https://XXXXXXXXXXXX.execute-api.eu-west-1.amazonaws.com/dev/hello
  GET - https://XXXXXXXXXXXX.execute-api.eu-west-1.amazonaws.com/dev/upload
  GET - https://XXXXXXXXXXXX.execute-api.eu-west-1.amazonaws.com/dev/list
  GET - https://XXXXXXXXXXXX.execute-api.eu-west-1.amazonaws.com/dev/show
functions:
  aws-nodejs-dev-show: arn:aws:lambda:eu-west-1:XXXXXXXXXXXX:function:aws-nodejs-dev-show
  aws-nodejs-dev-list: arn:aws:lambda:eu-west-1:XXXXXXXXXXXX:function:aws-nodejs-dev-list
  aws-nodejs-dev-hello: arn:aws:lambda:eu-west-1:XXXXXXXXXXXX:function:aws-nodejs-dev-hello
  aws-nodejs-dev-resize: arn:aws:lambda:eu-west-1:XXXXXXXXXXXX:function:aws-nodejs-dev-resize
  aws-nodejs-dev-upload: arn:aws:lambda:eu-west-1:XXXXXXXXXXXX:function:aws-nodejs-dev-upload

```

Try visiting these new endpoints and see what happens.
