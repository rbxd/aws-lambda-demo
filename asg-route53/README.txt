AWS Lamda function for updating Route53 Resource Records
 for AWS Auto-Scaling group instances
---

https://objectpartners.com/2015/07/07/aws-tricks-updating-route53-dns-for-autoscalinggroup-using-lambda/
 (c) John Engelman

INSTRUCTIONS
---
Install NPM dependencies:
 $ npm install

Package:
 $ zip -r asg-sns-update-route53.zip index.js node_modules

Register Lambda function with AWS:
 $ aws lambda create-function \
     --function-name ASGToRoute53 \
     --runtime nodejs \
     --role arn:aws:iam::XXXXXXXXXXXX:role/lambda_basic_execution \
     --handler index.handler \
     --zip-file fileb://asg-sns-update-route53.zip
