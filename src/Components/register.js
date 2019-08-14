import React from 'react'
class RegisterForm extends React.Component{
  constructor(props){
    super(props)
    this.state={
      userId:'',
      displayName:''
    }
  }
  handleUserIdChange= (e)=>{
    this.setState({
        userId:e.target.value
    })

  }
  handleDisplayNameChange= (e)=>{
    this.setState({
        displayName:e.target.value
    })
  }
  registerNewUser=(e)=>{
    e.preventDefault();
    this.props.registerNewUser(this.state.userId,this.state.displayName);
  }
  render(){

    return(
      <div class="form-container  ">
      <form onSubmit={this.registerNewUser} >
        <input type="text" value={this.state.userId} onChange={this.handleUserIdChange} placeholder="user Id "/>
        <br/>
        <input type="text" value={this.state.displayName} onChange={this.handleDisplayNameChange} placeholder="Display name" />
        <br/>
        <button type="submit" >Add New User</button>
      </form>
      </div>
    )
  }
}
export default RegisterForm
