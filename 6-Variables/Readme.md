# Serverless Workshop

## Lambda Variables


serverless.yml
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
