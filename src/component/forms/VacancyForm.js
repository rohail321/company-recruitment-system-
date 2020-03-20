import React, { Component } from 'react'
import {withRouter} from 'react-router'
import firebase from 'firebase'
import Navbar from '../layout/navbar/Navbar'

export class VacancyForm extends Component {
  constructor(props){
    super(props)
    this.state={
      companyname:'',
      position:'',
      experince:'',
      skills:'',
      description:'',
      email:"",
      id:'',
      allUsers: [],
      currentUser:[],
      loading:true
      
    }
  }

  


  componentWillMount(){
    setTimeout(()=>{
      this.setState({loading:false})
    },5000)

    this.fetchData()
    this.currentuser()


    

     
    }
  
  

   fetchData=async()=>{
    const db=firebase.firestore()
    const data = await db.collection('user').get(); 
    this.findUser()
    data.forEach(doc => {
      this.setState({allUsers : [...this.state.allUsers, doc.data()]});
     
  });
}

currentuser=()=>{
  setTimeout(()=>{
    if(this.state.allUsers){
    
      const users= this.state.allUsers.filter((res)=>(res.email===this.state.email))
      this.setState({currentUser:users})
      console.log(this.state)


     }
  },5000)
}
findUser= async()=>{
  var user =  await firebase.auth().currentUser;
      if (user != null) {
       const email = user.email;
       const uid = user.uid;  
       this.setState({email:email,id:uid})
   }

    console.log(this.state)
  

  // const dbs=firebase.firestore()
  // dbs.collection('user').where('email','==','student@gmail.com').get().then((res)=>{
  //   console.log(res.docs)
  // })

 
}
onChange=(e)=>{
  this.setState({[e.target.name]:e.target.value})
  console.log(this.state)

}
onSubmit=(e)=>{
  const {history}=this.props
  e.preventDefault()
  const {position,experince,skills,description,email,companyname}=this.state
  const db=firebase.firestore()
  db.collection('vacancyform').add({position,experince,skills,description,email,companyname})
  console.log(position,experince,skills,description)
  history.push('/dashboard/vacancy')

}
    render() {
      
      let nav
      if(this.state.currentUser){
        nav=this.state.currentUser.map((user)=><Navbar panel={user}/>)
      }
        return (
          <div>
           {nav} 
            <div className="container">
          <form  onSubmit={this.onSubmit}>
          <div className="form-group">
              <label for="companyname">Company Name:</label>
              <input type="text" className="form-control" id="companyname" placeholder="Enter company name" name="companyname" onChange={this.onChange} value={this.state.companyname}  />
            </div>
            <div className="form-group">
              <label for="position">Position:</label>
              <input type="text" className="form-control" id="position" placeholder="Enter position" name="position" onChange={this.onChange} value={this.state.position}  />
            </div>
            <div className="form-group">
              <label for="experince">Experience:</label>
              <input type="text" className="form-control" id="experince" placeholder="Enter experince" name="experince" onChange={this.onChange} value={this.state.experince} />
            </div>
            <div className="form-group">
              <label for="skills">Skills:</label>
              <input type="text" className="form-control" id="skills" placeholder="Enter skills" name="skills" onChange={this.onChange} value={this.state.skills} />
            </div>
            <div className="form-group">
              <label for="discription">discription:</label>
              <textarea type="text" className="form-control" id="discription" row='4' colume='4' placeholder="Enter discription" name="description"onChange={this.onChange} value={this.state.description} />
            </div>
            
            <div className="form-group form-check">
              
            </div>
            <button type="submit" className="btn btn-primary" style={{alignItems:'center'}}>Submit</button>
          </form>
        </div></div>
            
        )
    }
}

export default withRouter(VacancyForm)
