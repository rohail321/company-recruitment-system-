import React from 'react'
import {NavLink} from 'react-router-dom'
import { withRouter, Redirect } from "react-router";
import firebase from "../../firebase";
import { AuthContext } from "../../Auth";



const Login = (props) => {
    const{panel}=props
    let path
    if(panel==='student'){
        path='/student/register'
    }
    else if(panel==='company'){
        path='/company/register'
    }
    else if(panel==='admin'){
        path='/admin/register'
    }
    return (
        <div style={login_box}>
            <form className="form-signin" onSubmit={props.onSubmit}>
      
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label htmlFor="inputEmail" className="sr-only">Email address</label>
      <input  type="email" id="inputEmail" className="form-control" name='email' onChange={props.onChange} value={props.email} placeholder="Email address" required />
      <label htmlFor="inputPassword" className="sr-only">Password</label>
      <input style={{marginTop:'10px'}}  type="password" id="inputPassword" name='password' value={props.password} onChange={props.onChange} className="form-control" placeholder="Password" required  />
      <div className="checkbox mb-3">
        <label>
        </label>
      </div>

      <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      
      <NavLink to={path}> <p>Dont have account,Sign up!</p></NavLink>
      <NavLink to='/forgotpassword'> <p>Forgot Password!</p></NavLink>


    </form>
            
        </div>
               
    )
}

export default Login
const login_box={display:"flex",justifyContent:"center",marginTop:"180px",}
