import React from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../navbar/Navbar'

const Title = () => {
    return (
        <div style={title_box}>
            <div style={{border:'2px solid',padding:'40px'}} >
                <Link to='/admin' style={{fontSize:'30px',fontWeight:'bold',color:'black'}}>Admin</Link>
            </div>
            <div style={{border:'2px solid',padding:'40px'}} >
                <Link to='/student' style={{fontSize:'30px',fontWeight:'bold',color:'black'}}>Student</Link>
            </div>
            <div style={{border:'2px solid',padding:'40px'}}>
                <Link to='/company' style={{fontSize:'30px',fontWeight:'bold',color:'black'}}>Company</Link>
            </div>
            
            </div>
            
       
    )
}

export default Title

const title_box={
    display:"flex",
    flexDirection:"row",
    justifyContent:'space-around',
    marginTop:"250px"

    
    

}