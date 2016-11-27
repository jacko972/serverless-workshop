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
        - dunamodb:*
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

---
Ric Harvey - ngineered.co.uk 2016
