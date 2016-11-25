# Serverless Workshop

## Default logs

Serverless will log the execution time of your function but little else to start with. All logs are actually pushed into AWS CloudWatch logs so you can use tools there to search for errors also. Its pretty easy to pull back logs for individual functions, simply run:

```serverless logs -f hello```

You should get an output like the following block.

```
START RequestId: 33f6ed08-b2f9-11e6-b00d-291e65779f34 Version: $LATEST
END RequestId: 33f6ed08-b2f9-11e6-b00d-291e65779f34
REPORT RequestId: 33f6ed08-b2f9-11e6-b00d-291e65779f34	Duration: 1.96 ms	Billed Duration: 100 ms 	Memory Size: 1024 MB	Max Memory Used: 15 MB

START RequestId: 0b2bd9a0-b2fa-11e6-a2d3-6586ebd0bbaa Version: $LATEST
END RequestId: 0b2bd9a0-b2fa-11e6-a2d3-6586ebd0bbaa
REPORT RequestId: 0b2bd9a0-b2fa-11e6-a2d3-6586ebd0bbaa	Duration: 2.09 ms	Billed Duration: 100 ms 	Memory Size: 1024 MB	Max Memory Used: 15 MB

START RequestId: 790ca3ef-b317-11e6-a207-e5102dcce6fd Version: $LATEST
END RequestId: 790ca3ef-b317-11e6-a207-e5102dcce6fd
REPORT RequestId: 790ca3ef-b317-11e6-a207-e5102dcce6fd	Duration: 2.14 ms	Billed Duration: 100 ms 	Memory Size: 1024 MB	Max Memory Used: 16 MB
```
By specifying the function with -f this allows you to debug many functions with out the clutter of other functions.

## Logging more

Your Lambda function can contain logging statements. These can be retrieved via the serverless logs command or you can view them in the console.

The following Node.js statements generate log entries:

 - console.log()
 - console.error()
 - console.warn()
 - console.info()

Lets add some logging to our application. Edit handler.js and add the following to an appropriate place:

```
console.log('Log Message');
```
Now invoke the function and checkout the logs again:

```
serverless invoke -f hello
serverless logs -f hello
```
You'll now see our log message included in the logs.

```
START RequestId: bf2af822-b318-11e6-b428-9d15d1931158 Version: $LATEST
2016-11-25 14:09:15.088 (+00:00)	bf2af822-b318-11e6-b428-9d15d1931158	Log Message
END RequestId: bf2af822-b318-11e6-b428-9d15d1931158
REPORT RequestId: bf2af822-b318-11e6-b428-9d15d1931158	Duration: 3.10 ms	Billed Duration: 100 ms 	Memory Size: 1024 MB	Max Memory Used: 15 MB
```
As you can see this is great for debugging and you can add these log messages and error outputs in key places in your code.

### Making logs more searchable

In CloudWatch Logs – To find your logs in CloudWatch you need to know the log group name and log stream name. You can get that information by adding the ```context.logGroupName```, and ```context.logStreamName``` methods in your code. When you run your Lambda function, the resulting logs in the console or CLI will show you the log group name and log stream name.

---
Ric Harvey - ngineered.co.uk 2016
