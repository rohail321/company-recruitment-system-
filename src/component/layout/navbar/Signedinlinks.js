import React from 'react'
import {NavLink} from 'react-router-dom'
import firebase from '../../../firebase'
import Profile from '../../dashboard/Profile'

const Signedinlinks = (props) => {
  let navstudent
  let form
  let applicant
  console.log(props.panel.isStudent)
  if(props.panel.isStudent){
    navstudent=''
  }
  else {
    navstudent=(<NavLink to='/dashboard/studentprofile'  className="nav-link">Student</NavLink>)
  }
  if(props.panel.isStudent){
    form=''
  }
  else {
    form=(<NavLink to='/dashboard/form'  className="nav-link">Form</NavLink>)
  }
  if(props.panel.isStudent){
    applicant=''
  }
  else {
    applicant=(<NavLink to='/dashboard/applicant'  className="nav-link">Applicant</NavLink>)
  }
 
    return (
      <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <NavLink to='/dashboard/profile' className="nav-link">Profile</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to='/dashboard/vacancy' className="nav-link">Vacancy</NavLink>
      </li>
      <li className="nav-item active">
        {form}
      </li> <li className="nav-item active">
        {applicant}
      </li>
      <li className="nav-item">
        {navstudent}      
      </li>
      
      <li className="nav-item">
        <NavLink to='' className="nav-link btn" type='button' onClick={()=>{firebase.auth().signOut()}}>Logout</NavLink>
      </li>
    </ul>
    )
}

export default Signedinlinks
