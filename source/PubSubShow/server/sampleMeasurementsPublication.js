

Meteor.publish("sample-measurements-by-api", function(filter) {
  check(filter,Object)
  //datetime must be one of the list below
  let datetime = filter.datetime
  //num is the number of docs client want
  let num = filter.num

  check(datetime, String)
  check(num, Number);

  let threshold = num * 10;

  if(!_.contains(["day","week","month","year","quarter","isoWeek","minute"]
  , datetime)){
    return this.ready();
  }

  let self = this;
  let collName = "measurements";
  let sampleMeasures = [];
  let cond = {userId: this.userId}
  let refreshSampleMeasures = function(){
    _.each(sampleMeasures,function(m){
      self.removed(collName, m._id)
    });
    sampleMeasures = lookForSample(self,_.clone(cond),
      datetime,num,threshold);
    _.each(sampleMeasures,function(m){
      self.added(collName, m._id, m);
    });
  }
  let newestMeasurementHandle = Measurements.find(cond,
    {sort:{createdAt:-1},limit:1}).observeChanges({
    added:function(id,fields){
      refreshSampleMeasures();
    },
    changed:function(id,fields){
      refreshSampleMeasures();
    }
  });

  self.ready();
  self.onStop(function() {
    newestMeasurementHandle.stop();
  });
})

//pub is the publication
//cond is the condition to query
//datetime is the range of time to query
//num is sample number
//threshold is the number of starting using picking docs in db
let lookForSample = function(pub,cond,datetime,num,threshold){

  let sampleMeasurements = [];
  let latestMeasure = Measurements.findOne(cond,{sort:{MDate:-1},fields:{MDate:1,_id:0}});
  if(latestMeasure){
    let fromDate = latestMeasure.MDate;
    let toDate = moment(fromDate).subtract(1, datetime + 's').toDate();
    cond.MDate = {
      $gte:toDate,
      $lte:fromDate
    }
    let count = Measurements.find(cond).count();
    //console.log(count);
    if(count>threshold) {
      //console.log('pick docs in db');
      for (let i = 0; i < num; i++) {
        let opts = {
          sort: {MDate: -1},
          limit: 1,
          skip: Math.floor(((count - 1) / (num - 1)) * i)
        }
        sampleMeasurements.push(Measurements.findOne(cond, opts));
      }
    }else if(count>num){
      //console.log('pick docs in RAM');
      let measurements = Measurements.find(cond).fetch();
      let divider = Math.floor((count-1)/(num-1));
      sampleMeasurements = _.filter(measurements, function(bp,n){
        return n % divider === 0;
      })
    }else{
      //console.log('pick all');
      sampleMeasurements = Measurements.find(cond).fetch();
    }
  }
  return sampleMeasurements;
}
