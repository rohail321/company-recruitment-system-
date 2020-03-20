import React, { Component } from 'react'
import Navbar from '../layout/navbar/Navbar'
import firebase from '../../firebase'
import Modal from 'react-modal'
import { firestore } from 'firebase'

Modal.setAppElement('#root')
export class Vacancy extends Component {
  constructor(props){
    super(props)
    this.state={
      name:"",
      experince:'',
      skills:'',
      contact:'',
      position:"",
      modalstate:false,
      VacancyDeatil:[],
      email:"",
      id:'',
      allUsers: [],
      currentUser:[],
      loading:true
    }
  }

  


 async componentWillMount(){
    const db=firebase.firestore()
  const data=await  db.collection('vacancyform').get()
data.forEach((dt)=>{
  this.setState({position:dt.data().position})
  this.setState({VacancyDeatil:[...this.state.VacancyDeatil,dt.data()]})
  console.log(dt.data().id)
})

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

delete=(e)=>{
  console.log(e.target.name)
  console.log(this.state.VacancyDeatil)
const newVacancy= this.state.VacancyDeatil.filter((res)=>(e.target.name!==res.description)) 
this.setState({VacancyDeatil:newVacancy})

  

}
onClick=()=>{
  this.setState({modalstate:true})

}

onChange=(e)=>{
  this.setState({[e.target.name]:e.target.value})
 
}
handleChange=(e)=>{
  e.preventDefault()
  console.log(e.id)
  const {name,experince,skills,contact,id,position}=this.state
  const db=firebase.firestore()
  db.collection('jobapply').add({id,name,experince,skills,contact,position})
  console.log(this.state.name)
  this.setState({modalstate:false})

}
    render() {
      
      const type=this.state.allUsers.filter(res=>(res.isAdmin))
      
      
      const typeAdmin=type.filter((e)=>(e.email===this.state.email))
      console.log(typeAdmin)
      let  user
      



      let nav
      if(this.state.currentUser){
        nav=this.state.currentUser.map((user)=><Navbar panel={user}/>)
      }
      let vacancyPanel
      vacancyPanel= this.state.VacancyDeatil.map((res)=>(
        

        <figure style={box} >
<div style={hero}>
</div>
<div style={content}>
<div style={title}>
      <h1 style={heading}><label>Position:   </label>{res.position}</h1>
  
</div>
      <label style={{fontWeight:'bold'}}>Description:</label>
      <p style={{fontSize:'20px'}}>{res.description}</p>
<div style={details}>
<label style={{fontWeight:'bold'}}>Skills:</label>

      <p >{res.skills}</p>
  
</div>
<div style={details}>
      <label style={{fontWeight:'bold'}}>Experince:</label>

      <p >{res.experince}</p>
  
</div>
<button type="submit" className="btn btn-primary" onClick={this.onClick }>Apply  </button>
{typeAdmin.length!==0?
<button type="submit"   className="btn btn-danger" 
onClick={this.delete} name={res.description}  style={{width:"100px"}}>Delete  </button>:''
}
        <Modal isOpen={this.state.modalstate} ><div className="container">
          <form  onSubmit={this.onSubmit}>
            <div className="form-group">
              <label for="name">Name:</label>
              <input type="text" className="form-control" id="name" placeholder="Enter name" name="name" onChange={this.onChange} value={this.state.name}  />
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
              <label for="contact">Contact:</label>
              <input type="text" className="form-control" id="contact"  placeholder="Enter contact" name="contact" onChange={this.onChange} value={this.state.contact} />
            </div>
            
            <div className="form-group form-check">
              
            </div>
          </form>
        </div>
        <button type="submit" className="btn btn-primary" onClick={this.handleChange.bind} style={{width:"100px"}}>Submit  </button>


        </Modal>

</div>

</figure>
        
        ))
        return (
        <div>
          {nav}
          {vacancyPanel }</div>
        )
    }
}

export default Vacancy

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
  
  
  