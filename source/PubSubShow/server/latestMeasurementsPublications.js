Meteor.publish('latest-measurements', function(filter) {
  if(!this.userId){
    return this.ready();
  }
  return Measurements.find({userId: this.userId},{sort:{MDate:-1},limit:filter.limit});
});
