import React from 'react'
class NewMessagForm extends React.Component {
  constructor(props){
    super(props)
    this.state={
      message:''
    }
  }
handleChange = (e)=>{
//  e.persist();
  console.log(e);
this.setState({
  message:e.target.value
})

}
handleSubmit= (e)=>{
  e.preventDefault();
  this.props.sendMessage(this.state.message,this.props.roomId);
  this.setState({
    message:""
  })
}
  render(){

    return (
        <div className="col-10 messageForm">
          <form onSubmit={this.handleSubmit}>
             <input
             disabled={this.props.disabled}
             type="text"
              placeholder="start typing here"
             onChange={this.handleChange}
              value={ this.state.message }

             />
             
          </form>
        </div>
    )
  }
}
export default NewMessagForm
