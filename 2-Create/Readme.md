# Serverless Workshop

Serverless will create your initial project lay out by using templates, examples of templates are:

 - aws-nodejs
 - aws-python

For this workshop we'll be using NodeJS

## Create your first project

Lets get going and set up an area to work in:

```mkdir my-first-serverless && cd my-first-serverless```

Now lets bootstrap the serverless scaffolding:

```serverless create --template aws-nodejs```

So lets have a look what this has done. You'll notice 3 new files in your directory.

#### event.json
This file contains test data for for when triggering your function. We'll get to this later but its basically a JSON wrapper of POST data to your function.

#### handler.js
This is your code and where your function lives it houses the main function that is invoked by lambda.

#### serverless.yml
This is your config file to control how the project is deployed. What's happening under the hood is that the serverless framework is actually constructing AWS CloudFormation for you and using that to deploy your lambda function.

__Note: __ beware of tabs in these files try and use spaces to avoid parsing errors

### A few tweaks to serverless.yml

In this workshop we are going to edit this file before we do anything else! The main reason is our closest AWS region is eu-west-1 and the default for the framework is us-east-1, but we'll make some other changes whilst we go along/

So open the serverless.yml file in your preferred editor. First we are going to edit the **service** section of the file and give your deployment its own name. Rename your project by editing the line:

```service: aws-nodejs```

Now lets set our region to something more local. Find the provider section and edit the line:

```# region: us-east-1```

and make it look like the following:

```region: eu-west-1```

Another section in this file is functions, this tells the deploy what lambda functions to create and where the code lives. In our case its says ```handler.hello``` to understand this the first part handler refers to the file name ```handler.js``` and hello is the function that's called inside that file.

---
Ric Harvey - ngineered.co.uk 2016
