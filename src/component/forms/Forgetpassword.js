import React, { Component } from 'react'
import firebase from '../../firebase'

export class Forgetpassword extends Component {
    constructor(props){
        super(props)
        this.state={
            email:''
        }
        
    }
    onChange=(e)=>this.setState({email:e.target.value})
    onSubmit=(e)=>{
        e.preventDefault()
        let auth = firebase.auth();
        auth.sendPasswordResetEmail(this.state.email).then(function() {
            // Email sent.
          }).catch(function(error) {
            // An error happened.
          });

    }

    render() {
        return (
            <div>
                 <div style={formGap}></div>
<div className="container" style={{marginLeft:'450px'}}>
	<div className="row">
		<div className="col-md-4 col-md-offset-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="text-center">
                  <h3><i className="fa fa-lock fa-4x"></i></h3>
                  <h2 className="text-center">Forgot Password?</h2>
                  <p>You can reset your password here.</p>
                  <div className="panel-body">
    
                    <form id="register-form" role="form" autocomplete="off" className="form" onSubmit={this.onSubmit}>
    
                      <div className="form-group">
                        <div className="input-group">
                          <input id="email" name="email" placeholder="email address" className="form-control" value={this.state.email}  
                          onChange={this.onChange} type="email"/>
                        </div>
                      </div>
                      <div className="form-group">
                        <input name="recover-submit" className="btn btn-lg btn-primary btn-block" value="Reset Password" type="submit"/>
                      </div>
                      
                    </form>
    
                  </div>
                </div>
              </div>
            </div>
            </div>
            </div></div>
            </div>
        )
    }
}

export default Forgetpassword
const formGap ={
    paddingTop: '90px'
}