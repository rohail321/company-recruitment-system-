import React, { Component } from 'react'
import firebase from '../../firebase'
import {withRouter} from 'react-router'

export class CompanyRegister extends Component {
    constructor(props){
        super(props)
        this.state={
            email:"",
            password:"",
            name:'',
            founded:"",
            isCompany:true
           


        }
    }

    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit=(e)=>{
        const{history}=this.props
        e.preventDefault()
        const db=firebase.firestore()
        db.collection('user').add(this.state)
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then((res)=>{console.log(res)})
        .catch(err=>{
            console.log(err)
        })
        setTimeout(()=>{ 
             history.push('/dashboard/profile')
    },3000)

    }
    render() {
        
        return (
            <div style={register_box}>
                   <form className="form-signin" onSubmit={this.onSubmit}>
      
      <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>
      <label htmlFor="inputEmail" className="sr-only">Email address</label>
      <input  type="email" id="inputEmail" className="form-control" name='email' onChange={this.onChange} value={this.state.email} placeholder="Email address" required />
      <label htmlFor="inputPassword" className="sr-only">Password</label>
      <input style={{marginTop:'10px'}} type="password" id="inputPassword" name='password' value={this.state.password} onChange={this.onChange} className="form-control" placeholder="Password" required/>
      <label htmlFor="companyname" className="sr-only">Company Name</label>
      <input style={{marginTop:'10px'}} type="text" id="companyname" name='name' value={this.state.name} onChange={this.onChange} className="form-control" placeholder="Company Name" required/>
      <label htmlFor="founded" className="sr-only">founded</label>
      <input style={{marginTop:'10px'}} type="text" id="founded" name='founded' value={this.state.founded} onChange={this.onChange} className="form-control" placeholder="Founded on" required/>
      <div className="checkbox mb-3">
        <label>
        </label>
      </div>

      <button className="btn btn-lg btn-primary btn-block" type="submit">SignUp</button>

    </form>
                
            </div>
        )
    }
}

export default withRouter(CompanyRegister) 
const register_box={display:"flex",justifyContent:"center",marginTop:"180px"}
