import {React, Component} from 'react'
import axios from 'axios'

class SingleNovicaView extends Component 
{
  constructor(props){
    super(props)
    this.state={
      Novica:{}
    }
  }

    QSetViewInParent=(obj)=>{
        this.props.QPageFromChild(obj)
    }

    componentDidMount(){
      axios.get("http://88.200.63.148:5056/novice/"+this.props.data)
      .then(response=>{
        this.setState({
          Novica:response.data
        })
      })
    }

    render() {
      let novica= this.state.Novica
        return(
        <div className="card" style={{margin:"10px"}}>
          {novica.length>0 ? 
               <div>
                 <h5 className="card-header">{novica[0].title}</h5>
                <div className="card-body">
                  <h5 className="card-title">{novica[0].slug}</h5>
                  <p className="card-text">{novica[0].text}</p>
                  <button onClick={()=>this.QSetViewInParent({page:"novice"})}  className="btn btn-primary">Return news</button>
                </div>
              </div>
          : "Loading---"}
         </div>
        )
    }

}

export default SingleNovicaView
