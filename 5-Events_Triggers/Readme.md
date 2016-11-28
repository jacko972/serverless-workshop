# Serverless Workshop

## Types of events
So far we've manually invoked our Lambda functions, but it the real world we want these to be triggered when something happens. Lambda has built in methods for this, a trigger can be from:

 - API Gateway
 - Kenesis Stream events
 - S3 events
 - SNS
 - Scheduled events (via cloudwatch)

We are going to look at two methods today, the API gateway and and S3 event.

## API gateway
Lets first of all modify our serverless.yml file so that Lambda knows to listen for a trigger when we use API gateway. Modify the functions section like below:

```
functions:
  hello:
    handler: handler.hello
    events:
      - http: GET /hello
```

Now redeploy your application:
```
serverless deploy
```
The output will be as follows:
```
Serverless: Packaging service...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading service .zip file to S3 (702 B)...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
....................
Serverless: Stack update finished...

Service Information
service: aws-nodejs
stage: dev
region: eu-west-1
api keys:
  None
endpoints:
  GET - https://XXXXXXXX.execute-api.eu-west-1.amazonaws.com/dev/hello
functions:
  aws-nodejs-dev-hello: arn:aws:lambda:eu-west-1:XXXXXXXXXXXX:function:aws-nodejs-dev-hello
```
You'll notice some extra info this time under endpoints. This is our API gateway URL, and this URL is what we'll use to invoke the function. Go ahead and browse to your URL. You should see your HTML being returned.

## S3
We've seen how a simple web request can trigger a lambda function but how about we do something more fun. Lets trigger a function when we upload a file to S3. To do this we are going to create a new function. Create a new folder in your code directory called resize and inside that create a file called index.js with the following content:

```
const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const gm = require('gm').subClass({imageMagick: true})

module.exports.resize = function (event, context, callback) {
  event.Records.forEach(function (e) {
    const params = {
      Bucket: e.s3.bucket.name,
      Key: e.s3.object.key
    }
    s3.getObject(params, function (err, data) {
      if (err) {
        callback(err)
      } else {
        gm(data.Body)
          .resize(100, 100)
          .setFormat('jpeg')
          .toBuffer(function (err, buffer) {
            if (err) {
              callback(err)
            } else {
              const params = {
                Bucket: e.s3.bucket.name,
                Key: `small-${e.s3.object.key}`,
                ACL: 'public-read',
                Body: buffer
              }
              s3.putObject(params, function (err, data) {
                callback(err)
              })
            }
          })
      }
    })
  })
}
```

This function is going to resize any JPEG we upload to S3 to a 100x100 version and save it back to S3. Before we can do that however we need to edit serverless.yml and add a few details and create a new S3 bucket. Theres no need to create the bucket as serverless will deploy this for you via cloudformation. In my case I call my bucket ```ngd-workshop-uploads```, you'll need to create something unique and tweak the code below.

Now lets edit the serverless.yml:
```
functions:
  hello:
    handler: handler.hello
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
```
Here we have added a second function to our application this time with a trigger of ```S3:ObjectCreated:*``` which does what it sounds like, trigger lambda every time a new object is created.

We also need to give your function permissions to write to the S3 bucket. Edit the serverless.yml file again and add this into the provider section under region:
```
  region: eu-west-1
  iamRoleStatements:
    - Effect: Allow
      Action:
        - s3:*
      Resource: "*"
```

__BUT WAIT__ Those of you with a keen eye will have noticed that our javascript has some requirements. One being the aws-sdk the other being gm (for imagemagick). The instances your code runs on already include the aws-sdk but not gm. SO how do we tell it to install. Its actually pretty simple. You need to include a ```package.json``` file in your root directory withthe following content:
```
{
  "dependencies": {
    "gm": "^1.23.0"
  }
}
```
Once you've edited the package.json file you'll need to run:
```
npm install
```
This creates the ```node_packages``` folder in your code directory read for upload.

Now go ahead and run ```serverless deploy``` This time you should note you have two functions list at the bottom of the output:
```functions:
  aws-nodejs-dev-hello: arn:aws:lambda:eu-west-1:XXXXXXXXXXXX:function:aws-nodejs-dev-hello
  aws-nodejs-dev-resize: arn:aws:lambda:eu-west-1:XXXXXXXXXXXX:function:aws-nodejs-dev-resize
```
### Testing
Log into the AWS console and navigate to S3 and find you're bucket. I've included a test image in the repository for you to upload to the bucket. Upload this via the AWS console.

Once uploaded refresh the bucket and you should see a small version of the file has also been created!

__Note:__ if you're uploading different images be sure to prefix them with image-

---
Ric Harvey - ngineered.co.uk 2016
