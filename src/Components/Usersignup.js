import React, { Component } from 'react';
import firebase from '../Config/firebaseintegration';
import { update_user } from '../store/action';
import { connect } from 'react-redux';

class Usersignup extends Component {
    constructor(){
        super();
        this.state = {
            email:'',
            password:"",
            name:"",
            age:"",
            country:"",
            city:"",
            signedUp:false,
        }
        this.signup = this.signup.bind(this);
    }
    signup(){
      this.setState({signedUp:true})
      const {email,password,name,age,country,city} = this.state;
      firebase.auth().createUserWithEmailAndPassword(email,password).then(()=>{
        const uid = firebase.auth().currentUser.uid;
        const obj = {
          email,
          password,
          name,
          age,
          country,
          city,
          uid,
          type:"user"
        }
        firebase.database().ref("users/"+uid).set(obj).then(()=>{
          this.props.store_user(obj);
          // this.props.history.push(`/userpanel/${obj.name}`)
          this.props.history.push(`/location`)
        }).catch((err)=>{
          this.setState({signedUp:false})
        })
      }).catch((err)=>{
        this.setState({signedUp:false})
      })
    }
    render() {
      return (
        <div>
           <div>
           <div className='homeBase'><p><i class='fab fa-foursquare' style={{color:"#ffae42"}}></i>ood Panda</p></div>
          <p><i class='fas fa-sort-down'></i></p>  
          <div className={"loginFromArea"}>
            <form action='JavaScrip:void(0)' onSubmit={this.signup}>
                <div style={{margin:'20px'}}>
                <div class="form-group">
                  <input type='text' placeholder='Name' onChange={(e)=>{this.setState({name:e.target.value})}} required  class="form-control" />
                </div>

                <div class="form-group">
                  <input type="email" class="form-control" placeholder='Email' onChange={(e)=>{this.setState({email:e.target.value})}} required/>
                </div>


                <div class="form-group">
                  <input type='number' placeholder='Age' onChange={(e)=>{this.setState({age:e.target.value})}} required  class="form-control" />
                </div>
                            
                
                <div class="form-group">
             
                  <input type='text' placeholder='Country' onChange={(e)=>{this.setState({country:e.target.value})}} required  class="form-control" />
                </div>

                <div class="form-group">
                  <input type='text' placeholder='City' onChange={(e)=>{this.setState({city:e.target.value})}} required  class="form-control" id="email"/>
                </div>

                

                <div class="form-group">
                  
                  <input type='password' placeholder='password' onChange={(e)=>{this.setState({password:e.target.value})}} required  class="form-control" id="email"/>
                </div>

                </div>
                <small style={{textAlign:"left",cursor:'pointer'}} onClick={()=>{this.props.history.push(`/login`)}}>Already have an account? Login</small>
                <hr />
                {this.state.signedUp && <p className={'loader'}><i class="fa fa-gear fa-spin"></i> Please Wait</p>}
                <button className={'loginBtn btn btn-success'}>SIGN UP</button>
            </form>
          </div>    
        </div>
      </div>
          
      )
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
        store_user: (user) => dispatch(update_user(user))
    }
}

export default connect(null, mapDispatchToProps)(Usersignup);