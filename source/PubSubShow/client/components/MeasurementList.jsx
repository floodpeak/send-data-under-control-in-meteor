MeasurementList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    let measurements = []
    let sub = Meteor.subscribe(this.props.publishName, this.props.filter)
    if(sub.ready()){
      measurements = Measurements.find({userId:Meteor.userId()}).fetch()
    }
    return {
      measurements:measurements
    }
  },
  render(){
    return <div>
      {
        this.data.measurements.map((item,index)=>{
          return <MeasurementItem {...item} key={index} />
        })
      }
    </div>
  }
})
