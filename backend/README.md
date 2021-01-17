## First steps

First you have to create an account on MongoDB Atlas, if you already have,
jump this step.
After create your account, create a cluster and go on Connect after it is on.
Choose connect to your application option and choose Node.js. This will give your a link that
you will use to connect to MongoDB database. With this link go into src/resources/db/connection and
change the variable URI to your path correctly, and your are good to go.

####After this, you have to install serverless and serverless -offline by tipping
```npm install serverless -g``` and ```npm install serverless-offline```

####Install mongoose:
```npm install mongoose```

####Install uuid:
```npm install uuid```

####And if you will use node-mailer or other library that sents email, install it.

## Commands
To run the server you can type this command in your console:
``sls offline start --httpPort 3001``
