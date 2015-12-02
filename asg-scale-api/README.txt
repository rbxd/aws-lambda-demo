Simple Amazon API Gateway / Lambda code to scale an Auto-Scaling group
---

INSTRUCTIONS
---
Install NPM dependencies:
 $ npm install

Package:
 $ zip -r asg-scale.zip index.js node_modules

Register Lambda function with AWS:
 $ aws lambda create-function \
     --function-name ASGScale \
     --runtime nodejs \
     --role arn:aws:iam::XXXXXXXXXXXX:role/lambda_basic_execution \
     --handler index.handler \
     --zip-file fileb://asg-scale.zip

Or update, in case it already exists:
 $ aws lambda update-function-code \
     --function-name ASGScale \
     --zip-file fileb://asg-scale.zip

Modify Swagger definition to reflect the actual Lambda and IAM ARNs.

Create API Gateway from the Swagger definition:
 $ cd ../aws-apigateway-importer
 $ ./aws-api-import.sh -c -d demo ../asg-scale-api/swagger.json

(optionally) 
Modify Swagger definition to reflect the actual API host name and basePath
  and feed it into http://petstore.swagger.io/ to explore API methods
