import React from 'react'
class RoomList extends React.Component {
constructor(props){
  super(props)

}
  render(){
console.log("this.props.rooms",this.props.rooms);
const sortedRooms=[...this.props.rooms].sort((a,b)=> a.id-b.id  );


    return (
        <div className="col-2 room-list">
        <ul>
        Available Rooms
          {
            sortedRooms.map( (room) =>{
          const active=  room.id===this.props.roomId ? "roomActive" : "";
            return(  <li key={room.id} className={"message " + active} >
            <b>#
            <a onClick={()=>{this.props.subscribeToRoom(room.id)}} href="#" >
            {room.name}
            </a>
            </b>
            </li>
          )

        } )
      }
        </ul>
        </div>
    )
  }
}
export default RoomList
