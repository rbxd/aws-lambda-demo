var AWS = require('aws-sdk');
var async = require('async');
 
exports.handler = function(event, context) {
  console.log('Got event: ');
  console.log(event);

  var autoscaling = new AWS.AutoScaling({region: 'us-east-1'});
  var asg;

  async.waterfall([
    function getASGs(next) {
      console.log("Getting the list of Auto-Scaling groups.");
      autoscaling.describeAutoScalingGroups(
        event.asgName ? { AutoScalingGroupNames: [ event.asgName ] } : { } ,
        next);
    },
    function filterASGs(response, next) {
      console.log('Got ASG: ');
      console.log(response);

      if (response.AutoScalingGroups === undefined || response.AutoScalingGroups.length == 0 ) {
        var error = new Error("NotFound: Auto-scaling group doesn't exist");
        return context.fail(error);
      }

      var asgs = response.AutoScalingGroups.map( function(el) {
        return {
          asgName: el.AutoScalingGroupName,
          minInstances: el.MinSize,
          maxInstances: el.MaxSize,
          runningInstances: el.Instances.length
        }
      })

      console.log('Modified ASG information: ');
      console.log(asgs);

      if ( event.body && event.body.minInstances !== undefined && event.body.maxInstances !== undefined && event.asgName ) {
        console.log('Processing the scaling request.');

        asg = asgs[0];

        asg.minInstances = event.body.minInstances;
        asg.maxInstances = event.body.maxInstances;

        autoscaling.updateAutoScalingGroup( {
          AutoScalingGroupName: asg.asgName,
          MinSize: asg.minInstances,
          MaxSize: asg.maxInstances
        }, next );
      }
      else {
        console.log('Just outputting the list of Auto-Scaling Groups.');

        next(null, asgs);
      }
    }
  ],
  function (err, result) {
    if (err) {
      console.error('Failed to process the request: ', err);
    } else {
      console.log("Successfully handled the request: ");
      console.log(result);
    }
    console.log('ASG object:' );
    console.log(asg);
    context.done(err, asg ? asg : result);
  });
};
