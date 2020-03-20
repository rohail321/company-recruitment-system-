import React, { Component } from 'react'
import Navbar from '../layout/navbar/Navbar'
import firebase from '../../firebase'
export class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state={
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
  
}

    render() {
        console.log(this.state)
        
        return (
            <div>
                <Navbar/>
                
            </div>
        )
    }
}

export default Dashboard
