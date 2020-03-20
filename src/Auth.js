import React, { Component }  from "react";

class Auth extends Component{
  constructor(props){
    super(props)
    this.state={
      isAuth:false
    }
  }

  login(signin){
    console.log(signin)
  }
  logout(signout){

  }
}
export default new Auth