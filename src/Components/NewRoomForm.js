import React from 'react'
class NewRoomForm extends React.Component {
  constructor(props){
    super(props)
  this.state={
    roomName:""
  }
  }
  handleChange =(e)=>{
    this.setState({
      roomName:e.target.value
    })
  }
  handleSubmit=(e)=>{
    e.preventDefault();
    this.props.createRoom(this.state.roomName);
    this.setState({roomName:""})
  }
  render(){

    return (
        <div className="col-2 newRoom">

        <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleChange} value={this.state.roomName} required placeholder="New Room name pres enter to submit"/>
        </form>
        </div>
    )
  }
}
export default NewRoomForm
