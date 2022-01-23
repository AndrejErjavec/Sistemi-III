import React from 'react'
import axios from 'axios'
//My custom components
import HomeView from './CustomComponents/HomeView'
import AboutView from './CustomComponents/AboutView'
import AddNovicaView from './CustomComponents/AddNovicaView'
import LoginView from './CustomComponents/LoginView'
import NoviceView from './CustomComponents/NoviceView'
import SignupView from './CustomComponents/SignupView'
import SingleNovicaView from './CustomComponents/SingleNovicaView'

axios.defaults.withCredentials=true;


class App extends React.Component
{
  constructor(props){
    super(props)
    this.state={
      CurrentPage:"home",
      Novica:1,
      userStatus:{logged:false}
    }
  }

QGetView=(state)=>{
  let page = state.CurrentPage

  switch(page)
  {
    case "home":
      return <HomeView/>
    case "about":
      return <AboutView/>
    case "novice":
      return <NoviceView QIDFromChild={this.QSetView}/>
    case "addnew":
      return <AddNovicaView QUserName={state.userStatus.logged ? state.userStatus.user[0].user_name: "user"}/>
    case "signup":
      return <SignupView/>
    case "login":
      return <LoginView QSetViewinParent={this.QSetView} QUserFromChild={this.QSetUser}/>
    case "novica":
      return <SingleNovicaView data={state.Novica} QPageFromChild={this.QSetView} />
    default:
      return <h1>I doesnt work</h1>
    
  }
}

QSetUser=(obj)=>{
this.setState({
  userStatus:{logged:true,user:[obj]}
})
}


QSetView=(obj)=>
{
  this.setState({
    CurrentPage:obj.page,
    Novica:obj.id||1
  })
}

componentDidMount(){
  axios.get('http://88.200.63.148:5001/login')
  .then(response=>{
    console.log(response)
  })
}


render(){ 
  console.log(this.state)
  return(
    <div id="APP" className="container">
        <div id="menu" className="row">
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
              <div className="container-fluid">
                <a onClick={()=>this.QSetView({page:"home"})} className="navbar-brand" href="#">Home</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a onClick={()=>this.QSetView({page:"about"})} className="nav-link " href="#">About</a>
                    </li>

                    <li className="nav-item">
                      <a onClick={()=>this.QSetView({page:"novice"})} className="nav-link "  href="#">News</a>
                    </li>
                      
                    <li className="nav-item">
                      <a onClick={()=>this.QSetView({page:"addnew"})} className="nav-link">Add news</a>
                    </li>

                    <li className="nav-item"> 
                      <a onClick={()=>this.QSetView({page:"signup"})} className="nav-link " href="#">Sign up</a>
                    </li>

                    <li className="nav-item" >
                      <a onClick={()=>this.QSetView({page:"login"})} className="nav-link "  href="#">Login</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
        </div>

        <div id="viewer" className="row container">
         {this.QGetView(this.state)}
        </div>
        

    </div>

  )
}

}

export default App