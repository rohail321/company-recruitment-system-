import React, { Component } from 'react'
import {withRouter} from 'react-router'
import firebase from '../../firebase'

export class StudentRegister extends Component {
    constructor(props){
        super(props)
        this.state={
            email:"",
            password:"",
            name:'',
            age:"",
            semester:"",
            cgpa:"",
            experince:"",
            skills:"",
            fieldofstudy:"",
            number:'',
            isStudent:true

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
      <label htmlFor="name" className="sr-only"> Name</label>
      <input  style={{marginTop:'10px'}}type="text" id="name" name='name' value={this.state.name} onChange={this.onChange} className="form-control" placeholder="Name" required/>
      <label htmlFor="age" className="sr-only"> Age</label>
      <input  style={{marginTop:'10px'}}type="text" id="age" name='age' value={this.state.age} onChange={this.onChange} className="form-control" placeholder="Age" required/>
      <label htmlFor="semester" className="sr-only"> semester</label>
      <input style={{marginTop:'10px'}} type="text" id="semester" name='semester' value={this.state.semester} onChange={this.onChange} className="form-control" placeholder="Semester" required/>
      <label htmlFor="cgpa" className="sr-only"> cgpa</label>
      <input style={{marginTop:'10px'}} type="text" id="cgpa" name='cgpa' value={this.state.cgpa} onChange={this.onChange} className="form-control" placeholder="cgpa" required/>
      <label htmlFor="experince" className="sr-only"> Experince</label>
      <input style={{marginTop:'10px'}} type="text" id="experince" name='experince' value={this.state.experince} onChange={this.onChange} className="form-control" placeholder="Experince" required/>
      <label htmlFor="fieldofstudy" className="sr-only"> fieldofstudy</label>
      <input style={{marginTop:'10px'}} type="text" id="fieldofstudy" name='fieldofstudy' value={this.state.fieldofstudy} onChange={this.onChange} className="form-control" placeholder="Field Of Study" required/>
      <label htmlFor="number" className="sr-only"> number</label>
      <input style={{marginTop:'10px'}} type="text" id="number" name='number' value={this.state.number} onChange={this.onChange} className="form-control" placeholder="Contact Number" required/>
      
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

export default withRouter(StudentRegister)
const register_box={display:"flex",justifyContent:"center",marginTop:"110px"}
