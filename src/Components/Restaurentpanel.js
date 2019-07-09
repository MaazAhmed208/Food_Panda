import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../Config/firebaseintegration';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';

const SweetAlert = withSwalInstance(swal);

class Restaurentpanel extends Component {
  constructor() {
    super();
    this.state = {
      pendingRequests: [],
      inProgressRequests: [],
      deliveredRequests: [],
      showAlert: false,
      showPendings: true,
      showApproved:true,
      showDelivered:true,
      condition:"All Requests"

    }
    this.logout = this.logout.bind(this)
    this.approve = this.approve.bind(this)
    this.delivered = this.delivered.bind(this)
  }
  logout() {
    firebase.auth().signOut().then(() => {
      localStorage.clear();
      this.props.history.push(`/login`)
    })
  }
  componentDidMount() {
    firebase.database().ref("pendingRequests/").on("value", (snap) => {
      const data = snap.val();
      const pR = []
      for (var key in data) {
        for (var key2 in data[key]) {
          if (data[key][key2].idOfRest === this.props.user.uid) {
            const d = data[key][key2]
            d.randomId = key2
            pR.push(d)
            console.log(data[key][key2])
          }
        }
      }
      this.setState({ pendingRequests: pR })
    })

    firebase.database().ref("approvedRequests/").on("value", (snap) => {
      const data2 = snap.val();
      const aR = [];
      for (var key in data2) {
        for (var key2 in data2[key]) {
          if (data2[key][key2].idOfRest === this.props.user.uid) {
            const d2 = data2[key][key2]
            d2.randomId = key2
            aR.push(d2)
            console.log(data2[key][key2])
          }
        }
      }
      this.setState({ inProgressRequests: aR })
    })

    firebase.database().ref("deliveredRequests/").on("value", (snap) => {
      const data3 = snap.val();
      const dR = [];
      for (var key in data3) {
        for (var key2 in data3[key]) {
          if (data3[key][key2].idOfRest === this.props.user.uid) {
            const d3 = data3[key][key2]
            d3.randomId = key2
            dR.push(d3)
            console.log(data3[key][key2])
          }
        }
      }
      this.setState({ deliveredRequests: dR })
    })
  }
  approve(approveData) {
    firebase.database().ref("approvedRequests/" + approveData.idOfRest).push(approveData).then(() => {
      firebase.database().ref("pendingRequests/" + approveData.idOfRest + "/" + approveData.randomId).remove();
    })
  }
  delivered(deliveredData) {

    firebase.database().ref("deliveredRequests/" + deliveredData.idOfRest).push(deliveredData).then(() => {
      firebase.database().ref("approvedRequests/" + deliveredData.idOfRest + "/" + deliveredData.randomId).remove();
    })
  }
  render() {
    console.log(this.props)
    const { pendingRequests, inProgressRequests, deliveredRequests, showAlert,showDelivered,showPendings,showApproved , condition} = this.state;
    return (
      <div>
        <div>
          <div className='sideNav'>
          <div className='homeBase'><p><i class='fab fa-foursquare' style={{color:"#ffae42"}}></i>ood Panda</p></div>
          <p><i class='fas fa-sort-down'></i></p>  
            <p style={{ fontFamily: "Oswald", color: "#FF3232", fontSize: "120%", margin: "10px auto" }}>All Requests</p>
            
            <div className='tabs'>
              <p onClick={()=>{this.setState({showPendings:true,showApproved:false,showDelivered:false, condition:"Pending Requests"})}}><i class='fa fa-clock-o'></i>  Pending</p>
              <p onClick={()=>{this.setState({showPendings:false,showApproved:true,showDelivered:false,condition:"Approved Requests"})}}><i class='fa fa-refresh'></i>  In Progress</p>
              <p onClick={()=>{this.setState({showPendings:false,showApproved:false,showDelivered:true, condition:"Delivered Requests"})}}><i class='fa fa-check'></i>  Delievered</p>
            </div>
            <div>
              <button className={'logoutBtn'} onClick={this.logout}><i class='fas fa-sign-in-alt'></i> LOGOUT</button>
            </div>
          </div>

          <div className={"sideContent"}>
            <div className={"requestsArea"}>
            <h1 style={{ padding:'20px'}}>{condition}</h1>
            <p><i class='fas fa-sort-down'></i></p> 
              {showPendings && <div>
                <h3>Pending Requests</h3>
                {pendingRequests.length && pendingRequests.map((v, i) => {
                  return <div><p style={{ width: '5%' }}>{i + 1} ) </p> <p style={{ width: '15%' }}>{v.nameOfUser}</p> <p style={{ width: '30%' }}>{v.name}</p> <p style={{ width: '10%' }}>Rs.{v.price}</p><p className={"requestBtns"} onClick={() => { this.approve({ nameOfUser: v.nameOfUser, name: v.name, nameOfRest: v.nameOfRest, price: v.price, idOfRest: v.idOfRest, idOfCustomer: v.idOfCustomer, randomId: v.randomId }) }}>Approved</p></div>
                })}
                {!pendingRequests.length && <p>No Pending Requests Right Now!</p>}
              </div>}
              {showApproved && <div>
                <h3>In Progress Requests</h3>
                {inProgressRequests.length && inProgressRequests.map((v, i) => {
                  return <div><p style={{ width: '5%' }}>{i + 1} ) </p> <p style={{ width: '15%' }}>{v.nameOfUser}</p> <p style={{ width: '30%' }}>{v.name}</p> <p style={{ width: '10%' }}>Rs.{v.price}</p><p className={"requestBtns"} onClick={() => { this.delivered({ nameOfUser: v.nameOfUser, name: v.name, nameOfRest: v.nameOfRest, price: v.price, idOfRest: v.idOfRest, idOfCustomer: v.idOfCustomer, randomId: v.randomId }) }}>Delivered</p></div>
                })}
                {!inProgressRequests.length && <p>No In Progress Requests Right Now!</p>}
              </div>}
              {showDelivered && <div>
                <h3>Delivered Requests</h3>
                {deliveredRequests.length && deliveredRequests.map((v, i) => {
                  return <div><p style={{ width: '5%' }}>{i + 1} ) </p> <p style={{ width: '15%' }}>{v.nameOfUser}</p> <p style={{ width: '30%' }}>{v.name}</p> <p style={{ width: '10%' }}>Rs.{v.price}</p><p style={{width:"30%"}}>Rating: {v.rating === undefined ? "Not Yet" : v.rating}</p></div>
                })}
                {!deliveredRequests.length && <p>No Delivered Requests Right Now!</p>}
              </div>}
            </div>

          </div>
        </div>
        <SweetAlert
          show={showAlert}
          title={'Approved!'}
          text={'This order request has been approved and is in progress now.'}
          confirmButtonColor={'#FC615D'}
          onConfirm={() => { this.setState({ showAlert: false }) }}
        />
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
  }
}
export default connect(mapStateToProps, null)(Restaurentpanel);