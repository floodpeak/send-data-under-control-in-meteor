Meteor.publish('latest-measurements-by-api', function(filter) {
  if(!this.userId){
    return this.ready();
  }

  var self = this;

  var subHandle = Measurements.find({userId: this.userId},{sort:{MDate:-1},limit:filter.limit}).observeChanges({
    added: function (id, fields) {
      self.added("measurements", id, fields);
    },
    changed: function(id, fields) {
      self.changed("measurements", id, fields);
    },
    removed: function (id) {
      self.removed("measurements", id);
    }
  });

  self.ready();

  self.onStop(function () {
    subHandle.stop();
  });
});
