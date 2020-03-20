import React, { Component } from 'react'
import Login from '../forms/Login'
import firebase from '../../firebase'
import {withRouter} from 'react-router'


export class Admin extends Component {
    constructor(props){
        super(props)
        this.state={
            email:"",
            password:"",
            isAdmin:true
        }
    }

    
        
    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
        console.log(this.state.email)
    }
    onSubmit=(e)=>{
        const{history}=this.props
        e.preventDefault()
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(()=>{
            history.push('/dashboard/profile')
        })
        .catch(err=>{
            console.log(err)
        })
        
    }


    render() {
        return (
            <div>
                <Login onChange={this.onChange} onSubmit={this.onSubmit} email={this.state.email} password={this.state.password} panel='admin' />
                 
            </div>
        )
    }
}

export default withRouter( Admin)

