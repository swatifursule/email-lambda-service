<b>Backend is using AWS lambda service in NodeJS environment.</b>
To deploy backend, serverless framework is used.

<i>Note: Following installation is needed:</i>
1. Node and awscli from installer
2. serverless framework [npm install -g serverless]

<h3>Steps to deploy email backend service:</h3>

1. Clone the repository:
git clone https://github.com/swatifursule/email-lambda-service.git

2. Configre AWS:
aws configure

3. Inside serverless.yml, change deploymentBucket, with the existing bucket in your AWS account:
  deploymentBucket: < BUCKET-NAME>

4. Deploy the application using below command: 
cd email-lambda-service
sls deploy -v

5. Use serviceEndPoint as in output of above command: 

  ServiceEndpoint: https://xxxxxxxxxx.execute-api.ap-southeast-2.amazonaws.com/dev

6. To test the service, use curl command with above api and below body content.

      {
      "bccEmailAddresses": [
                          "EMAILID"
      ],
      "ccEmailAddresses": [
                          "EMAILID"
      ],
      "toEmailAddresses": [
                          "EMAILID"
      ],
      "bodyData": "My Testing with email service using lambda",
      "bodySubject": "Testing emails servive serverless lambda",
      "sourceEmail": "EMAILID"
      ,
      "replyToAddresses": [
                          "EMAILID"
      ]
      }
