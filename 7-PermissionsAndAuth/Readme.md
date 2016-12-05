# Serverless Workshop

## Permissions
In this workshop we've edited ```serverless.yml``` and added some settings that allowed us to write to an S3 bucket. We added these lines to the provider section:

```
   iamRoleStatements:
    - Effect: Allow
      Action:
        - s3:*
      Resource: "*"
```

### Why do we do this?
By default serverless creates lambda functions with the basic execution role, which is just enough permission to allow a function to run. However when you want to start interacting with more AWS services you need to give this role more permissions to do that.

A good way to work out what actions you need is to use the AWS policy generator:  [https://awspolicygen.s3.amazonaws.com/policygen.html](https://awspolicygen.s3.amazonaws.com/policygen.html)

You can use the IAM policy type to generate you a list of actions to add to the file. Try adding permissions for DynamoDB for example.

You should end up generating a setting like ```dynamodb:*	``` which you can easily add to your ```serverless.yml```

```
   iamRoleStatements:
    - Effect: Allow
      Action:
        - s3:*
        - dynamodb:*
      Resource: "*"
```

Remember IAM is granular and its best practice to limit the Resources from * to specific entities such as a named S3 bucket or DB table.

We can also set IAM roles in the resources section and create entire policies for our functions. Functions can also be given different permissions to each other. The below example shows defining a default IAM role and a custom role for a function:

```
service: new-service

provider:
  name: aws
  role: myDefaultRole

functions:
  func0:
    role: myCustRole0
    ...
  func1:
    ... # does not define role

resources:
  Resources:
    myDefaultRole:
      Type: AWS::IAM::Role
      Properties:
        Path: /my/default/path
        RoleName: MyDefaultRole
        AssumeRolePolicyDocument:
          Version: '2017'
          Statement:
            - Effect: Allow
              Principal:
                Service:
                  - lambda.amazonaws.com
              Action: sts:AssumeRole
        Policies:
          - PolicyName: myPolicyName
            PolicyDocument:
              Version: '2017'
              Statement:
                - Effect: Allow # note that these rights are given in the default policy and are required if you want logs out of your lambda(s)
                  Action:
                    - logs:CreateLogGroup
                    - logs:CreateLogStream
                    - logs:PutLogEvents
                  Resource: arn:aws:logs:${region}:${accountId}:log-group:/aws/lambda/*:*:*
                -  Effect: "Allow"
                   Action:
                     - "s3:PutObject"
                   Resource:
                     Fn::Join:
                       - ""
                       - - "arn:aws:s3:::"
                         - "Ref" : "ServerlessDeploymentBucket"
    myCustRole0:
      Type: AWS::IAM::Role
      Properties:
        Path: /my/cust/path
        RoleName: MyCustRole0
        AssumeRolePolicyDocument:
          Version: '2017'
          Statement:
            - Effect: Allow
              Principal:
                Service:
                  - lambda.amazonaws.com
              Action: sts:AssumeRole
        Policies:
          - PolicyName: myPolicyName
            PolicyDocument:
              Version: '2017'
              Statement:
                - Effect: Allow
                  Action:
                    - logs:CreateLogGroup
                    - logs:CreateLogStream
                    - logs:PutLogEvents
                  Resource: arn:aws:logs:${region}:${accountId}:log-group:/aws/lambda/*:*:*
                - Effect: Allow
                  Action:
                    - ec2:CreateNetworkInterface
                    - ec2:DescribeNetworkInterfaces
                    - ec2:DetachNetworkInterface
                    - ec2:DeleteNetworkInterface
                  Resource: "*"
```
## Authentication
So far we've created public accessible functions via API gateway that anyone with the correct URL can trigger. However it is possible to lock this down to only authorised users. In order to do this you need to create an API key in the AWS API Gateway console in your browser. Once you have this key copy it as we'll need to add it to your ```serverless.yml``` file. When creating the key you'll need to assign that key to your API (app name) and to the dev stage as thats what we are currently working with.

Now in ```serverless.yml``` you'll need to add your API key to the provider section. Note this can be a list of many keys.

```
provider:
  name: aws
  runtime: nodejs4.3

# you can overwrite defaults here
#  stage: dev
  region: eu-west-1
  apiKeys:
    - CjIbtkc8c646WxwVoCTaW9GIXXXXXXXXXXXXXXXX
  iamRoleStatements:
    - Effect: Allow
      Action:
        - s3:*
      Resource: "*"
```

Now this allows the serverless framework to set up your access in API gateway. To enable it for particular functions add the ```private: true``` in the function definition like below.

```
functions:
  hello:
    handler: handler.hello
    environment:
      yourName: 'Ric'
    events:
      - http:
          method: GET
          path: /hello
          private: true
```

Now run ```serverless deploy``` and once it's deployed try browsing to your hello function API URL.

You now should get a message in JSON that looks like the following:

```{"message": "Forbidden"}```

Now if you head over to [https://www.getpostman.com/](https://www.getpostman.com/) and install the postman application we can test this with your API keys. Follow the instructions here:

[http://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-use-postman-to-call-api.html](http://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-use-postman-to-call-api.html)

__Note: __ You will also need to assign the API Key to a Usage Plan.


Now when you click send, postman should return the HTML rather than a forbidden message.

---
Ric Harvey - ngineered.co.uk 2016
