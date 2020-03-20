import React, { Component } from 'react'
import Navbar from '../layout/navbar/Navbar'
import firebase from '../../firebase'
import Modal from 'react-modal'

export class Applicant extends Component {
  constructor(props){
    super(props)
    this.state={
        name:"",
        experince:'',
        skills:'',
        contact:'',
        VacancyDeatil:[],
        companyemail:'',
        
        allUsers: [],
        currentUser:[],
      email:"",
      id:'',
      applicant:[],
      user:[]
   
    }
  }

  


 async componentWillMount(){
    this.handleApplicant()
    setTimeout(()=>{    
        this.findUser()

        console.log(this.state)},5000)
        setTimeout(()=>{    
            this.filter()
    
            console.log(this.state)},3000)
            const db=firebase.firestore()
  const data=await  db.collection('vacancyform').get()
data.forEach((dt)=>{
    this.setState({companyemail:dt.data().email})
  this.setState({VacancyDeatil:[...this.state.VacancyDeatil,dt.data()]})
  console.log(this.state)
})



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
      
      
        
    
        
        
    
    
  
filter=()=>{
    const verifiedUser =this.state.VacancyDeatil.filter(e=>e.email===this.state.email)
    if(verifiedUser){    this.setState({user:this.state.applicant})
}
    console.log(this.state.user)
}
  


  
  
    

    
    

findUser= async()=>{
  var user =  await firebase.auth().currentUser;
  console.log(user)
      if (user != null) {
       const email = user.email;
       const uid = user.uid;  
       this.setState({email:email,id:uid})
       console.log(uid)

   }
   console.log(this.state)



 
}
delete=(e)=>{
  console.log(e.target.name)
const newUser= this.state.user.filter((res)=>(e.target.name!==res.contact)) 
this.setState({user:newUser})
}

handleApplicant=async ()=>{
    const db=firebase.firestore()
    const data=await db.collection('jobapply').get()
    data.forEach((doc)=>{
        this.setState({applicant:[...this.state.applicant,doc.data()]})
        
        console.log(doc.data())
    })

}

    render() {
      const type=this.state.allUsers.filter(res=>(res.isAdmin))
      
      
      const typeAdmin=type.filter((e)=>(e.email===this.state.email))
      console.log(typeAdmin)
      let nav
      let users
      if(this.state.currentUser){
        nav=this.state.currentUser.map((user)=><Navbar panel={user}/>)
      }
      
      if(this.state.user)
      {
          users=this.state.user.map(res=>(
        <div className="card" style={{width:"28rem",marginTop:'20px'}}>
        <div className="card-body">
      <h5 className="card-title">{res.name}</h5>
      <p className="card-title">{res.skills}</p>
      <p className="card-title">{res.experince}</p>
      <p className="card-title">{res.contact}</p>
      <p className="card-title"><label style={{fontWeight:'bold'}}>Applied For:</label>{res.position}</p>
      {typeAdmin.length!==0?
<button type="submit"   className="btn btn-danger" 
onClick={this.delete} name={res.contact}  style={{width:"100px"}}>Delete  </button>:''
}



        </div>
      </div>
      ))}
      
        return (
        <div>
          {nav}
          {users}

          </div>
        )
    }
}

export default Applicant

/*
Green: #67b26f
Blue: #4ca2cd
Mid:#5aaa9d
*/


  
  
  const box= {
    display: 'flex',
    overflow: 'hidden',
    maxWidth: '1000px',
    borderRadius: '4px',
    boxShadow: '0 20px 40px 10px rgba(0, 0, 0, 0.2)',
    marginTop:'40px'
  }
  
  
  const content ={
    flex: 1,
    background: '#fff',
    padding: '15px 10px',
  
    display: 'flex',
    flexDirection: 'column',
  }
  
  const hero= {
    flex: '0 1 45%'
  }
  
  
  
  const title= {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  }
  
 const heading= {
    fontSize: '20px',
    marginRight: 'auto',
  }
  
  
  
  
  
  
  
  const details= {
    display: 'flex',
    marginTop: 'auto',
  }
  
  const detail ={
    fontSize: '15px',
    textTransform: 'uppercase',
    marginRight:' 20px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
  }
  
  
  