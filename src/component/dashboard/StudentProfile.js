import React, { Component } from 'react'
import Navbar from '../layout/navbar/Navbar'
import firebase from 'firebase'
import Spinner from './805.gif'
import { findByLabelText } from '@testing-library/react'

export class StudentProfile extends Component {
  constructor(props){
    super(props)
    this.state={
      email:"",
      id:'',
      allUsers: [],
      currentUser:[],
      loading:true,
      student:[]
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
  


 
}

    

    render() {

      let nav
      if(this.state.currentUser){
        nav=this.state.currentUser.map((user)=><Navbar panel={user}/>)
      }


      // }
      // else {
      //   nav= <Navbar panel={this.state.currentUser}/>
      // }

      let spiner
      if(this.state.loading){
         spiner=<img src={Spinner} style={{marginLeft:'620px',marginTop:'200px'}} />

      }
      
        else if(!this.state.loading){
            spiner=this.state.allUsers.map((res)=>{
                if(res.isStudent){
                  return(<div className="card" style={card} key={res.name}>
                  <h1>{res.name}</h1>
                  <p className="title" style={title}>{res.fieldofstudy}</p>
                  <p style={{color:'black',fontWeight:'bold'}}>Muhammad Ali Jinnah University</p>
                  <div style={{margin: '24px 0'}}>
                  <p><label style={{color:'black',fontWeight:'bold'}}>Age:</label>{res.age}</p>
                  <p><label style={{color:'black',fontWeight:'bold'}}>Cgpa:</label>{res.cgpa}</p>
                  <p><label style={{color:'black',fontWeight:'bold'}}>experince:</label>{res.experince}</p>
                  <p><label style={{color:'black',fontWeight:'bold'}}>semester:</label>{res.semester}</p>
                  <p><label style={{color:'black',fontWeight:'bold'}}>email:</label>{res.email}</p>
                  <p><label style={{color:'black',fontWeight:'bold'}}>contact:</label>{res.number}</p>
                  </div></div>)
                }
                
              
    
            
              
            }
          
          
          
          
            )}
       


      
      
        return (
            <div>
              {nav}
                {spiner}
            
          </div>
          
        )
    }
}

export default  StudentProfile

const card ={
    boxShadow:' 0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    maxWidth: "300px",
    margin:' auto',
    textAlign: 'center',
    fontFamily: 'arial',
    marginTop:'100px'
  }
  
const title= {
    color: 'black',
    fontSize: '18px',
  }
  
