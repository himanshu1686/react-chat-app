import React from 'react'
import ReactDOM from 'react-dom'

import MessageChild from './MessageChild'
class MessageList extends React.Component {

    constructor(props){
      super(props)

    }
    componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this)
    this.shouldScrollToBottom = node.scrollTop + node.clientHeight+100 >= node.scrollHeight
}
    componentDidUpdate(){
      //directly after component has been updated (change in props)
      if (this.shouldScrollToBottom) {
          const node = ReactDOM.findDOMNode(this)
         node.scrollTop = node.scrollHeight
         }
    }
      render(){
        if (!this.props.roomId) {
    return (
        <div className="message-list">
            <div className="join-room">
                &larr; Join a room!
            </div>
        </div>
    )
}
    return (
        <div className="col-10 messageBlock" >
        {
          this.props.messages.map(message =>{
            return(
              <div key={message.id} className="anMessage">
                <MessageChild username={message.senderId} text={message.text}/>
             </div>
            )
          }
        )
        }

        </div>
    )
  }
}
export default MessageList
