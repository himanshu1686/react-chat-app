import React from 'react';
import './App.css';
import MessageList from './Components/MessageList'
import RoomList from './Components/RoomList'
import NewRoomForm from './Components/NewRoomForm'
import SendMessageForm from './Components/SendMessageForm'
import RegisterForm from './Components/register'
import './mycss.css'
const chatkitTestTokenUrl="<token url>";
const Chatkit = require("@pusher/chatkit-client");
const ChatkitServer = require("@pusher/chatkit-server");
//import Chatkit from "@pusher/chatkit-server
console.log("inside App.js");
const chatkitServer = new ChatkitServer.default({
  instanceLocator:"<instanceLocator>" ,
  key: "<key>"

})
console.log(chatkitServer);
class App extends React.Component {
constructor(props){
  super(props)
  this.state={
    messages:[],
    joinableRooms:[],
    joinedRooms:[],
    roomId:null,
    userId:''
  }
}
registerNewUser = (userId,displayName) =>{
  chatkitServer.getUser({id:userId})
  .then(gotUser=>{console.log("got userback ", gotUser);
  this.setState({
    userId:gotUser.id
  })
  this.connectTheUser();
})
  .catch(err=>{
    console.log("got err ",err);
    if(err.error_description === "The requested user does not exist"){

      chatkitServer.createUser({
          id: userId,
          name: displayName,
        })
        .then((obj) => {
            console.log('User created successfully,', obj);
            this.setState({
                userId:userId
              });
              console.log(this)
              this.connectTheUser();
            }).catch((err) => {
                console.log(err);
              });
    }

});
}
connectTheUser=()=>{
  const chatManager = new Chatkit.ChatManager({
    instanceLocator:",instance locater",
    userId:this.state.userId,
    tokenProvider: new Chatkit.TokenProvider({
      url:chatkitTestTokenUrl
    })
  });
chatManager.connect().then(currentUser=>{
  this.currentUser=currentUser;
  console.log("inside chatmanegr connect",this);
  // console.log("in component did mount chatmanager connect",this.currentUser);
  this.getRooms();
});
}
componentDidMount(){

//end of componentDid Mount
}
subscribeToRoom = (roomId)=>{
  this.setState({
    messages:[]
  })
  this.currentUser.subscribeToRoom({
    roomId:roomId,
    hooks:{
      onMessage:(message) =>{
        this.setState({
          messages:[...this.state.messages,message ]
        })
      }
    }
  }).then(()=>{
    this.setState({
      roomId:roomId
    })
    this.getRooms();

  });
}
getRooms=()=>{
  this.currentUser.getJoinableRooms().then(joinableRooms=>{
    console.log("joinable rooms",joinableRooms);
    this.setState({
      joinableRooms,
      joinedRooms:this.currentUser.rooms
    })
  })
}
sendMessage = (text,roomId)=> {
  console.log(this.currentUser);
     this.currentUser.sendMessage({
         text:text,
         roomId:roomId
     })
 }
createRoom = (roomName)=>{
console.log(roomName);
this.currentUser.createRoom({
  name:roomName
})
.then((room)=>{
  this.subscribeToRoom(room.id);
}).catch(err=>{console.log(err);})
}
render(){
  if(!this.state.userId){
    return (
      <div className="mypage">
       <RegisterForm registerNewUser={this.registerNewUser} userId={this.state.userId} />
      </div>
    )
  }
    return (
      <div className="mypage">
      <div className="row">
      <RoomList
      subscribeToRoom={this.subscribeToRoom}
      rooms={[...this.state.joinableRooms,...this.state.joinedRooms]}
      roomId={this.state.roomId }

      />
      <MessageList messages={this.state.messages} roomId={this.state.roomId }/>
      </div>
      <div className="row">
      <NewRoomForm  createRoom={this.createRoom}/>
      <SendMessageForm
      sendMessage={this.sendMessage }
      disabled={!this.state.roomId}
      roomId={this.state.roomId }/>
      </div>
      </div>

  );

}
}
export default App;
