import {React, Component} from 'react'
import axios from 'axios'

class SignupView extends Component 
{
    constructor(props){
        super(props)
        this.state={
            user:{}
        }
    }

    QGetTextFromField=(e)=>{
        this.setState(prevState=>({
            user:{...prevState.user,[e.target.name]:e.target.value}
        }))
    }

    QPostSignup=()=>{
        axios.post("http://88.200.63.148:5056/users/register",{
            username:this.state.user.username,
            email:this.state.user.email,
            password:this.state.user.password
        }).then(response=>{
            console.log("Sent to server...")
        }).catch(err=>{
            console.log(err)
        })
    }

    render() {
        console.log(this.state.user)
        return(
        <div className="card" style={{width:"400px", marginLeft:"auto", marginRight:"auto", marginTop:"10px", marginBottom:"10px"}}>
            <form style={{margin:"20px"}} >
                <div className="mb-3">
                <label className="form-label">Username</label>
                <input onChange={(e)=>this.QGetTextFromField(e)} name="username" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                <label className="form-label">Email address</label>
                <input onChange={(e)=>this.QGetTextFromField(e)} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.
                </div>
                </div>
                <div className="mb-3">
                <label className="form-label">Password</label>
                <input onChange={(e)=>this.QGetTextFromField(e)} name="password" type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
            </form>
            <button onClick={()=>this.QPostSignup()} style={{margin:"10px"}}  className="btn btn-primary bt">Submit</button>
        </div>

        )
    }

}

export default SignupView
