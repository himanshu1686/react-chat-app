import React from 'react'
class MessageChild extends React.Component{
  constructor(props){
    super(props)

  }
  render(){

    return(
      <div className="anMessage">
          <div className="messageBy">sent by -{this.props.username}</div>
          <div className="messageText"> sent Text-{this.props.text}</div>
      </div>
    )
  }
}
export default MessageChild
