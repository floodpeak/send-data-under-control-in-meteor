Meteor.startup(function(){
  let user = Accounts.findUserByUsername("Jonathan")

  if(!user){
    let userId = Accounts.createUser({
      username:"Jonathan",
      email:"hongfengzhou@yahoo.com",
      password:"happy"
    })
    seedMeasurements(userId)
  }

});

//make 500 measurements belongs to
//a patient who is healthier 
function seedMeasurements(userId) {
  for(var i =0;i<500;i++){
    var now = new Date();
    var newHeartRate = Math.floor(Math.random()*21+60);

    var tsRandom = Math.floor(Math.random()*3600*24*368*1000);

    var newMDate = new Date(new Date().getTime() - tsRandom);

    var delta = 3600*24* 92 *1000;
    var n = Math.floor(tsRandom / delta);
    var newLow = Math.floor(Math.random()*10 + 70 + 10 * n);
    var newHigh = Math.floor(Math.random()*20 + 100 + 20 * n);

    var newMeasurement = {
        "diastolic" : newLow,
        "systolic" : newHigh,
        "heartRate" : newHeartRate,
        "deviceAddress" : "8CDE521448F0",
        "deviceModel" : "BP5",
        "MDate" : newMDate,
        "userId" : userId,
        "deviceType" : "BP",
        "dataSouce":"fake",
        "createdAt" : now
    }
    Measurements.insert(newMeasurement)
  }

}
