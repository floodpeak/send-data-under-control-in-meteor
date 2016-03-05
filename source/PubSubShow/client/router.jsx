FlowRouter.route("/", {
  action: function(){
    ReactLayout.render(Navigator)
  }
});

FlowRouter.route("/all", {
  action: function() {
    ReactLayout.render(MeasurementList,{publishName:'all-measurements'})
  }
});

FlowRouter.route("/latest/:limit",{
  action:function(params){
    ReactLayout.render(MeasurementList,{
      publishName:'latest-measurements',
      filter:{limit:parseInt(params.limit)}})
  }
})

FlowRouter.route("/latestbyapi/:limit",{
  action:function(params){
    ReactLayout.render(MeasurementList,{
      publishName:'latest-measurements-by-api',
      filter:{limit:parseInt(params.limit)}})
  }
})

FlowRouter.route("/samplebyapi/:datetime/:num",{
  action:function(params){
    ReactLayout.render(MeasurementList,{
      publishName:'sample-measurements-by-api',
      filter:{datetime:params.datetime,num:parseInt(params.num)}})
  }
})
