# Serverless Workshop
This Workshop is designed to teach yo the basics of how to use the serverless framework to build and deploy applications. Its not a lesson in coding in JavaScript / nodeJS by any means so please feel free to build on these examples and improve along the way to aid your learning. ALso if you spot any mistakes or have enhancements please submit a pull request via GitHub.

## The workshop
Durring this workshop we are going to build a simple application, we'll start with hello world and move on to develop a application that resizes images when they are uploaded to S3.

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
Once you've finsihed this Workshop to delete all the resources created run:

```serverless remove```

from your code directory. This will prevent you incurring future costs.

---
Ric Harvey - ngineered.co.uk 2016
