import React from 'react';
import { connect } from 'react-redux';
import firebase from '../Config/firebaseintegration';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { func } from 'prop-types';
import { update_user } from '../store/action';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';


const SweetAlert = withSwalInstance(swal);

class Location extends React.Component {
    constructor() {
        super();
        this.next = this.next.bind(this)
    }
    next() {
        firebase.database().ref("users/" + this.props.user.uid).once("value").then((d) => {
            const data = d.val();
            console.log(data)
            if (data.longitude !== undefined && data.latitude !== undefined) {
                this.props.store_user(data);
                if (data.type === "user") {
                    this.props.history.push(`/userpanel/${data.name}`)
                }
                else {
                    this.props.history.push(`/restaurentpanel/${data.name}`)
                }
            }
            else {
                // this.setState({
                //     showAlert:true
                // })
            }
        })
    }
    render() {
        // const { showAlert } = this.state;

        return (<div>
            <div className='homeBase'><p><i class='fab fa-foursquare' style={{color:"#ffae42"}}></i>ood Panda</p></div>
          <p><i class='fas fa-sort-down'></i></p> 
            <p className={'locationHeading'}>Please Set Your Location</p>
            <hr />
            <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
            <hr />
            <button className={'loginBtn'} onClick={this.next}><i class='fas fa-arrow'></i> Next</button>
            {/* <SweetAlert
                show={showAlert}
                text={'In Order to go next please set your location first!'}
                type={"error"}
                confirmButtonColor={'#FC615D'}
                onConfirm={() => { this.setState({ showAlert: false }) }}
            /> */}
        </div>)
    }
}

function setLocation(e) {
    const latitude = e.latLng.lat();
    const longitude = e.latLng.lng();

    firebase.database().ref("users/" + firebase.auth().currentUser.uid).once("value").then((d) => {
        const user = d.val()
        user.latitude = latitude;
        user.longitude = latitude;
        firebase.database().ref("users/" + firebase.auth().currentUser.uid).set(user)
    })
}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
        {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} draggable={true} onDragEnd={(e) => { setLocation(e) }} />}
    </GoogleMap>
))

const mapDispatchToProps = dispatch => {
    return {
        store_user: (user) => dispatch(update_user(user))
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Location)