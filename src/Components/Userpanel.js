import React, { Component } from 'react';
import firebase from '../Config/firebaseintegration';
import { connect } from 'react-redux';
import Rbg from '../Assets/Wallpaper/rbg.jpg';
import {fastFood,chinees,bbq,drinks} from '../Components/categoriesData';
import Order from '../Components/Order'
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import { renderToStaticMarkup } from 'react-dom/server';
import Items from '../Components/Items' 
import MyRequests from '../Components/Userrequests';

const SweetAlert = withSwalInstance(swal);

class Userpanel extends Component {
  constructor(){
    super();
    this.state = {
      rests: [],
      restsShow:true,
      fastFoodShow:true,
      chineesShow:true,
      bbqShow:true,
      drinksShow:true,
      condition: "Items for you",
      toBeOrdered:[],
      ordered:{},
      restInfo:{},
      rquestsShow: false,
      searchResult:[],
    }
    this.search = this.search.bind(this)
    this.logout = this.logout.bind(this)
  }
  logout(){
    firebase.auth().signOut().then(()=>{
      localStorage.clear();
      this.props.history.push(`/login`)
    })
  }
  componentDidMount(){
      firebase.database().ref("users").on("value",(data)=>{
        const dt = data.val();
        const r = [];
        for(var key in dt){
          if(dt[key].type==="restaurent"){
            const data = dt[key]
            data.id = key;
            r.push(data)
          }

        }
        this.setState({rests:r})
      })
  }

  
  search(e){
    console.log(e.target.value)
    const { rests } = this.state;
    const text = e.target.value;

    const result = rests.filter((elem) => {
      const e = elem.name
      return e.indexOf(text) !== -1

  })

    this.setState({searchResult:result})
  }
  render() {
    
    const {restsShow,rests,fastFoodShow, chineesShow,bbqShow,drinksShow,condition, searchResult,showAlert,toBeOrdered, rquestsShow} = this.state;
    const arr = searchResult.length ? searchResult : rests;

    return (
      <div>

      <div className='sideNav'>
      <div className='homeBase'><p><i class='fab fa-foursquare' style={{color:"#ffae42"}}></i>ood Panda</p></div>
          <p><i class='fas fa-sort-down'></i></p>  
       <div className='tabs'>
         <p onClick={()=>{this.setState({restsShow:true, rquestsShow:false, fastFoodShow:false,chineesShow:false,bbqShow:false,drinksShow:false,})}}><i class='fas fa-industry'></i> - Restaurents</p>
         <p onClick={()=>{this.setState({rquestsShow:true, restsShow: false})}}><i class='fas fa-heart'></i> - My Requests</p>
       </div>
       <div>
         <button className={'logoutBtn'} onClick={this.logout}><i class='fas fa-sign-in-alt'></i> LOGOUT</button>
       </div>
       </div>
       <div className={"sideContent"}>
       {restsShow && <div className={"searchInput"}>
       <div class="form-group">
          
          <input type='text' placeholder='search restaurents' onChange={(e)=>{this.search(e)}}  class="form-control" />
        </div>
       </div>}
       {restsShow && <hr />}
       <div>
         {restsShow &&<h3 >All Nearby Restaurents</h3>}
         {restsShow &&<i class='fas fa-sort-down'></i>}
         <div className={"categoryData"} >
          {restsShow && arr.map((v,i)=>{return <div onClick={()=>{this.setState({restsShow:false, restInfo:{name:v.name,id:v.id, profilePic:v.profilePic}})}}><div className={{width:'100%',height:"150px",overflow:"hidden",borderRadius:'20px'}}><img src={v.profilePic} width='100%' height='150px' /></div><p>{v.name}</p><small>( {i+1} )</small></div>})}
         </div>
       </div>
       {!restsShow && !rquestsShow && <Items restInfo={this.state.restInfo} />}
       {rquestsShow && !restsShow && <MyRequests />}
       
       </div>
     
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      user: state.user,
  }
}

export default connect(mapStateToProps, null)(Userpanel);