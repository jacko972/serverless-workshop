# Serverless Workshop

## Rollback
Servereless provides you with an easy way to revert your code to the previous version. Running:

```
serverless deploy list
```

Provides you with a list of your deployments in the S3 bucket that is used to upload your code.

For example:
```
Serverless: Listing deployments:
Serverless: -------------
Serverless: Timestamp: 1480110735404
Serverless: Datetime: 2016-11-25T21:52:15.404Z
Serverless: Files:
Serverless: - aws-nodejs.zip
Serverless: - compiled-cloudformation-template.json
Serverless: -------------
Serverless: Timestamp: 1480111125355
Serverless: Datetime: 2016-11-25T21:58:45.355Z
Serverless: Files:
Serverless: - aws-nodejs.zip
Serverless: - compiled-cloudformation-template.json
Serverless: -------------
Serverless: Timestamp: 1480111313230
Serverless: Datetime: 2016-11-25T22:01:53.230Z
Serverless: Files:
Serverless: - aws-nodejs.zip
Serverless: - compiled-cloudformation-template.json
Serverless: -------------
Serverless: Timestamp: 1480279078166
Serverless: Datetime: 2016-11-27T20:37:58.166Z
Serverless: Files:
Serverless: - aws-nodejs.zip
Serverless: - compiled-cloudformation-template.json
Serverless: -------------
Serverless: Timestamp: 1480279198979
Serverless: Datetime: 2016-11-27T20:39:58.979Z
Serverless: Files:
Serverless: - aws-nodejs.zip
Serverless: - compiled-cloudformation-template.json

```

To roll back to a previous version just make a note of its time stamp and run:

```
serverless rollback -t 1480111313230
```
You'll get conformation of the rollback
```
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
.....
Serverless: Stack update finished...
```

---
Ric Harvey - ngineered.co.uk 2016
