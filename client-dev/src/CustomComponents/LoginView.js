import React from 'react'
import axios from 'axios'

axios.defaults.withCredentials=true;
class LoginView extends React.Component 
{   constructor(props){
    super(props)
    this.state={
        user:{}
    }
    }

    QPostLogin=()=>{
        axios.post("http://88.200.63.148:5056/users/login",{
            username:this.state.user.username,
            password:this.state.user.password
        })
        .then(response=>{
            console.log(response.data.user)
            this.QSendUser2Parent(response.data.user)
            this.props.QSetViewinParent({page:"addnew"})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    Q

    QSendUser2Parent=(obj)=>{
        this.props.QUserFromChild(obj)
    }

    QGetTextFromField=(e)=>{
        this.setState(prevState=>({
            user:{...prevState.user,[e.target.name]:e.target.value}
        }))
    }

    render() {
        console.log(this.state.user)
        return( 
          <div className="card" style={{width:"400px", marginLeft:"auto", marginRight:"auto", marginTop:"10px", marginBottom:"10px"}}>
            <form style={{margin:"20px"}} >
                <div className="mb-3">
                <label className="form-label">Username</label>
                <input onChange={(e)=>this.QGetTextFromField(e)}  name="username"  type="text" className="form-control" id="exampleInputEmail1"/>
                </div>
                <div className="mb-3">
                <label className="form-label">Password</label>
                <input onChange={(e)=>this.QGetTextFromField(e)} name="password" type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
            </form>
            <button onClick={()=>this.QPostLogin()}  style={{margin:"10px"}} className="btn btn-primary bt">Login</button>
        </div>
        )
    }
}

export default LoginView
