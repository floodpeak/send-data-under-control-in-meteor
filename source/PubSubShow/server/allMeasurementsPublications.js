Meteor.publish('all-measurements', function() {
  if(!this.userId){
    return this.ready();
  }
  return Measurements.find({userId: this.userId});
});
