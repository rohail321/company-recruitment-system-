import React, { Component } from 'react';
import Student from './component/userPanel/Student'
import StudentRegister from './component/userPanel/StudentRegister'
import CompanyRegister from './component/userPanel/CompanyRegister'
import Company from './component/userPanel/Company'
import Admin from './component/userPanel/Admin'
import AdminRegister from './component/userPanel/AdminRegister'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Title from './component/layout/titlePage/Title'
import Dashboard from './component/dashboard/Dashboard'
import Auth from './Auth'
import PrivateRoute from './PrivateRoute'
import firebase from './firebase'
import './App.css';
import Navbar from './component/layout/navbar/Navbar'
import Profile from './component/dashboard/Profile'
import Vacancy from './component/dashboard/Vacancy'
import VacancyForm from './component/forms/VacancyForm'
import Applicant from './component/dashboard/Applicant'
import StudentProfile from './component/dashboard/StudentProfile'
import Forgotpassword from './component/forms/Forgetpassword'

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      user:{},
      isAuth:true
    }
  }
componentDidMount(){
  this.authListner()
  


}

  authListner=()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      console.log(user)
      console.log(user.uid)

      if(user){
        this.setState({user,isAuth:true})
        localStorage.setItem('user',user.uid)
        
        
      }
      else{
        this.setState({user:null,isAuth:false})
        localStorage.removeItem('user')
      }
    })
  }

 
  
  render(){
    console.log(this.state)

    return (
    
    <Router>
      <div className="App">
        <Switch>
        <Route path="/student/register"  exact><StudentRegister/></Route>
        <Route path="/company/register"  exact><CompanyRegister/></Route>
        <Route path="/admin/register"  exact><AdminRegister/> </Route>
        <Route path="/admin"  exact><Admin/> </Route>
        <Route path="/company"  exact><Company/> </Route>
        <Route path="/student"  exact> <Student/> </Route>
        <Route path="/forgotpassword"  exact> <Forgotpassword/> </Route>
        <PrivateRoute path='/dashboard/profile' isAuth={this.state.isAuth}  component={Profile} exact/>
        <PrivateRoute path='/dashboard/vacancy' isAuth={this.state.isAuth}  component={Vacancy} exact/>
        <PrivateRoute path='/dashboard/form' isAuth={this.state.isAuth}  component={VacancyForm} exact/>
        <PrivateRoute path='/dashboard/applicant' isAuth={this.state.isAuth}  component={Applicant} exact/>
        <PrivateRoute path='/dashboard/studentprofile' isAuth={this.state.isAuth}  component={StudentProfile} exact/>









        <Title/>


        </Switch>

      
      
    </div>
    </Router>    
  );}
  
}

export default App;
