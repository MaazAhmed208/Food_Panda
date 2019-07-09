import React, { Component } from 'react';
import firebase from '../Config/firebaseintegration';
import { connect } from 'react-redux';
class UserRequests extends Component {
    constructor(){
        super();
        this.state = {
            pendingRequests:[],
            inProgressRequests:[],
            deliveredRequests:[],
        }
    }
    componentDidMount(){
        firebase.database().ref("pendingRequests/").on("value",(snap)=>{
            const data = snap.val();
            var myPendingRequests = [];
            for(var key in data){
                for(var key2 in data[key]){
                    if(data[key][key2].idOfCustomer===this.props.user.uid){
                        myPendingRequests.push(data[key][key2])
                    }
                }
            }
            console.log(myPendingRequests)
            this.setState({pendingRequests: myPendingRequests })
        })
        firebase.database().ref("approvedRequests/").on("value",(snap)=>{
            const data2 = snap.val();
            var myApprovedRequests = [];
            for(var key in data2){
                for(var key2 in data2[key]){
                    if(data2[key][key2].idOfCustomer===this.props.user.uid){
                        myApprovedRequests.push(data2[key][key2])
                    }
                }
            }
            console.log(myApprovedRequests)
            this.setState({inProgressRequests: myApprovedRequests })
        })
        firebase.database().ref("deliveredRequests/").on("value",(snap)=>{
            const data3 = snap.val();
            var myDeliveredRequests = [];
            for(var key in data3){
                for(var key2 in data3[key]){
                    if(data3[key][key2].idOfCustomer===this.props.user.uid){
                        myDeliveredRequests.push(data3[key][key2])
                    }
                }
            }
            this.setState({deliveredRequests: myDeliveredRequests })
        })
    }
  render() {
      const { pendingRequests,inProgressRequests,deliveredRequests } = this.state;
      console.log(pendingRequests)
    return (
      <div className={"requestsArea"}>
        <h1>My Requests</h1>
        <p><i class='fas fa-sort-down'></i></p> 
        <hr />
        <div>
        <h3>Pending Requests</h3>
        {pendingRequests.length && pendingRequests.map((v,i)=>{
            return <div><p style={{width:'10%'}}>{i+1} ) </p> <p style={{width:'30%'}}>{v.name}</p> <p style={{width:'10%'}}>Rs.{v.price}</p> <p style={{width:'50%'}}>{v.nameOfRest}</p></div>
        })}
        {!pendingRequests.length && <p>No Pending Requests Right Now!</p>}
        </div>
        <div>
        <h3>In Progress Requests</h3>
        {inProgressRequests.length && inProgressRequests.map((v,i)=>{
            return <div><p style={{width:'10%'}}>{i+1} ) </p> <p style={{width:'30%'}}>{v.name}</p> <p style={{width:'10%'}}>Rs.{v.price}</p> <p style={{width:'50%'}}>{v.nameOfRest}</p></div>
        })}
        {!inProgressRequests.length && <p>No In Progress Requests Right Now!</p>}
        </div>
        <div>
        <h3>Delivered Requests</h3>
        {deliveredRequests.length && deliveredRequests.map((v,i)=>{
            return <div><p style={{width:'10%'}}>{i+1} ) </p> <p style={{width:'30%'}}>{v.name}</p> <p style={{width:'10%'}}>Rs.{v.price}</p> <p style={{width:'35%'}}>{v.nameOfRest}</p> {v.rating === undefined ? <p style={{width:"15%"}}>Rate It</p> : <p style={{width:"15%"}}>Rating : {v.rating}</p>}</div>
        })}
         {!deliveredRequests.length && <p>No Delivered Requests Right Now!</p>}
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
  
  export default connect(mapStateToProps, null)(UserRequests);