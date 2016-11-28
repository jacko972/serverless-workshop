# Serverless Workshop
This Workshop is designed to teach yo the basics of how to use the serverless framework to build and deploy applications. Its not a lesson in coding in JavaScript / nodeJS by any means so please feel free to build on these examples and improve along the way to aid your learning. Also if you spot any mistakes or have enhancements please submit a pull request via GitHub.

## The workshop
During this workshop we are going to build a simple application, we'll start with hello world and move on to develop a application that resizes images when they are uploaded to S3. By the end of the exercises you should be confident in using the serverless framework to create new, deploy and debug functions that are running in AWS Lambda.

We'll build:

 - A hello world function with json and html responses
 - A image resize function linked to S3
 - A upload function to add images to the system
 - A list images in S3 function
 - A view image function

We'll also learn about:

- Event data
- The AWS API Gateway
- API Keys for private functions

## Requirements

You need to have installed and working knowledge of:

 - An AWS account (and your AWS keys setup on your machine see: https://aws.amazon.com/cli/)
  - also set up your default .aws profile
 - Git
  - A Giithub account would be an advantage
 - NodeJS
 - NPM

## Conventions
Code and output will be highlighted in the following way:

```
some command to run
....
or some output
```

If a file or directory is referenced in the documentation it will be highlighted inline like so:

some generic text about file ```xyz.zip``` that you need to look at.

Important notes will be in bold like so:

__Note:__ This is an important note

## Clean up
Once you've finished this Workshop to delete all the resources created run:

```serverless remove```

from your code directory. This will prevent you incurring future costs.

## Further Reading

 - [AWS Lambda Docs](http://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
 - [Serverless Framework](https://serverless.com/framework/docs/)
 - [Book: AWS Lambda: A guide serverless microservies](https://www.amazon.co.uk/AWS-Lambda-Guide-Serverless-Microservices-ebook/dp/B016JOMAEE/ref=sr_1_1?ie=UTF8&qid=1480370019&sr=8-1&keywords=Lambda)
 - [Book: Aws Lambda in Action: Event-Driven Serverless ApplicationsAws Lambda in Action: Event-Driven Serverless Applications](https://www.amazon.co.uk/Aws-Lambda-Action-Event-Driven-Applications/dp/1617293717/ref=sr_1_4?ie=UTF8&qid=1480370148&sr=8-4&keywords=Lambdahttps://www.amazon.co.uk/Aws-Lambda-Action-Event-Driven-Applications/dp/1617293717/ref=sr_1_4?ie=UTF8&qid=1480370148&sr=8-4&keywords=Lambda)

---
Ric Harvey - ngineered.co.uk 2016
