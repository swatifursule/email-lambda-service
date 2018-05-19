Backend is using AWS lambda function in NodeJS environment.
To deploy backend, serverless framework is used.

Note: Following installation is needed:
1. Node and awscli from installer
2. serverless framework [npm install -g serverless]

Steps to deploy email backend service:

1. Clone the repository:
git clone https://github.com/swatifursule/email-lambda-service.git

2. Configre AWS
aws configure

3. Inside serverless.yml, change deploymentBucket, with the existing bucket in your AWS account.
  deploymentBucket: < BUCKET-NAME>

4. Deploy the application using below command: 
cd email-lambda-service
sls deploy -v

5. Use serviceEndPoint as in output of above command: 

ServiceEndpoint: https://4puqpns0ze.execute-api.ap-southeast-2.amazonaws.com/dev

To test the service, use curl command with above api and below body content.

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
  "subjectdata": "Testing emails servive serverless lambda",
  "sourceEmail": "EMAILID"
  ,
  "replyToAddresses": [
    "EMAILID"
  
  ]
}