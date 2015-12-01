var AWS = require('aws-sdk');
var async = require('async');
 
exports.handler = function(event, context) {
  console.log('Got event: ');
  console.log(event);

  var asgs = [
    {
      "asgName": "asg1",
      "minInstances": 1,
      "maxInstances": 2,
      "runningInstances": 2
    },{
      "asgName": "asg2",
      "minInstances": 3,
      "maxInstances": 4,
      "runningInstances": 3
    }
  ];
    
  var response;
    
  if ( event.asgName === undefined ) {
    response = asgs;
  }
  else {
    response = asgs.filter( function(el) {return el['asgName'] === event.asgName;} )[0]
      
    if ( response === undefined ) {
      var error = new Error("NotFound: Auto-scaling group doesn't exist");
      context.fail(error);
    }
      
    if ( event.body.minInstances !== undefined ) {
      response.minInstances = event.body.minInstances;
    }
      
    if ( event.body.maxInstances !== undefined ) {
      response.maxInstances = event.body.maxInstances;
    }
  }
  
  context.done(null, response); // GREAT SUCCESS
};
