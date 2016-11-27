# Serverless Workshop

## Getting Started
Lets test and deploy our application and see what happens.

``` serverless deploy -v```

You should get an output like the following:

```
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
CloudFormation - CREATE_IN_PROGRESS - AWS::CloudFormation::Stack - aws-nodejs-dev
CloudFormation - CREATE_IN_PROGRESS - AWS::S3::Bucket - ServerlessDeploymentBucket
CloudFormation - CREATE_IN_PROGRESS - AWS::S3::Bucket - ServerlessDeploymentBucket
CloudFormation - CREATE_COMPLETE - AWS::S3::Bucket - ServerlessDeploymentBucket
CloudFormation - CREATE_COMPLETE - AWS::CloudFormation::Stack - aws-nodejs-dev
Serverless: Stack create finished...
Serverless: Packaging service...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading service .zip file to S3 (733 B)...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
CloudFormation - CREATE_COMPLETE - AWS::CloudFormation::Stack - aws-nodejs-dev
CloudFormation - UPDATE_IN_PROGRESS - AWS::CloudFormation::Stack - aws-nodejs-dev
CloudFormation - CREATE_IN_PROGRESS - AWS::IAM::Role - IamRoleLambdaExecution
CloudFormation - CREATE_IN_PROGRESS - AWS::IAM::Role - IamRoleLambdaExecution
CloudFormation - CREATE_COMPLETE - AWS::IAM::Role - IamRoleLambdaExecution
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Function - HelloLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::IAM::Policy - IamPolicyLambdaExecution
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Function - HelloLambdaFunction
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Function - HelloLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::IAM::Policy - IamPolicyLambdaExecution
CloudFormation - CREATE_COMPLETE - AWS::IAM::Policy - IamPolicyLambdaExecution
CloudFormation - UPDATE_COMPLETE_CLEANUP_IN_PROGRESS - AWS::CloudFormation::Stack - aws-nodejs-dev
CloudFormation - UPDATE_COMPLETE - AWS::CloudFormation::Stack - aws-nodejs-dev
Serverless: Stack update finished...

Service Information
service: aws-nodejs
stage: dev
region: eu-west-1
api keys:
  None
endpoints:
  None
functions:
  aws-nodejs-dev-hello: arn:aws:lambda:us-east-1:XXXXXXXXXXXX:function:aws-nodejs-dev-hello

Stack Outputs
HelloLambdaFunctionArn: arn:aws:lambda:us-east-1:XXXXXXXXXXXX:function:aws-nodejs-dev-hello
ServerlessDeploymentBucketName: aws-nodejs-dev-serverlessdeploymentbucket-XXXXXXXXXXXX
```

What's happening here is serverless is zipping up your files and uploading them to S3 and then telling lambda where to find the code. All this is executed via CloudFormation.

If you log into the AWS console you should also be able to see there is a function called aws-nodejs-dev-hello (or your new name) in the function list.

## Testing our code

To trigger our code to run you can do this via the AWS console but we'll use the serverless framework tool for this also as it keeps us working in the same place. Its pretty simple to run or invoke a function.

``` serverless invoke -f hello```

What we are doing here is telling serverless to run the code and the function called hello. Our output should be like the following:

```

{
    "statusCode": 200,
    "body": "{\"message\":\"Go Serverless v1.0! Your function executed successfully!\",\"input\":{}}"
}
```

## Updating Code

Lets edit our function and output some html rather than json as this will be more useful as we go through this workshop.

Open handler.js and edit the code so it looks like the following example:

```
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

  callback(null, response)

};
```


Now we need to push our changes to lambda:

```serverless deploy```

your output will be something like the following:

```
Serverless: Packaging service...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading service .zip file to S3 (683 B)...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
.....
Serverless: Stack update finished...

Service Information
service: aws-nodejs
stage: dev
region: eu-west-1
api keys:
  None
endpoints:
  None
functions:
  aws-nodejs-dev-hello: arn:aws:lambda:eu-west-1:XXXXXXXXXXXX:function:aws-nodejs-dev-hello
```
Now lets invoke our function again and see what happens:

```serverless invoke -f hello```

output:

```
{
    "statusCode": 200,
    "headers": {
        "Content-Type": "text/html"
    },
    "body": "\n  <html>\n    <body>\n\t<h1>Serverless Workshop</h1>\n\t<p>hello world of serverless</h1>\n    </body>\n  </html>"
}
```

As you can see its different. Later on we'll make this render in a browser.

---
Ric Harvey - ngineered.co.uk 2016
