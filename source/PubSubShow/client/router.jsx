FlowRouter.route("/all", {
  action: function() {
    ReactLayout.render(MeasurementList,{publishName:'all-measurements'})
  }
});

FlowRouter.route("/latest/:limit",{
  action:function(params){
    ReactLayout.render(MeasurementList,{publishName:'latest-measurements',filter:{limit:parseInt(params.limit)}})
  }
})
